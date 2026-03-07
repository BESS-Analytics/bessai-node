/**
 * BESS AI SDK — HTTP Client.
 *
 * Async-only (idiomatic Node.js). Uses native fetch (Node 18+).
 * Automatic retry with exponential backoff for 429 and 5xx.
 */
import type { ClientConfig } from "./config.js";
import {
  BessAIError,
  ConnectionError,
  TimeoutError,
  raiseForStatus,
} from "./errors.js";
import { VERSION } from "./version.js";

const USER_AGENT = `bessai-node/${VERSION}`;
const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

function backoffDelay(attempt: number, retryAfter?: number): number {
  if (retryAfter && retryAfter > 0) return Math.min(retryAfter * 1000, 60_000);
  return Math.min(500 * 2 ** attempt, 30_000);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryAfter(headers: Headers): number | undefined {
  const val = headers.get("retry-after");
  if (val) {
    const n = Number(val);
    if (!Number.isNaN(n)) return n;
  }
  return undefined;
}

export interface RequestOptions {
  json?: Record<string, unknown>;
  params?: Record<string, unknown>;
  formData?: FormData;
  contentType?: string;
}

/**
 * Strip undefined/null values from a params record and build a URL query string.
 */
function buildQuery(params?: Record<string, unknown>): string {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null
  );
  if (entries.length === 0) return "";
  const sp = new URLSearchParams();
  for (const [k, v] of entries) sp.append(k, String(v));
  return `?${sp.toString()}`;
}

export class HTTPClient {
  private readonly config: ClientConfig;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: ClientConfig) {
    this.config = config;
    this.defaultHeaders = {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": USER_AGENT,
      ...config.headers,
    };
  }

  async request<T = Record<string, unknown>>(
    method: string,
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${path}${buildQuery(options.params)}`;

    const headers: Record<string, string> = { ...this.defaultHeaders };
    if (options.contentType) headers["Content-Type"] = options.contentType;
    if (options.formData) delete headers["Content-Type"]; // let browser set boundary

    let body: string | FormData | undefined;
    if (options.formData) {
      body = options.formData;
    } else if (options.json) {
      body = JSON.stringify(options.json);
    }

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(
          () => controller.abort(),
          this.config.timeout
        );

        let res: Response;
        try {
          res = await fetch(url, {
            method,
            headers,
            body,
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timer);
        }

        if (
          RETRYABLE_STATUS_CODES.has(res.status) &&
          attempt < this.config.maxRetries
        ) {
          const retryAfter = parseRetryAfter(res.headers);
          await sleep(backoffDelay(attempt, retryAfter));
          continue;
        }

        if (res.status === 204) return {} as T;

        const responseBody = (await res.json().catch(() => ({}))) as Record<
          string,
          unknown
        >;
        raiseForStatus(res.status, responseBody);
        return responseBody as T;
      } catch (e) {
        if (e instanceof BessAIError) throw e;

        if (e instanceof DOMException && e.name === "AbortError") {
          lastError = new TimeoutError();
          if (attempt < this.config.maxRetries) {
            await sleep(backoffDelay(attempt));
            continue;
          }
        } else if (
          e instanceof TypeError &&
          (e.message.includes("fetch") || e.message.includes("network"))
        ) {
          lastError = new ConnectionError(String(e));
          if (attempt < this.config.maxRetries) {
            await sleep(backoffDelay(attempt));
            continue;
          }
        } else {
          lastError = new BessAIError(String(e));
          if (attempt < this.config.maxRetries) {
            await sleep(backoffDelay(attempt));
            continue;
          }
        }
      }
    }

    throw lastError ?? new BessAIError("Request failed after retries");
  }

  get<T = Record<string, unknown>>(path: string, options?: RequestOptions) {
    return this.request<T>("GET", path, options);
  }
  post<T = Record<string, unknown>>(path: string, options?: RequestOptions) {
    return this.request<T>("POST", path, options);
  }
  patch<T = Record<string, unknown>>(path: string, options?: RequestOptions) {
    return this.request<T>("PATCH", path, options);
  }
  put<T = Record<string, unknown>>(path: string, options?: RequestOptions) {
    return this.request<T>("PUT", path, options);
  }
  delete<T = Record<string, unknown>>(path: string, options?: RequestOptions) {
    return this.request<T>("DELETE", path, options);
  }
}

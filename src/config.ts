/**
 * BESS AI SDK — Configuration.
 */

export const DEFAULT_BASE_URL = "https://api.bessai.com";
export const DEFAULT_TIMEOUT = 30_000; // ms
export const DEFAULT_MAX_RETRIES = 3;

export const ENV_API_KEY = "BESSAI_API_KEY";
export const ENV_BASE_URL = "BESSAI_BASE_URL";

export interface ClientConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
  maxRetries: number;
  headers: Record<string, string>;
}

export interface ClientOptions {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  headers?: Record<string, string>;
}

/**
 * Resolve client config from explicit options + environment variables.
 */
export function resolveConfig(options: ClientOptions = {}): ClientConfig {
  const apiKey =
    options.apiKey || process.env[ENV_API_KEY] || "";
  if (!apiKey) {
    throw new Error(
      `API key is required. Pass apiKey option or set ${ENV_API_KEY} environment variable.`
    );
  }

  const baseUrl = (
    options.baseUrl || process.env[ENV_BASE_URL] || DEFAULT_BASE_URL
  ).replace(/\/+$/, "");

  return {
    apiKey,
    baseUrl,
    timeout: options.timeout ?? DEFAULT_TIMEOUT,
    maxRetries: options.maxRetries ?? DEFAULT_MAX_RETRIES,
    headers: options.headers ?? {},
  };
}

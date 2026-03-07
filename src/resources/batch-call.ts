/**
 * BESS AI SDK — Batch Call Resource.
 *
 * 10 methods: create, retrieve, list, listActive, listItems, delete,
 *   start, pause, resume, cancel
 */
import type { HTTPClient } from "../client.js";
import type {
  BatchCallResponse,
  BatchCallCreateParams,
  BatchCallStatusResponse,
  BatchCallItemResponse,
  PaginatedResponse,
} from "../types/index.js";

export class BatchCallResource {
  constructor(private readonly client: HTTPClient) {}

  /** Create a batch call campaign. */
  async create(params: BatchCallCreateParams): Promise<BatchCallResponse> {
    return this.client.post<BatchCallResponse>("/v1/batch-calls", {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Retrieve a batch call by ID. */
  async retrieve(batchCallId: string): Promise<BatchCallStatusResponse> {
    return this.client.get<BatchCallStatusResponse>(
      `/v1/batch-calls/${batchCallId}`
    );
  }

  /** Alias for retrieve. */
  get(batchCallId: string): Promise<BatchCallStatusResponse> {
    return this.retrieve(batchCallId);
  }

  /** Get batch call status. */
  getStatus(batchCallId: string): Promise<BatchCallStatusResponse> {
    return this.retrieve(batchCallId);
  }

  /** List batch calls. */
  async list(skip = 0, limit = 50): Promise<PaginatedResponse<BatchCallResponse>> {
    return this.client.get<PaginatedResponse<BatchCallResponse>>("/v1/batch-calls", {
      params: { skip, limit },
    });
  }

  /** List active batch calls. */
  async listActive(): Promise<BatchCallResponse[]> {
    return this.client.get<BatchCallResponse[]>("/v1/batch-calls/active");
  }

  /** List items (contacts) in a batch call. */
  async listItems(
    batchCallId: string,
    skip = 0,
    limit = 100
  ): Promise<PaginatedResponse<BatchCallItemResponse>> {
    return this.client.get<PaginatedResponse<BatchCallItemResponse>>(`/v1/batch-calls/${batchCallId}/items`, {
      params: { skip, limit },
    });
  }

  /** Alias for listItems. */
  getItems(
    batchCallId: string,
    skip = 0,
    limit = 100
  ): Promise<PaginatedResponse<BatchCallItemResponse>> {
    return this.listItems(batchCallId, skip, limit);
  }

  /** Delete a batch call. */
  async delete(batchCallId: string): Promise<Record<string, unknown>> {
    return this.client.delete(`/v1/batch-calls/${batchCallId}`);
  }

  // ── Lifecycle Controls ─────────────────────────────────────────────

  /** Start a batch call campaign. */
  async start(batchCallId: string): Promise<Record<string, unknown>> {
    return this.client.post(`/v1/batch-calls/${batchCallId}/start`);
  }

  /** Pause a running batch call. */
  async pause(batchCallId: string): Promise<Record<string, unknown>> {
    return this.client.post(`/v1/batch-calls/${batchCallId}/pause`);
  }

  /** Resume a paused batch call. */
  async resume(batchCallId: string): Promise<Record<string, unknown>> {
    return this.client.post(`/v1/batch-calls/${batchCallId}/resume`);
  }

  /** Cancel a batch call campaign. */
  async cancel(batchCallId: string): Promise<Record<string, unknown>> {
    return this.client.post(`/v1/batch-calls/${batchCallId}/cancel`);
  }
}

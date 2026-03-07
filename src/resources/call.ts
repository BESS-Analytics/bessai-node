/**
 * BESS AI SDK — Call Resource.
 *
 * 7 methods: createPhoneCall, createWebCall, createTestCall, retrieve, list, end, delete
 */
import type { HTTPClient } from "../client.js";
import type {
  CallResponse,
  CallListItem,
  PhoneCallCreateParams,
  WebCallCreateParams,
  TestCallCreateParams,
  CallListParams,
  PaginatedResponse,
} from "../types/index.js";

export class CallResource {
  constructor(private readonly client: HTTPClient) {}

  /** Create an outbound phone call. */
  async createPhoneCall(params: PhoneCallCreateParams): Promise<CallResponse> {
    return this.client.post<CallResponse>("/api/v1/calls/phone", {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Create a web (browser) call. */
  async createWebCall(params: WebCallCreateParams): Promise<CallResponse> {
    return this.client.post<CallResponse>("/api/v1/calls/web", {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Create a test call for debugging. */
  async createTestCall(params: TestCallCreateParams): Promise<CallResponse> {
    return this.client.post<CallResponse>("/api/v1/calls/test", {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Retrieve a single call by ID. */
  async retrieve(callId: string): Promise<CallResponse> {
    return this.client.get<CallResponse>(`/api/v1/calls/${callId}`);
  }

  /** List calls with optional filters. */
  async list(params?: CallListParams): Promise<PaginatedResponse<CallListItem>> {
    return this.client.get<PaginatedResponse<CallListItem>>("/api/v1/calls", {
      params: params as unknown as Record<string, unknown>,
    });
  }

  /** End an active call. */
  async end(callId: string): Promise<Record<string, unknown>> {
    return this.client.post(`/api/v1/calls/${callId}/end`);
  }

  /** Delete a call record. */
  async delete(callId: string): Promise<Record<string, unknown>> {
    return this.client.delete(`/api/v1/calls/${callId}`);
  }
}

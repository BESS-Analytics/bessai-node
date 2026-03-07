/**
 * BESS AI SDK — Phone Number Resource.
 *
 * 13 methods: create, retrieve, list, update, delete, updateAgents,
 *   createSipConnection, getSipConnection, listSipConnections,
 *   updateSipConnection, deleteSipConnection, listDispatchRules
 */
import type { HTTPClient } from "../client.js";
import type {
  PhoneNumberResponse,
  PhoneNumberDetailResponse,
  PhoneNumberCreateParams,
  PhoneNumberUpdateParams,
  PhoneNumberAgentUpdateParams,
  SIPConnectionResponse,
  SIPConnectionCreateParams,
  SIPConnectionUpdateParams,
  SIPDispatchRuleResponse,
  PaginatedResponse,
} from "../types/index.js";

export class PhoneNumberResource {
  constructor(private readonly client: HTTPClient) {}

  /** Register a phone number. */
  async create(params: PhoneNumberCreateParams): Promise<PhoneNumberResponse> {
    return this.client.post<PhoneNumberResponse>("/v1/phone-numbers", {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Retrieve a phone number by ID. */
  async retrieve(phoneNumberId: string): Promise<PhoneNumberDetailResponse> {
    return this.client.get<PhoneNumberDetailResponse>(
      `/v1/phone-numbers/${phoneNumberId}`
    );
  }

  /** Alias for retrieve. */
  get(phoneNumberId: string): Promise<PhoneNumberDetailResponse> {
    return this.retrieve(phoneNumberId);
  }

  /** List phone numbers. */
  async list(skip = 0, limit = 50): Promise<PaginatedResponse<PhoneNumberResponse>> {
    return this.client.get<PaginatedResponse<PhoneNumberResponse>>("/v1/phone-numbers", {
      params: { skip, limit },
    });
  }

  /** Update a phone number. */
  async update(
    phoneNumberId: string,
    params: PhoneNumberUpdateParams
  ): Promise<PhoneNumberDetailResponse> {
    return this.client.patch<PhoneNumberDetailResponse>(`/v1/phone-numbers/${phoneNumberId}`, {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Delete a phone number. */
  async delete(phoneNumberId: string): Promise<Record<string, unknown>> {
    return this.client.delete(`/v1/phone-numbers/${phoneNumberId}`);
  }

  /** Update the agents assigned to a phone number. */
  async updateAgents(
    phoneNumberId: string,
    params: PhoneNumberAgentUpdateParams
  ): Promise<PhoneNumberDetailResponse> {
    return this.client.patch<PhoneNumberDetailResponse>(`/v1/phone-numbers/${phoneNumberId}/agents`, {
      json: params as unknown as Record<string, unknown>,
    });
  }

  // ── SIP Connections ──────────────────────────────────────────────────

  /** Create a SIP connection for a phone number. */
  async createSipConnection(
    phoneNumberId: string,
    params: SIPConnectionCreateParams
  ): Promise<SIPConnectionResponse> {
    return this.client.post<SIPConnectionResponse>(
      `/v1/phone-numbers/${phoneNumberId}/sip-connections`,
      { json: params as unknown as Record<string, unknown> }
    );
  }

  /** Get a SIP connection. */
  async getSipConnection(
    phoneNumberId: string,
    connectionId: string
  ): Promise<SIPConnectionResponse> {
    return this.client.get<SIPConnectionResponse>(
      `/v1/phone-numbers/${phoneNumberId}/sip-connections/${connectionId}`
    );
  }

  /** List SIP connections for a phone number. */
  async listSipConnections(
    phoneNumberId: string
  ): Promise<SIPConnectionResponse[]> {
    return this.client.get<SIPConnectionResponse[]>(
      `/v1/phone-numbers/${phoneNumberId}/sip-connections`
    );
  }

  /** Update a SIP connection. */
  async updateSipConnection(
    phoneNumberId: string,
    connectionId: string,
    params: SIPConnectionUpdateParams
  ): Promise<SIPConnectionResponse> {
    return this.client.patch<SIPConnectionResponse>(
      `/v1/phone-numbers/${phoneNumberId}/sip-connections/${connectionId}`,
      { json: params as unknown as Record<string, unknown> }
    );
  }

  /** Delete a SIP connection. */
  async deleteSipConnection(
    phoneNumberId: string,
    connectionId: string
  ): Promise<Record<string, unknown>> {
    return this.client.delete(
      `/v1/phone-numbers/${phoneNumberId}/sip-connections/${connectionId}`
    );
  }

  /** List SIP dispatch rules for a phone number. */
  async listDispatchRules(
    phoneNumberId: string
  ): Promise<SIPDispatchRuleResponse[]> {
    return this.client.get<SIPDispatchRuleResponse[]>(
      `/v1/phone-numbers/${phoneNumberId}/dispatch-rules`
    );
  }
}

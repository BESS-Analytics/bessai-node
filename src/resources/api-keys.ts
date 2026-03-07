/**
 * BESS AI SDK — API Keys Resource.
 *
 * 7 methods: create, list, get, update, delete, rotate, getUsage
 */
import type { HTTPClient } from "../client.js";
import type {
  APIKey,
  APIKeyCreated,
  APIKeyCreateParams,
  APIKeyUpdateParams,
  APIKeyUsage,
} from "../types/index.js";

export class APIKeysResource {
  constructor(private readonly client: HTTPClient) {}

  /** Create a new API key. */
  async create(params: APIKeyCreateParams): Promise<APIKeyCreated> {
    return this.client.post<APIKeyCreated>("/v1/api-keys", {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** List all API keys. */
  async list(): Promise<APIKey[]> {
    return this.client.get<APIKey[]>("/v1/api-keys");
  }

  /** Get a single API key by ID. */
  async get(keyId: string): Promise<APIKey> {
    return this.client.get<APIKey>(`/v1/api-keys/${keyId}`);
  }

  /** Update an API key. */
  async update(keyId: string, params: APIKeyUpdateParams): Promise<APIKey> {
    return this.client.patch<APIKey>(`/v1/api-keys/${keyId}`, {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Delete an API key. */
  async delete(keyId: string): Promise<Record<string, unknown>> {
    return this.client.delete(`/v1/api-keys/${keyId}`);
  }

  /** Rotate an API key (generates a new secret). */
  async rotate(keyId: string): Promise<APIKeyCreated> {
    return this.client.post<APIKeyCreated>(
      `/v1/api-keys/${keyId}/rotate`
    );
  }

  /** Get usage stats for an API key. */
  async getUsage(keyId: string): Promise<APIKeyUsage> {
    return this.client.get<APIKeyUsage>(
      `/v1/api-keys/${keyId}/usage`
    );
  }
}

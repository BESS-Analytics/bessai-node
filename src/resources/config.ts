/**
 * BESS AI SDK — Config Resource.
 *
 * 4 methods: getProviders, getProvider, getDefaults, getLanguages
 */
import type { HTTPClient } from "../client.js";
import type {
  ProviderConfig,
  DefaultsConfig,
  LanguageEntry,
} from "../types/index.js";

export class ConfigResource {
  constructor(private readonly client: HTTPClient) {}

  /** Get all provider configurations. */
  async getProviders(): Promise<ProviderConfig> {
    return this.client.get<ProviderConfig>(
      "/v1/config/providers"
    );
  }

  /** Get configuration for a specific provider category (stt, llm, tts, realtime). */
  async getProvider(category: string): Promise<Record<string, unknown>> {
    return this.client.get(`/v1/config/providers/${category}`);
  }

  /** Get model defaults. */
  async getDefaults(): Promise<DefaultsConfig> {
    return this.client.get<DefaultsConfig>(
      "/v1/config/defaults"
    );
  }

  /** Get supported languages. */
  async getLanguages(): Promise<LanguageEntry[]> {
    return this.client.get<LanguageEntry[]>("/v1/config/languages");
  }
}

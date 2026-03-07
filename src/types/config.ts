/** Configuration types for the BESS AI SDK. */

export interface ProviderConfig {
  stt: Record<string, unknown>;
  llm: Record<string, unknown>;
  tts: Record<string, unknown>;
  realtime: Record<string, unknown>;
  analytics: Record<string, unknown>;
  languages: unknown[];
  defaults: Record<string, unknown>;
}

export interface DefaultsConfig {
  stt_provider?: string;
  stt_model?: string;
  llm_provider?: string;
  llm_model?: string;
  voice_provider?: string;
  voice_id?: string;
  [key: string]: unknown;
}

export interface LanguageEntry {
  code: string;
  name: string;
  native_name?: string;
  [key: string]: unknown;
}

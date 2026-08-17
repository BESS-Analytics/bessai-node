/** Agent types for the BESS AI SDK. */

// ── Response Models ──────────────────────────────────────────────────────

export interface AgentVersion {
  version: number;
  agent_type?: string;
  agent_mode?: string;
  system_prompt?: string;
  greeting_message?: string;
  llm_provider?: string;
  llm_model?: string;
  llm_base_url?: string;
  temperature?: number;
  max_completion_tokens?: number;
  voice_provider?: string;
  voice_id?: string;
  voice_speed?: number;
  voice_stability?: number;
  tts_model?: string;
  volume?: number;
  emotion?: string;
  tts_base_url?: string;
  tts_sample_rate?: number;
  tts_use_websocket?: boolean;
  stt_provider?: string;
  stt_model?: string;
  stt_base_url?: string;
  stt_multilingual?: boolean;
  realtime_provider?: string;
  realtime_model?: string;
  realtime_voice?: string;
  language?: string;
  responsiveness?: number;
  endpointing_ms?: number;
  interruption_sensitivity?: number;
  enable_backchannel?: boolean;
  response_delay_ms?: number;
  end_call_after_silence_ms?: number;
  max_call_duration_ms?: number;
  reminder_trigger_ms?: number;
  reminder_max_count?: number;
  background_sound?: string;
  background_sound_volume?: number;
  thinking_sound?: string;
  analytics_prompt?: string;
  analytics_model_provider?: string;
  analytics_model?: string;
  enable_sentiment_analysis?: boolean;
  enable_summary_generation?: boolean;
  knowledge_base_ids?: string[];
  mcp_config?: Record<string, unknown>;
  native_tools_config?: Record<string, unknown>;
  created_at?: string;
}

export interface LinkedWorkflow {
  workflow_id: string;
  workflow_name?: string;
  trigger_condition_description?: string;
  priority: number;
  is_enabled: boolean;
  execution_mode_override?: string;
}

export interface AgentResponse {
  /** Aliased from `id`. */
  agent_id: string;
  /** Aliased from `name`. */
  agent_name: string;
  description?: string;
  is_published: boolean;
  published_version?: number;
  agent_type?: string;
  agent_mode?: string;
  created_at?: string;
  updated_at?: string;
  versions?: AgentVersion[];
  linked_workflows?: LinkedWorkflow[];
}

// ── Request Models ───────────────────────────────────────────────────────

export interface AgentCreateParams {
  agent_name: string;
  description?: string;
  agent_type?: string;
  agent_mode?: string;
  version_description?: string;
  llm_provider?: string;
  llm_model?: string;
  llm_base_url?: string;
  llm_api_key?: string;
  system_prompt?: string;
  greeting_message?: string;
  temperature?: number;
  max_completion_tokens?: number;
  voice_provider?: string;
  voice_id?: string;
  voice_speed?: number;
  voice_stability?: number;
  tts_model?: string;
  volume?: number;
  emotion?: string;
  tts_base_url?: string;
  tts_sample_rate?: number;
  tts_use_websocket?: boolean;
  stt_provider?: string;
  stt_model?: string;
  stt_base_url?: string;
  stt_api_key?: string;
  stt_multilingual?: boolean;
  realtime_provider?: string;
  realtime_model?: string;
  realtime_voice?: string;
  language?: string;
  responsiveness?: number;
  endpointing_ms?: number;
  interruption_sensitivity?: number;
  enable_backchannel?: boolean;
  response_delay_ms?: number;
  end_call_after_silence_ms?: number;
  max_call_duration_ms?: number;
  reminder_trigger_ms?: number;
  reminder_max_count?: number;
  background_sound?: string;
  background_sound_volume?: number;
  thinking_sound?: string;
  analytics_prompt?: string;
  analytics_model_provider?: string;
  analytics_model?: string;
  enable_sentiment_analysis?: boolean;
  enable_summary_generation?: boolean;
  knowledge_base_ids?: string[];
  webhook_url?: string;
  mcp_config?: Record<string, unknown>;
  native_tools_config?: Record<string, unknown>;
  post_call_analysis_config?: Record<string, unknown>;
}

export interface AgentUpdateParams {
  agent_name?: string;
  description?: string;
  agent_type?: string;
  agent_mode?: string;
  version_description?: string;
  llm_provider?: string;
  llm_model?: string;
  llm_base_url?: string;
  llm_api_key?: string;
  system_prompt?: string;
  greeting_message?: string;
  temperature?: number;
  max_completion_tokens?: number;
  voice_provider?: string;
  voice_id?: string;
  voice_speed?: number;
  voice_stability?: number;
  tts_model?: string;
  volume?: number;
  emotion?: string;
  tts_base_url?: string;
  tts_sample_rate?: number;
  tts_use_websocket?: boolean;
  stt_provider?: string;
  stt_model?: string;
  stt_base_url?: string;
  stt_api_key?: string;
  stt_multilingual?: boolean;
  realtime_provider?: string;
  realtime_model?: string;
  realtime_voice?: string;
  language?: string;
  responsiveness?: number;
  endpointing_ms?: number;
  interruption_sensitivity?: number;
  enable_backchannel?: boolean;
  response_delay_ms?: number;
  end_call_after_silence_ms?: number;
  max_call_duration_ms?: number;
  reminder_trigger_ms?: number;
  reminder_max_count?: number;
  background_sound?: string;
  background_sound_volume?: number;
  thinking_sound?: string;
  analytics_prompt?: string;
  analytics_model_provider?: string;
  analytics_model?: string;
  enable_sentiment_analysis?: boolean;
  enable_summary_generation?: boolean;
  knowledge_base_ids?: string[];
  webhook_url?: string;
  mcp_config?: Record<string, unknown>;
  native_tools_config?: Record<string, unknown>;
  post_call_analysis_config?: Record<string, unknown>;
}

/** Convert agent create params to API body (agent_name → name). */
export function agentCreateToApi(params: AgentCreateParams): Record<string, unknown> {
  const { agent_name, ...rest } = params;
  return stripUndefined({ name: agent_name, ...rest });
}

/** Convert agent update params to API body (agent_name → name). */
export function agentUpdateToApi(params: AgentUpdateParams): Record<string, unknown> {
  const { agent_name, ...rest } = params;
  const out: Record<string, unknown> = { ...rest };
  if (agent_name !== undefined) out.name = agent_name;
  return stripUndefined(out);
}

function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  );
}

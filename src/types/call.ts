/** Call types for the BESS AI SDK. */

// ── Response Models ──────────────────────────────────────────────────────

export interface WorkflowExecutionSummary {
  id: string;
  workflow_id: string;
  workflow_name?: string;
  status: string;
  trigger_type: string;
  trigger_source?: string;
  execution_time_ms?: number;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
}

export interface CallResponse {
  call_id: string;
  call_type: string;
  status: string;
  agent_id: string;
  from_number?: string;
  to_number?: string;
  access_token?: string;
  room_name?: string;
  room_url?: string;
  start_time?: string;
  end_time?: string;
  duration_seconds?: number;
  transcript?: Record<string, unknown>[];
  recording_url?: string;
  call_analysis?: Record<string, unknown>;
  call_summary?: Record<string, unknown>;
  call_sentiment?: Record<string, unknown>;
  call_cost?: Record<string, unknown>;
  latency_metrics?: Record<string, unknown>;
  processing_status?: string;
  workflow_executions?: WorkflowExecutionSummary[];
  created_at: string;
}

export interface CallListItem {
  call_id: string;
  call_type: string;
  status: string;
  agent_id?: string;
  agent_name?: string;
  from_number?: string;
  to_number?: string;
  duration_seconds?: number;
  start_time?: string;
  created_at: string;
}

// ── Request Models ───────────────────────────────────────────────────────

export interface PhoneCallCreateParams {
  agent_id: string;
  from_number: string;
  to_number: string;
  metadata?: Record<string, unknown>;
  dynamic_variables?: Record<string, string>;
  batch_call_id?: string;
}

export interface WebCallCreateParams {
  agent_id: string;
  metadata?: Record<string, unknown>;
  dynamic_variables?: Record<string, string>;
}

export interface TestCallCreateParams {
  agent_id: string;
  temp_config?: Record<string, unknown>;
  dynamic_variables?: Record<string, string>;
}

export interface CallListParams {
  skip?: number;
  limit?: number;
  agent_id?: string;
  status?: string;
  call_type?: string;
  batch_call_id?: string;
  from_date?: string;
  to_date?: string;
}

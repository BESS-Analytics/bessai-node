/** Batch call types for the BESS AI SDK. */

export interface BatchCallContact {
  phone_number: string;
  dynamic_variables?: Record<string, unknown>;
}

export interface BatchCallCreateParams {
  agent_id: string;
  from_number: string;
  contacts: BatchCallContact[];
  max_concurrent_calls?: number;
  retry_attempts?: number;
  name?: string;
}

export interface BatchCallResponse {
  batch_call_id: string;
  name: string;
  agent_id: string;
  from_number: string;
  total_count: number;
  completed_count: number;
  failed_count: number;
  max_concurrent: number;
  retry_attempts: number;
  status: string;
  progress_percent: number;
  started_at?: string;
  completed_at?: string;
  created_at?: string;
}

export interface BatchCallStatusResponse {
  batch_call_id: string;
  name?: string;
  status: string;
  total: number;
  pending: number;
  active: number;
  completed: number;
  failed: number;
  processed: number;
  counts: Record<string, number>;
  progress_percent: number;
  started_at?: string;
  completed_at?: string;
}

export interface BatchCallItemResponse {
  item_id: string;
  phone_number: string;
  status: string;
  attempt_count: number;
  call_id?: string;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
}

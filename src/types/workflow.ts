/** Workflow types for the BESS AI SDK. */

// ── Response Models ──────────────────────────────────────────────────────

export interface WorkflowResponse {
  workflow_id: string;
  name?: string;
  description?: string;
  trigger_type?: string;
  status?: string;
  is_active?: boolean;
  execution_mode?: string;
  timeout_seconds?: number;
  n8n_workflow_id?: string;
  webhook_slug?: string;
  created_at?: string;
  updated_at?: string;
  deployed_at?: string;
  last_executed_at?: string;
}

export interface WorkflowDetailResponse {
  workflow_id: string;
  name?: string;
  description?: string;
  trigger_type?: string;
  trigger_config?: Record<string, unknown>;
  status?: string;
  is_active?: boolean;
  execution_mode?: string;
  timeout_seconds?: number;
  workflow_json?: Record<string, unknown>;
  n8n_workflow_id?: string;
  webhook_slug?: string;
  detected_credentials?: Record<string, unknown>[];
  original_description?: string;
  generation_history?: Record<string, unknown>[];
  created_at?: string;
  updated_at?: string;
  deployed_at?: string;
  last_executed_at?: string;
}

export interface WorkflowExecutionResponse {
  execution_id: string;
  workflow_id?: string;
  call_id?: string;
  trigger_type?: string;
  trigger_source?: string;
  n8n_execution_id?: string;
  status: string;
  input_snapshot?: Record<string, unknown>;
  output_data?: Record<string, unknown>;
  error_message?: string;
  error_stack?: string;
  execution_time_ms?: number;
  retry_count?: number;
  is_retry?: boolean;
  started_at?: string;
  completed_at?: string;
}

export interface CredentialFieldSchema {
  name: string;
  required: boolean;
  type: string;
  description?: string;
  default?: unknown;
}

export interface CredentialSchemaResponse {
  credential_type: string;
  fields: CredentialFieldSchema[];
  source?: string;
}

export interface AgentWorkflowLinkResponse {
  agent_id: string;
  workflow_id: string;
  trigger_condition_description?: string;
  priority: number;
  is_enabled: boolean;
  execution_mode_override?: string;
}

export interface AgentWorkflowListItem {
  workflow_id: string;
  name?: string;
  description?: string;
  trigger_type?: string;
  status?: string;
  is_active?: boolean;
  trigger_condition_description?: string;
  priority: number;
  is_enabled: boolean;
  execution_mode_override?: string;
}

export interface ScheduleStatusResponse {
  workflow_id: string;
  is_scheduled: boolean;
  trigger_type?: string;
  trigger_config?: Record<string, unknown>;
  next_run?: string;
  job_details?: Record<string, unknown>;
}

export interface GenerateResponse {
  workflow_id?: string;
  workflow_json?: Record<string, unknown>;
  required_secrets?: Record<string, unknown>[];
  visualization?: Record<string, unknown>;
}

export interface DeployResponse {
  status: string;
  workflow_id?: string;
  n8n_workflow_id?: string;
  error?: string;
}

export interface ExecuteResponse {
  status: string;
  execution_id?: string;
  execution_time_ms?: number;
  output?: Record<string, unknown>;
  error?: string;
}

// ── Request Models ───────────────────────────────────────────────────────
export interface WorkflowCreateParams {
  name: string;
  trigger_type: string;
  workflow_json: Record<string, unknown>;
  description?: string;
  trigger_config?: Record<string, unknown>;
  execution_mode?: string;
  timeout_seconds?: number;
}

export interface WorkflowCreateResponse {
  workflow_id: string;
  name: string;
  trigger_type?: string;
  status?: string;
  message?: string;
}
export interface WorkflowGenerateParams {
  name: string;
  description: string;
  trigger_type?: string;
  trigger_config?: Record<string, unknown>;
  agent_id?: string;
}

export interface WorkflowRefineParams {
  feedback: string;
}

export interface WorkflowUpdateParams {
  name?: string;
  description?: string;
  is_active?: boolean;
  status?: string;
  execution_mode?: string;
  timeout_seconds?: number;
}

export interface SecretInput {
  key_name: string;
  value: string;
  type?: string;
}

export interface WorkflowSecretsParams {
  secrets: SecretInput[];
  validate_credentials?: boolean;
}

export interface LinkAgentParams {
  trigger_condition_description?: string;
  priority?: number;
  execution_mode_override?: string;
}

export interface UpdateAgentLinkParams {
  trigger_condition_description?: string;
  priority?: number;
  is_enabled?: boolean;
  execution_mode_override?: string;
}

export interface ManualExecuteParams {
  context_data?: Record<string, unknown>;
  execution_mode?: string;
}

export interface WorkflowListParams {
  trigger_type?: string;
  status?: string;
  agent_id?: string;
  include_deleted?: boolean;
  page?: number;
  per_page?: number;
}

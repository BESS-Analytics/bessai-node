/**
 * BESS AI SDK — Workflow Resource.
 *
 * 24 methods matching the Python SDK.
 */
import type { HTTPClient } from "../client.js";
import type {
  WorkflowResponse,
  WorkflowDetailResponse,
  WorkflowExecutionResponse,
  CredentialSchemaResponse,
  AgentWorkflowLinkResponse,
  AgentWorkflowListItem,
  ScheduleStatusResponse,
  WorkflowCreateParams,
  WorkflowCreateResponse,
  GenerateResponse,
  DeployResponse,
  ExecuteResponse,
  WorkflowGenerateParams,
  WorkflowRefineParams,
  WorkflowUpdateParams,
  WorkflowSecretsParams,
  LinkAgentParams,
  UpdateAgentLinkParams,
  ManualExecuteParams,
  WorkflowListParams,
  PaginatedResponse,
} from "../types/index.js";

export class WorkflowResource {
  constructor(private readonly client: HTTPClient) {}

  // ── CRUD ───────────────────────────────────────────────────────────
  /** Create a workflow by providing n8n JSON directly. */
  async create(params: WorkflowCreateParams): Promise<WorkflowCreateResponse> {
    return this.client.post<WorkflowCreateResponse>("/api/v1/workflows", {
      json: params as unknown as Record<string, unknown>,
    });
  }
  /** Generate a new workflow from a natural-language description. */
  async generate(params: WorkflowGenerateParams): Promise<GenerateResponse> {
    return this.client.post<GenerateResponse>("/api/v1/workflows/generate", {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Retrieve a single workflow. */
  async retrieve(workflowId: string): Promise<WorkflowDetailResponse> {
    return this.client.get<WorkflowDetailResponse>(
      `/api/v1/workflows/${workflowId}`
    );
  }

  /** List workflows with optional filters. */
  async list(
    params?: WorkflowListParams
  ): Promise<PaginatedResponse<WorkflowResponse>> {
    return this.client.get<PaginatedResponse<WorkflowResponse>>("/api/v1/workflows", {
      params: params as unknown as Record<string, unknown>,
    });
  }

  /** Update a workflow. */
  async update(
    workflowId: string,
    params: WorkflowUpdateParams
  ): Promise<WorkflowDetailResponse> {
    return this.client.patch<WorkflowDetailResponse>(`/api/v1/workflows/${workflowId}`, {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Delete a workflow. */
  async delete(workflowId: string): Promise<Record<string, unknown>> {
    return this.client.delete(`/api/v1/workflows/${workflowId}`);
  }

  /** Refine a workflow with additional feedback. */
  async refine(
    workflowId: string,
    params: WorkflowRefineParams
  ): Promise<GenerateResponse> {
    return this.client.post<GenerateResponse>(`/api/v1/workflows/${workflowId}/refine`, {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Restore a workflow to a previous version. */
  async restore(
    workflowId: string,
    version: number
  ): Promise<WorkflowDetailResponse> {
    return this.client.post<WorkflowDetailResponse>(`/api/v1/workflows/${workflowId}/restore`, {
      json: { version },
    });
  }

  // ── Secrets ────────────────────────────────────────────────────────

  /** Save encrypted secrets for a workflow. */
  async saveSecrets(
    workflowId: string,
    params: WorkflowSecretsParams
  ): Promise<Record<string, unknown>> {
    return this.client.post(`/api/v1/workflows/${workflowId}/secrets`, {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** Get the credential schema for a workflow. */
  async getCredentialSchema(
    workflowId: string
  ): Promise<CredentialSchemaResponse[]> {
    return this.client.get<CredentialSchemaResponse[]>(
      `/api/v1/workflows/${workflowId}/credential-schema`
    );
  }

  // ── Deploy / Execute ───────────────────────────────────────────────

  /** Deploy a workflow to n8n. */
  async deploy(workflowId: string): Promise<DeployResponse> {
    return this.client.post<DeployResponse>(
      `/api/v1/workflows/${workflowId}/deploy`
    );
  }

  /** Test-execute a workflow. */
  async test(workflowId: string): Promise<ExecuteResponse> {
    return this.client.post<ExecuteResponse>(
      `/api/v1/workflows/${workflowId}/test`
    );
  }

  /** Manually execute a workflow. */
  async execute(
    workflowId: string,
    params?: ManualExecuteParams
  ): Promise<ExecuteResponse> {
    return this.client.post<ExecuteResponse>(`/api/v1/workflows/${workflowId}/execute`, {
      json: (params as unknown as Record<string, unknown>) ?? {},
    });
  }

  /** List past executions of a workflow. */
  async listExecutions(
    workflowId: string,
    skip = 0,
    limit = 50,
    status?: string
  ): Promise<PaginatedResponse<WorkflowExecutionResponse>> {
    return this.client.get<PaginatedResponse<WorkflowExecutionResponse>>(`/api/v1/workflows/${workflowId}/executions`, {
      params: { skip, limit, status },
    });
  }

  // ── Export / Import ────────────────────────────────────────────────

  /** Export a workflow's JSON definition. */
  async export(workflowId: string): Promise<Record<string, unknown>> {
    return this.client.get(`/api/v1/workflows/${workflowId}/export`);
  }

  /** Import a workflow from exported JSON. */
  async importWorkflow(data: Record<string, unknown>): Promise<WorkflowResponse> {
    return this.client.post<WorkflowResponse>("/api/v1/workflows/import", {
      json: data,
    });
  }

  // ── Agent Linking ──────────────────────────────────────────────────

  /** Link a workflow to an agent. */
  async linkAgent(
    workflowId: string,
    agentId: string,
    params?: LinkAgentParams
  ): Promise<AgentWorkflowLinkResponse> {
    return this.client.post<AgentWorkflowLinkResponse>(
      `/api/v1/workflows/${workflowId}/agents/${agentId}`,
      { json: (params as unknown as Record<string, unknown>) ?? {} }
    );
  }

  /** Update a workflow-agent link. */
  async updateAgentLink(
    workflowId: string,
    agentId: string,
    params: UpdateAgentLinkParams
  ): Promise<AgentWorkflowLinkResponse> {
    return this.client.patch<AgentWorkflowLinkResponse>(
      `/api/v1/workflows/${workflowId}/agents/${agentId}`,
      { json: params as unknown as Record<string, unknown> }
    );
  }

  /** Unlink an agent from a workflow. */
  async unlinkAgent(
    workflowId: string,
    agentId: string
  ): Promise<Record<string, unknown>> {
    return this.client.delete(
      `/api/v1/workflows/${workflowId}/agents/${agentId}`
    );
  }

  /** List agents linked to a workflow. */
  async listAgents(workflowId: string): Promise<AgentWorkflowListItem[]> {
    return this.client.get<AgentWorkflowListItem[]>(
      `/api/v1/workflows/${workflowId}/agents`
    );
  }

  /** List workflows linked to an agent. */
  async listByAgent(agentId: string): Promise<AgentWorkflowListItem[]> {
    return this.client.get<AgentWorkflowListItem[]>(
      `/api/v1/agents/${agentId}/workflows`
    );
  }

  // ── Scheduling ─────────────────────────────────────────────────────

  /** Set a schedule for a workflow. */
  async setSchedule(
    workflowId: string,
    config: Record<string, unknown>
  ): Promise<ScheduleStatusResponse> {
    return this.client.post<ScheduleStatusResponse>(`/api/v1/workflows/${workflowId}/schedule`, {
      json: config,
    });
  }

  /** Remove the schedule from a workflow. */
  async removeSchedule(workflowId: string): Promise<Record<string, unknown>> {
    return this.client.delete(`/api/v1/workflows/${workflowId}/schedule`);
  }

  /** Get the current schedule status. */
  async getSchedule(workflowId: string): Promise<ScheduleStatusResponse> {
    return this.client.get<ScheduleStatusResponse>(
      `/api/v1/workflows/${workflowId}/schedule`
    );
  }

  /** List all scheduled workflows in the organization. */
  async listSchedules(): Promise<ScheduleStatusResponse[]> {
    return this.client.get<ScheduleStatusResponse[]>("/api/v1/workflows/schedules");
  }
}

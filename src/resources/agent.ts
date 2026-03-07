/**
 * BESS AI SDK — Agent Resource.
 *
 * 12 methods matching the Python SDK:
 *   create, retrieve, list, update, delete, publish,
 *   getVersions, export, importAgent, linkWorkflow, unlinkWorkflow, listWorkflows
 */
import type { HTTPClient } from "../client.js";
import type {
  AgentResponse,
  AgentCreateParams,
  AgentUpdateParams,
  PaginatedResponse,
} from "../types/index.js";
import { agentCreateToApi, agentUpdateToApi } from "../types/agent.js";

export class AgentResource {
  constructor(private readonly client: HTTPClient) {}

  /** Create a new agent. */
  async create(params: AgentCreateParams): Promise<AgentResponse> {
    return this.client.post<AgentResponse>("/api/v1/agents", {
      json: agentCreateToApi(params) as Record<string, unknown>,
    });
  }

  /** Retrieve an agent by ID. */
  async retrieve(agentId: string): Promise<AgentResponse> {
    return this.client.get<AgentResponse>(`/api/v1/agents/${agentId}`);
  }

  /** List agents with pagination. */
  async list(skip = 0, limit = 50): Promise<PaginatedResponse<AgentResponse>> {
    return this.client.get<PaginatedResponse<AgentResponse>>("/api/v1/agents", {
      params: { skip, limit },
    });
  }

  /** Update an existing agent. */
  async update(agentId: string, params: AgentUpdateParams): Promise<AgentResponse> {
    return this.client.patch<AgentResponse>(`/api/v1/agents/${agentId}`, {
      json: agentUpdateToApi(params) as Record<string, unknown>,
    });
  }

  /** Delete an agent. */
  async delete(agentId: string): Promise<Record<string, unknown>> {
    return this.client.delete(`/api/v1/agents/${agentId}`);
  }

  /** Publish an agent version. */
  async publish(agentId: string, version?: number): Promise<AgentResponse> {
    const params: Record<string, unknown> = {};
    if (version !== undefined) params.version = version;
    return this.client.post<AgentResponse>(`/api/v1/agents/${agentId}/publish`, {
      params,
    });
  }

  /** Get all versions of an agent. */
  async getVersions(agentId: string): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/agents/${agentId}/versions`);
  }

  /** Export agent configuration as JSON. */
  async export(agentId: string): Promise<Record<string, unknown>> {
    return this.client.get(`/api/v1/agents/${agentId}/export`);
  }

  /** Import an agent from previously exported JSON. */
  async importAgent(data: Record<string, unknown>): Promise<AgentResponse> {
    return this.client.post<AgentResponse>("/api/v1/agents/import", {
      json: data,
    });
  }

  /** Link a workflow to an agent. */
  async linkWorkflow(
    agentId: string,
    workflowId: string,
    options?: {
      triggerConditionDescription?: string;
      priority?: number;
      executionModeOverride?: string;
    }
  ): Promise<Record<string, unknown>> {
    return this.client.post(`/api/v1/agents/${agentId}/workflows/${workflowId}`, {
      json: options
        ? {
            trigger_condition_description: options.triggerConditionDescription,
            priority: options.priority,
            execution_mode_override: options.executionModeOverride,
          }
        : {},
    });
  }

  /** Unlink a workflow from an agent. */
  async unlinkWorkflow(
    agentId: string,
    workflowId: string
  ): Promise<Record<string, unknown>> {
    return this.client.delete(`/api/v1/agents/${agentId}/workflows/${workflowId}`);
  }

  /** List workflows linked to an agent. */
  async listWorkflows(agentId: string): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/agents/${agentId}/workflows`);
  }
}

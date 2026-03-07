/**
 * BESS AI SDK — Analytics Resource.
 *
 * 3 methods: getSummary, getLatency, getCallsByDay
 */
import type { HTTPClient } from "../client.js";
import type {
  AnalyticsSummary,
  LatencyMetrics,
  CallsByDay,
} from "../types/index.js";

export class AnalyticsResource {
  constructor(private readonly client: HTTPClient) {}

  /** Get aggregate call analytics summary. */
  async getSummary(
    fromDate?: string,
    toDate?: string,
    agentId?: string
  ): Promise<AnalyticsSummary> {
    return this.client.get<AnalyticsSummary>("/api/v1/analytics/summary", {
      params: { from_date: fromDate, to_date: toDate, agent_id: agentId },
    });
  }

  /** Get latency percentile metrics. */
  async getLatency(
    fromDate?: string,
    toDate?: string,
    agentId?: string
  ): Promise<LatencyMetrics> {
    return this.client.get<LatencyMetrics>("/api/v1/analytics/latency", {
      params: { from_date: fromDate, to_date: toDate, agent_id: agentId },
    });
  }

  /** Get call counts grouped by day. */
  async getCallsByDay(
    fromDate?: string,
    toDate?: string,
    agentId?: string
  ): Promise<CallsByDay[]> {
    return this.client.get<CallsByDay[]>("/api/v1/analytics/calls-by-day", {
      params: { from_date: fromDate, to_date: toDate, agent_id: agentId },
    });
  }
}

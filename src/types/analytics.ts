/** Analytics types for the BESS AI SDK. */

export interface LatencyPercentiles {
  p50?: number;
  p90?: number;
  p95?: number;
  p99?: number;
}

export interface LatencyMetrics {
  e2e?: LatencyPercentiles;
  stt?: LatencyPercentiles;
  llm?: LatencyPercentiles;
  tts?: LatencyPercentiles;
}

export interface AnalyticsSummary {
  total_calls: number;
  completed_calls: number;
  failed_calls: number;
  total_duration_seconds: number;
  average_duration_seconds: number;
  success_rate: number;
  from_date?: string;
  to_date?: string;
}

export interface CallsByDay {
  date: string;
  count: number;
}

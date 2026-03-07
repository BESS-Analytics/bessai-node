/** Billing & credit types for the BESS AI SDK. */

// ── Credit Balance ───────────────────────────────────────────────────────

export interface CreditBalanceResponse {
  current_balance: number;
  total_credits_added: number;
  total_credits_used: number;
  organization_id: string;
}

export interface BalanceCheckResponse {
  sufficient: boolean;
  balance: number;
  required: number;
  min_balance: number;
  shortfall: number;
}

// ── Transaction Ledger ───────────────────────────────────────────────────

export interface CreditLedgerEntry {
  id: string;
  organization_id: string;
  transaction_type: string;
  amount_usd: number;
  balance_before: number;
  balance_after: number;
  description?: string;
  reference_id?: string;
  reference_type?: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface TransactionListResponse {
  entries: CreditLedgerEntry[];
  total: number;
  limit: number;
  offset: number;
}

// ── Usage ────────────────────────────────────────────────────────────────

export interface UsageEvent {
  id: string;
  organization_id: string;
  event_type: string;
  reference_id: string;
  reference_type: string;
  provider?: string;
  model?: string;
  price_usd: number;
  created_at: string;
}

export interface UsageListResponse {
  events: UsageEvent[];
  total: number;
  limit: number;
  offset: number;
}

export interface UsageSummaryResponse {
  organization_id: string;
  period: Record<string, string>;
  total_events: number;
  total_price_usd: number;
  breakdown: Record<string, unknown>;
}

export interface DailyUsageItem {
  date: string;
  event_count: number;
  total_price_usd: number;
}

export interface CallUsageResponse {
  call_id: string;
  events: UsageEvent[];
  total_price_usd: number;
}

// ── Pricing ──────────────────────────────────────────────────────────────

export interface ServicePricingResponse {
  voice_call_pricing: Record<string, unknown>;
  service_pricing: Record<string, unknown>;
  credit_config: Record<string, unknown>;
}

export interface PricingEstimateParams {
  agent_type?: string;
  stt_provider?: string;
  stt_model?: string;
  llm_provider?: string;
  llm_model?: string;
  voice_provider?: string;
  realtime_provider?: string;
  realtime_model?: string;
}

export interface PricingEstimateResponse {
  total_per_minute: number;
  pricing_type: string;
  components: Record<string, number>;
  post_call_analytics_per_execution?: number;
}

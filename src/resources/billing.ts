/**
 * BESS AI SDK — Billing Resource.
 *
 * 9 methods: getBalance, checkBalance, listTransactions, listUsage,
 *   getUsageSummary, getDailyUsage, getCallUsage, getPricing, estimatePricing
 */
import type { HTTPClient } from "../client.js";
import type {
  CreditBalanceResponse,
  BalanceCheckResponse,
  TransactionListResponse,
  UsageListResponse,
  UsageSummaryResponse,
  DailyUsageItem,
  CallUsageResponse,
  ServicePricingResponse,
  PricingEstimateParams,
  PricingEstimateResponse,
} from "../types/index.js";

export class BillingResource {
  constructor(private readonly client: HTTPClient) {}

  /** Get current credit balance. */
  async getBalance(): Promise<CreditBalanceResponse> {
    return this.client.get<CreditBalanceResponse>(
      "/api/v1/billing/balance"
    );
  }

  /** Check if balance is sufficient for a given amount. */
  async checkBalance(amount: number): Promise<BalanceCheckResponse> {
    return this.client.get<BalanceCheckResponse>("/api/v1/billing/balance/check", {
      params: { amount },
    });
  }

  /** List credit transactions. */
  async listTransactions(
    limit = 50,
    offset = 0,
    transactionType?: string
  ): Promise<TransactionListResponse> {
    return this.client.get<TransactionListResponse>("/api/v1/billing/transactions", {
      params: { limit, offset, transaction_type: transactionType },
    });
  }

  /** List usage events. */
  async listUsage(
    limit = 50,
    offset = 0,
    eventType?: string
  ): Promise<UsageListResponse> {
    return this.client.get<UsageListResponse>("/api/v1/billing/usage", {
      params: { limit, offset, event_type: eventType },
    });
  }

  /** Get a summary of usage for a time period. */
  async getUsageSummary(
    fromDate?: string,
    toDate?: string
  ): Promise<UsageSummaryResponse> {
    return this.client.get<UsageSummaryResponse>("/api/v1/billing/usage/summary", {
      params: { from_date: fromDate, to_date: toDate },
    });
  }

  /** Get daily usage breakdown. */
  async getDailyUsage(
    fromDate?: string,
    toDate?: string
  ): Promise<DailyUsageItem[]> {
    return this.client.get<DailyUsageItem[]>("/api/v1/billing/usage/daily", {
      params: { from_date: fromDate, to_date: toDate },
    });
  }

  /** Get usage breakdown for a specific call. */
  async getCallUsage(callId: string): Promise<CallUsageResponse> {
    return this.client.get<CallUsageResponse>(
      `/api/v1/billing/usage/calls/${callId}`
    );
  }

  /** Get service pricing tables. */
  async getPricing(): Promise<ServicePricingResponse> {
    return this.client.get<ServicePricingResponse>(
      "/api/v1/billing/pricing"
    );
  }

  /** Estimate cost for a given agent configuration. */
  async estimatePricing(
    params: PricingEstimateParams
  ): Promise<PricingEstimateResponse> {
    return this.client.post<PricingEstimateResponse>("/api/v1/billing/pricing/estimate", {
      json: params as unknown as Record<string, unknown>,
    });
  }
}

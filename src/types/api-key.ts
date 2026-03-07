/** API key types for the BESS AI SDK. */

export interface APIKey {
  id: string;
  name: string;
  key_prefix: string;
  scopes: string[];
  rate_limit_tier: string;
  ip_allowlist: string[];
  is_active: boolean;
  usage_count: number;
  last_used_at?: string;
  last_used_ip?: string;
  expires_at?: string;
  grace_period_ends_at?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface APIKeyCreated {
  id: string;
  name: string;
  /** Full plaintext key — shown only once. */
  key: string;
  key_prefix: string;
  scopes: string[];
  rate_limit_tier: string;
  ip_allowlist: string[];
  is_active: boolean;
  expires_at?: string;
  created_at?: string;
  message: string;
}

export interface APIKeyCreateParams {
  name: string;
  scopes?: string[];
  expires_in_days?: number;
  rate_limit_tier?: string;
  ip_allowlist?: string[];
}

export interface APIKeyUpdateParams {
  name?: string;
  scopes?: string[];
  rate_limit_tier?: string;
  ip_allowlist?: string[];
  is_active?: boolean;
}

export interface APIKeyUsage {
  key_id: string;
  key_name: string;
  key_prefix: string;
  total_requests: number;
  last_used_at?: string;
  last_used_ip?: string;
  rate_limit_tier: string;
  rate_limits: Record<string, unknown>;
  is_active: boolean;
  expires_at?: string;
}

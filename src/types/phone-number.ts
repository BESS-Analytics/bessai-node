/** Phone number types for the BESS AI SDK. */

// ── SIP Connection ───────────────────────────────────────────────────────

export interface SIPConnectionResponse {
  sip_connection_id: string;
  phone_number_id: string;
  termination_uri: string;
  username?: string;
  nickname?: string;
  connection_type: string;
  transport: string;
  livekit_trunk_id?: string;
  sync_status: string;
  sync_error?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SIPConnectionCreateParams {
  termination_uri: string;
  username?: string;
  password?: string;
  nickname?: string;
  connection_type?: string;
  transport?: string;
}

export interface SIPConnectionUpdateParams {
  termination_uri?: string;
  username?: string;
  password?: string;
  nickname?: string;
  connection_type?: string;
  transport?: string;
}

// ── SIP Dispatch Rule ────────────────────────────────────────────────────

export interface SIPDispatchRuleResponse {
  dispatch_rule_id: string;
  name: string;
  description?: string;
  rule_type: string;
  room_name?: string;
  room_prefix?: string;
  agent_id?: string;
  hide_phone_number: boolean;
  auto_answer: boolean;
  ring_timeout_seconds: number;
  priority: number;
  livekit_rule_id?: string;
  livekit_sync_status: string;
  livekit_sync_error?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

// ── Phone Number — Responses ─────────────────────────────────────────────

export interface PhoneNumberResponse {
  phone_number_id: string;
  phone_number: string;
  nickname?: string;
  provider: string;
  inbound_agent_id?: string;
  outbound_agent_id?: string;
  status: string;
  created_at?: string;
}

export interface PhoneNumberDetailResponse {
  phone_number_id: string;
  phone_number: string;
  nickname?: string;
  provider: string;
  inbound_agent_id?: string;
  inbound_agent_name?: string;
  outbound_agent_id?: string;
  outbound_agent_name?: string;
  allowed_inbound_countries: string[];
  allowed_outbound_countries: string[];
  inbound_webhook_url?: string;
  sip_connections: SIPConnectionResponse[];
  dispatch_rules: SIPDispatchRuleResponse[];
  status: string;
  created_at?: string;
  updated_at?: string;
}

// ── Phone Number — Request Params ────────────────────────────────────────

export interface PhoneNumberCreateParams {
  phone_number: string;
  nickname?: string;
  provider?: string;
  inbound_agent_id?: string;
  outbound_agent_id?: string;
  allowed_inbound_countries?: string[];
  allowed_outbound_countries?: string[];
  inbound_webhook_url?: string;
}

export interface PhoneNumberUpdateParams {
  nickname?: string;
  provider?: string;
  inbound_agent_id?: string;
  outbound_agent_id?: string;
  allowed_inbound_countries?: string[];
  allowed_outbound_countries?: string[];
  inbound_webhook_url?: string;
}

export interface PhoneNumberAgentUpdateParams {
  inbound_agent_id?: string;
  outbound_agent_id?: string;
}

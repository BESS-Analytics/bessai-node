/**
 * BESS AI Node.js / TypeScript SDK
 *
 * Usage:
 *   import BessAI from "bessai";
 *   const client = new BessAI({ apiKey: "bess_..." });
 *   const agents = await client.agent.list();
 */
import type { ClientOptions } from "./config.js";
import { resolveConfig } from "./config.js";
import { HTTPClient } from "./client.js";
import { StreamingResource } from "./streaming.js";

// Resources
import { AgentResource } from "./resources/agent.js";
import { CallResource } from "./resources/call.js";
import { PhoneNumberResource } from "./resources/phone-number.js";
import { BatchCallResource } from "./resources/batch-call.js";
import { WorkflowResource } from "./resources/workflow.js";
import { AnalyticsResource } from "./resources/analytics.js";
import { BillingResource } from "./resources/billing.js";
import { ConfigResource } from "./resources/config.js";
import { KnowledgeBasesResource } from "./resources/knowledge-bases.js";
import { APIKeysResource } from "./resources/api-keys.js";

export class BessAI {
  /** Low-level HTTP client exposed for advanced users. */
  readonly httpClient: HTTPClient;

  // ── Resource Accessors ─────────────────────────────────────────────

  readonly agent: AgentResource;
  readonly call: CallResource;
  readonly phoneNumber: PhoneNumberResource;
  readonly batchCall: BatchCallResource;
  readonly workflow: WorkflowResource;
  readonly analytics: AnalyticsResource;
  readonly billing: BillingResource;
  readonly config: ConfigResource;
  readonly knowledgeBases: KnowledgeBasesResource;
  readonly apiKeys: APIKeysResource;
  readonly streaming: StreamingResource;

  // Backward-compatible plural aliases
  readonly agents: AgentResource;
  readonly calls: CallResource;
  readonly phoneNumbers: PhoneNumberResource;
  readonly batchCalls: BatchCallResource;
  readonly workflows: WorkflowResource;

  constructor(options?: ClientOptions) {
    const cfg = resolveConfig(options);
    this.httpClient = new HTTPClient(cfg);

    this.agent = new AgentResource(this.httpClient);
    this.call = new CallResource(this.httpClient);
    this.phoneNumber = new PhoneNumberResource(this.httpClient);
    this.batchCall = new BatchCallResource(this.httpClient);
    this.workflow = new WorkflowResource(this.httpClient);
    this.analytics = new AnalyticsResource(this.httpClient);
    this.billing = new BillingResource(this.httpClient);
    this.config = new ConfigResource(this.httpClient);
    this.knowledgeBases = new KnowledgeBasesResource(this.httpClient);
    this.apiKeys = new APIKeysResource(this.httpClient);
    this.streaming = new StreamingResource(cfg);

    // Plural aliases
    this.agents = this.agent;
    this.calls = this.call;
    this.phoneNumbers = this.phoneNumber;
    this.batchCalls = this.batchCall;
    this.workflows = this.workflow;
  }
}

// ── Re-exports ─────────────────────────────────────────────────────────

export default BessAI;
export { VERSION } from "./version.js";
export type { ClientOptions, ClientConfig } from "./config.js";
export { resolveConfig } from "./config.js";
export {
  BessAIError,
  AuthenticationError,
  PermissionDeniedError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  InternalServerError,
  ConnectionError,
  TimeoutError,
} from "./errors.js";
export { HTTPClient } from "./client.js";
export { BatchCallStream, StreamingResource } from "./streaming.js";
export type { StreamEvent } from "./streaming.js";

// Resource classes
export { AgentResource } from "./resources/agent.js";
export { CallResource } from "./resources/call.js";
export { PhoneNumberResource } from "./resources/phone-number.js";
export { BatchCallResource } from "./resources/batch-call.js";
export { WorkflowResource } from "./resources/workflow.js";
export { AnalyticsResource } from "./resources/analytics.js";
export { BillingResource } from "./resources/billing.js";
export { ConfigResource } from "./resources/config.js";
export { KnowledgeBasesResource } from "./resources/knowledge-bases.js";
export { APIKeysResource } from "./resources/api-keys.js";

// All type definitions
export * from "./types/index.js";

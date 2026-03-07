# BESS AI Node.js / TypeScript SDK

Official Node.js SDK for the [BESS AI Voice Platform](https://bessai.com). Provides typed access to all platform APIs — agents, calls, phone numbers, batch calls, workflows, analytics, billing, configuration, knowledge bases, and API keys.

## Requirements

- **Node.js 18+** (uses native `fetch`)
- TypeScript 5.0+ (optional, for type checking)

## Installation

```bash
npm install bessai
```

## Quick Start

```typescript
import BessAI from "bessai";

const client = new BessAI({ apiKey: "bess_your_api_key" });

// Create an agent
const agent = await client.agent.create({
  agent_name: "Support Bot",
  llm_provider: "openai",
  llm_model: "gpt-4o-mini",
  voice_provider: "elevenlabs",
  voice_id: "rachel",
  system_prompt: "You are a helpful customer support agent.",
  greeting_message: "Hello! How can I help you today?",
});

console.log(agent.agent_id);
```

## Configuration

```typescript
const client = new BessAI({
  apiKey: "bess_...",              // or set BESSAI_API_KEY env var
  baseUrl: "https://api.bessai.com", // or set BESSAI_BASE_URL env var
  timeout: 30_000,                // request timeout in ms (default: 30s)
  maxRetries: 3,                  // retry count for 429/5xx (default: 3)
});
```

### Environment Variables

| Variable         | Description           |
| ---------------- | --------------------- |
| `BESSAI_API_KEY`  | API key for auth      |
| `BESSAI_BASE_URL` | Base URL override     |

## Resources

All resources are accessible as properties on the `BessAI` client:

| Property          | Class                   | Methods |
| ----------------- | ----------------------- | ------- |
| `agent`           | `AgentResource`         | 12      |
| `call`            | `CallResource`          | 7       |
| `phoneNumber`     | `PhoneNumberResource`   | 13      |
| `batchCall`       | `BatchCallResource`     | 10      |
| `workflow`        | `WorkflowResource`      | 24      |
| `analytics`       | `AnalyticsResource`     | 3       |
| `billing`         | `BillingResource`       | 9       |
| `config`          | `ConfigResource`        | 4       |
| `knowledgeBases`  | `KnowledgeBasesResource`| 6       |
| `apiKeys`         | `APIKeysResource`       | 7       |
| `streaming`       | `StreamingResource`     | 1       |

Plural aliases are available: `client.agents`, `client.calls`, `client.phoneNumbers`, `client.batchCalls`, `client.workflows`.

## Examples

### Agents

```typescript
// List agents
const { items } = await client.agent.list();

// Update
await client.agent.update(agent.agent_id, {
  agent_name: "Updated Bot",
  temperature: 0.7,
});

// Publish
await client.agent.publish(agent.agent_id);

// Delete
await client.agent.delete(agent.agent_id);
```

### Calls

```typescript
// Outbound phone call
const call = await client.call.createPhoneCall({
  agent_id: "ag_...",
  from_number: "+15551234567",
  to_number: "+15559876543",
});

// Web call (returns access token for browser)
const webCall = await client.call.createWebCall({
  agent_id: "ag_...",
});

// List calls with filters
const calls = await client.call.list({
  agent_id: "ag_...",
  status: "completed",
  from_date: "2025-01-01",
});

// Get call details
const detail = await client.call.retrieve(call.call_id);
```

### Phone Numbers

```typescript
// Register a number
const pn = await client.phoneNumber.create({
  phone_number: "+15551112222",
  nickname: "Main Line",
  inbound_agent_id: "ag_...",
});

// SIP connection
await client.phoneNumber.createSipConnection(pn.phone_number_id, {
  termination_uri: "sip:trunk.provider.com",
  username: "user",
  password: "pass",
});
```

### Batch Calls

```typescript
const batch = await client.batchCall.create({
  agent_id: "ag_...",
  from_number: "+15551234567",
  contacts: [
    { phone_number: "+15559876543", dynamic_variables: { name: "Alice" } },
    { phone_number: "+15558765432", dynamic_variables: { name: "Bob" } },
  ],
  max_concurrent_calls: 5,
});

await client.batchCall.start(batch.batch_call_id);

// Real-time status via WebSocket
for await (const event of client.streaming.batchCallStatus(batch.batch_call_id)) {
  console.log(event);
}
```

### Workflows

```typescript
// Generate from natural language
const wf = await client.workflow.generate({
  name: "Lead Qualifier",
  description: "After each call, send qualified leads to the CRM via webhook.",
});

// Deploy and execute
await client.workflow.saveSecrets(wf.workflow_id!, {
  secrets: [{ key_name: "CRM_API_KEY", value: "sk_..." }],
});
await client.workflow.deploy(wf.workflow_id!);
const result = await client.workflow.test(wf.workflow_id!);
```

### Analytics & Billing

```typescript
const summary = await client.analytics.getSummary("2025-01-01", "2025-01-31");
console.log(`${summary.total_calls} calls, ${summary.success_rate}% success`);

const balance = await client.billing.getBalance();
console.log(`Balance: $${balance.current_balance}`);
```

### Knowledge Bases

```typescript
const kb = await client.knowledgeBases.create({
  name: "Product Docs",
  description: "Product documentation for agent reference",
});

const fs = await import("fs");
const buf = fs.readFileSync("./docs.pdf");
await client.knowledgeBases.uploadDocument(kb.id, buf, "docs.pdf");
```

### API Keys

```typescript
const key = await client.apiKeys.create({
  name: "Production Key",
  scopes: ["agents:read", "calls:write"],
  expires_in_days: 90,
});
console.log(key.key); // shown only once

// Rotate
const rotated = await client.apiKeys.rotate(key.id);
```

## Error Handling

```typescript
import { AuthenticationError, NotFoundError, RateLimitError } from "bessai";

try {
  await client.agent.retrieve("nonexistent");
} catch (e) {
  if (e instanceof NotFoundError) {
    console.log("Agent not found");
  } else if (e instanceof AuthenticationError) {
    console.log("Invalid API key");
  } else if (e instanceof RateLimitError) {
    console.log(`Rate limited — retry after ${e.retryAfter}s`);
  }
}
```

## CommonJS

```javascript
const { BessAI } = require("bessai");
const client = new BessAI({ apiKey: "bess_..." });
```

## License

MIT

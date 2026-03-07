/**
 * Node.js SDK integration test (mirrors Python sdk_test_runner.py).
 * Usage: BESSAI_API_KEY=bess_sk_... node test_sdk.mjs
 */
import { BessAI } from "./dist/index.js";

const API_KEY = process.env.BESSAI_API_KEY;
if (!API_KEY) {
  console.error("Set BESSAI_API_KEY env var first");
  process.exit(1);
}

const client = new BessAI({
  apiKey: API_KEY,
  baseUrl: "https://api.bess-ai.com",
});

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  PASS - ${name}`);
    passed++;
  } catch (e) {
    console.log(`  FAIL - ${name}: ${e.message}`);
    failed++;
  }
}

console.log("============================================================");
console.log("PHASE 1: READ-ONLY TESTS");
console.log("============================================================\n");

await test("config.getProviders()", async () => {
  const r = await client.config.getProviders();
  if (!r.llm) throw new Error("missing llm key");
});

await test("config.getDefaults()", async () => {
  const r = await client.config.getDefaults();
  if (!r.llm_provider) throw new Error("missing llm_provider");
});

await test("config.getLanguages()", async () => {
  const r = await client.config.getLanguages();
  if (!Array.isArray(r) || r.length === 0) throw new Error("empty languages");
});

await test("agents.list()", async () => {
  const r = await client.agent.list();
  if (!r.items && !Array.isArray(r)) throw new Error("no items");
});

await test("calls.list()", async () => {
  const r = await client.call.list();
  if (!r.items && !Array.isArray(r)) throw new Error("no items");
});

await test("phoneNumbers.list()", async () => {
  const r = await client.phoneNumber.list();
  if (!r.items && !Array.isArray(r)) throw new Error("no items");
});

await test("workflows.list()", async () => {
  const r = await client.workflow.list();
  if (!r.items && !r.workflows && !Array.isArray(r)) throw new Error("no items/workflows");
});

await test("billing.getBalance()", async () => {
  const r = await client.billing.getBalance();
  if (r.current_balance === undefined) throw new Error("missing current_balance");
});

await test("billing.getPricing()", async () => {
  const r = await client.billing.getPricing();
  if (!r.service_pricing && !r.services) throw new Error("missing pricing data");
});

await test("analytics.getSummary()", async () => {
  const r = await client.analytics.getSummary();
  if (r.total_calls === undefined) throw new Error("missing total_calls");
});

await test("apiKeys.list()", async () => {
  const r = await client.apiKeys.list();
  if (!r.items && !Array.isArray(r)) throw new Error("no items");
});

console.log(`\nPhase 1: ${passed} passed, ${failed} failed\n`);

console.log("============================================================");
console.log("PHASE 2: AGENT CRUD");
console.log("============================================================\n");

let agentId;
await test("agents.create()", async () => {
  const r = await client.agent.create({
    agent_name: "SDK_Node_Test_Cleanup",
    system_prompt: "Test agent from Node SDK test. Ignore.",
  });
  agentId = r.agent_id || r.id;
  if (!agentId) throw new Error("no agent_id/id");
});

if (agentId) {
  await test("agents.retrieve()", async () => {
    const r = await client.agent.retrieve(agentId);
    const name = r.agent_name || r.name;
    if (name !== "SDK_Node_Test_Cleanup") throw new Error("wrong name: " + name);
  });

  await test("agents.update()", async () => {
    await client.agent.update(agentId, { agent_name: "SDK_Node_Updated" });
  });

  await test("agents.retrieve() verify update", async () => {
    const r = await client.agent.retrieve(agentId);
    const name = r.agent_name || r.name;
    if (name !== "SDK_Node_Updated") throw new Error("name not updated: " + name);
  });

  await test("agents.delete()", async () => {
    await client.agent.delete(agentId);
  });
}

console.log(`\nRunning total: ${passed} passed, ${failed} failed\n`);

console.log("============================================================");
console.log("PHASE 3: WORKFLOW CRUD");
console.log("============================================================\n");

let workflowId;
await test("workflows.create()", async () => {
  const r = await client.workflow.create({
    name: "SDK_Node_Test_Cleanup",
    trigger_type: "post_call",
    workflow_json: { nodes: [], connections: [] },
  });
  workflowId = r.workflow_id || r.id;
  if (!workflowId) throw new Error("no workflow_id/id");
});

if (workflowId) {
  await test("workflows.retrieve()", async () => {
    const r = await client.workflow.retrieve(workflowId);
    const name = r.name;
    if (name !== "SDK_Node_Test_Cleanup") throw new Error("wrong name: " + name);
  });

  await test("workflows.update()", async () => {
    const r = await client.workflow.update(workflowId, {
      name: "SDK_Node_Updated",
    });
    if (r.status !== "updated") throw new Error("expected status=updated");
  });

  await test("workflows.export()", async () => {
    const r = await client.workflow.export(workflowId);
    if (!r.workflow_json && r.workflow_json !== null)
      throw new Error("missing workflow_json key");
  });

  await test("workflows.delete()", async () => {
    await client.workflow.delete(workflowId);
  });
}

console.log(`\nRunning total: ${passed} passed, ${failed} failed\n`);

console.log("============================================================");
console.log("PHASE 4: CALL TESTS");
console.log("============================================================\n");

// get first call with a recording
const callListResp = await client.call.list();
const callItems = callListResp.items || callListResp;
const callWithRecording = (Array.isArray(callItems) ? callItems : []).find((c) => c.recording_url);

if (callWithRecording) {
  await test("calls.getRecording()", async () => {
    const data = await client.call.getRecording(callWithRecording.call_id);
    if (!(data instanceof ArrayBuffer) || data.byteLength === 0)
      throw new Error("expected non-empty ArrayBuffer");
  });
}

// find a published agent for test call
const agentsResp = await client.agent.list();
const agentItems = agentsResp.items || agentsResp;
const published = (Array.isArray(agentItems) ? agentItems : []).find((a) => a.is_published);
if (published) {
  await test("calls.createTestCall()", async () => {
    const r = await client.call.createTestCall({
      agent_id: published.id || published.agent_id,
    });
    if (!r.call_id && !r.id) throw new Error("no call_id/id");
  });
}

console.log("");
console.log("============================================================");
console.log(`FINAL: ${passed}/${passed + failed} passed, ${failed}/${passed + failed} failed`);
console.log("============================================================");

process.exit(failed > 0 ? 1 : 0);

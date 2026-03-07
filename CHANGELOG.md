# Changelog

All notable changes to the `bessai` Node.js/TypeScript SDK will be documented in this file.

## [0.1.0] — 2025-01-01

### Added

- Initial release
- 10 resource modules: Agent, Call, PhoneNumber, BatchCall, Workflow, Analytics, Billing, Config, KnowledgeBases, APIKeys
- 98 methods mirroring the Python SDK
- Full TypeScript type definitions for all request/response models
- Async-only API using native `fetch` (Node 18+)
- Automatic retry with exponential backoff for 429 and 5xx
- WebSocket streaming for batch call status
- ESM + CJS dual output via tsup
- Environment variable support: `BESSAI_API_KEY`, `BESSAI_BASE_URL`

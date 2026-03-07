/**
 * BESS AI SDK — WebSocket Streaming Helpers.
 *
 * Provides managed WebSocket connections for real-time events
 * like batch call status updates.
 */
import type { ClientConfig } from "./config.js";

export interface StreamEvent {
  [key: string]: unknown;
}

/**
 * Async iterator for real-time batch call status updates via WebSocket.
 *
 * Usage:
 *   for await (const event of client.streaming.batchCallStatus(campaignId)) {
 *     console.log(event);
 *   }
 */
export class BatchCallStream implements AsyncIterable<StreamEvent> {
  private readonly config: ClientConfig;
  private readonly campaignId: string;
  private ws: import("ws").WebSocket | null = null;

  constructor(config: ClientConfig, campaignId: string) {
    this.config = config;
    this.campaignId = campaignId;
  }

  private buildWsUrl(): string {
    let base = this.config.baseUrl;
    if (base.startsWith("https://")) {
      base = "wss://" + base.slice(8);
    } else if (base.startsWith("http://")) {
      base = "ws://" + base.slice(7);
    }
    return `${base}/ws/batch-call/${this.campaignId}?token=${this.config.apiKey}`;
  }

  async connect(): Promise<this> {
    const { default: WebSocket } = await import("ws");
    this.ws = new WebSocket(this.buildWsUrl());
    await new Promise<void>((resolve, reject) => {
      this.ws!.once("open", resolve);
      this.ws!.once("error", reject);
    });
    return this;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<StreamEvent> {
    if (!this.ws) await this.connect();
    const ws = this.ws!;

    const messageQueue: StreamEvent[] = [];
    let resolve: (() => void) | null = null;
    let done = false;

    ws.on("message", (data: Buffer | string) => {
      try {
        messageQueue.push(JSON.parse(data.toString()));
      } catch {
        messageQueue.push({ raw: data.toString() });
      }
      if (resolve) {
        resolve();
        resolve = null;
      }
    });

    ws.on("close", () => {
      done = true;
      if (resolve) {
        resolve();
        resolve = null;
      }
    });

    ws.on("error", () => {
      done = true;
      if (resolve) {
        resolve();
        resolve = null;
      }
    });

    try {
      while (true) {
        if (messageQueue.length > 0) {
          yield messageQueue.shift()!;
          continue;
        }
        if (done) break;
        await new Promise<void>((r) => {
          resolve = r;
        });
      }
    } finally {
      await this.close();
    }
  }

  async close(): Promise<void> {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export class StreamingResource {
  private readonly config: ClientConfig;

  constructor(config: ClientConfig) {
    this.config = config;
  }

  batchCallStatus(campaignId: string): BatchCallStream {
    return new BatchCallStream(this.config, campaignId);
  }
}

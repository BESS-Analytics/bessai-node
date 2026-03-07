/**
 * BESS AI SDK — Knowledge Bases Resource.
 *
 * 6 methods: create, list, get, delete, uploadDocument, deleteDocument
 */
import type { HTTPClient } from "../client.js";
import type {
  KnowledgeBase,
  KnowledgeBaseCreateParams,
} from "../types/index.js";

export class KnowledgeBasesResource {
  constructor(private readonly client: HTTPClient) {}

  /** Create a new knowledge base. */
  async create(params: KnowledgeBaseCreateParams): Promise<KnowledgeBase> {
    return this.client.post<KnowledgeBase>("/v1/knowledge-bases", {
      json: params as unknown as Record<string, unknown>,
    });
  }

  /** List all knowledge bases. */
  async list(): Promise<KnowledgeBase[]> {
    return this.client.get<KnowledgeBase[]>("/v1/knowledge-bases");
  }

  /** Get a knowledge base by ID. */
  async get(knowledgeBaseId: string): Promise<KnowledgeBase> {
    return this.client.get<KnowledgeBase>(
      `/v1/knowledge-bases/${knowledgeBaseId}`
    );
  }

  /** Delete a knowledge base. */
  async delete(knowledgeBaseId: string): Promise<Record<string, unknown>> {
    return this.client.delete(`/v1/knowledge-bases/${knowledgeBaseId}`);
  }

  /** Upload a document to a knowledge base. */
  async uploadDocument(
    knowledgeBaseId: string,
    file: Blob | Buffer,
    filename: string
  ): Promise<Record<string, unknown>> {
    const formData = new FormData();
    const blob =
      file instanceof Blob ? file : new Blob([file], { type: "application/octet-stream" });
    formData.append("file", blob, filename);

    return this.client.post(
      `/v1/knowledge-bases/${knowledgeBaseId}/documents`,
      { formData }
    );
  }

  /** Delete a document from a knowledge base. */
  async deleteDocument(
    knowledgeBaseId: string,
    documentId: string
  ): Promise<Record<string, unknown>> {
    return this.client.delete(
      `/v1/knowledge-bases/${knowledgeBaseId}/documents/${documentId}`
    );
  }
}

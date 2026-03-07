/** Knowledge base types for the BESS AI SDK. */

export interface Document {
  id: string;
  filename?: string;
  file_type?: string;
  file_size_bytes?: number;
  status?: string;
  chunk_count?: number;
  created_at?: string;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  documents?: Document[];
  created_at?: string;
}

export interface KnowledgeBaseCreateParams {
  name: string;
  description?: string;
}

/** Common types shared across all resources. */

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface ErrorResponse {
  detail: string;
  status_code?: number;
}

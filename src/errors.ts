/**
 * BESS AI SDK — Error Hierarchy.
 *
 * All errors extend BessAIError for easy catch-all handling.
 */

export class BessAIError extends Error {
  readonly statusCode?: number;
  readonly body: Record<string, unknown>;

  constructor(
    message: string,
    statusCode?: number,
    body?: Record<string, unknown>
  ) {
    super(message);
    this.name = "BessAIError";
    this.statusCode = statusCode;
    this.body = body ?? {};
  }
}

export class AuthenticationError extends BessAIError {
  constructor(
    message = "Invalid or expired API key",
    body?: Record<string, unknown>
  ) {
    super(message, 401, body);
    this.name = "AuthenticationError";
  }
}

export class PermissionDeniedError extends BessAIError {
  constructor(
    message = "Permission denied",
    body?: Record<string, unknown>
  ) {
    super(message, 403, body);
    this.name = "PermissionDeniedError";
  }
}

export class NotFoundError extends BessAIError {
  constructor(
    message = "Resource not found",
    body?: Record<string, unknown>
  ) {
    super(message, 404, body);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends BessAIError {
  readonly errors: unknown[];

  constructor(
    message = "Validation error",
    errors: unknown[] = [],
    body?: Record<string, unknown>
  ) {
    super(message, 422, body);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export class RateLimitError extends BessAIError {
  readonly retryAfter?: number;

  constructor(
    message = "Rate limit exceeded",
    retryAfter?: number,
    body?: Record<string, unknown>
  ) {
    super(message, 429, body);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

export class InternalServerError extends BessAIError {
  constructor(
    message = "Internal server error",
    body?: Record<string, unknown>
  ) {
    super(message, 500, body);
    this.name = "InternalServerError";
  }
}

export class ConnectionError extends BessAIError {
  constructor(message = "Could not connect to BESS AI") {
    super(message);
    this.name = "ConnectionError";
  }
}

export class TimeoutError extends BessAIError {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "TimeoutError";
  }
}

const STATUS_CODE_MAP: Record<
  number,
  new (message: string, body?: Record<string, unknown>) => BessAIError
> = {
  401: AuthenticationError,
  403: PermissionDeniedError,
  404: NotFoundError,
  429: RateLimitError as unknown as new (
    message: string,
    body?: Record<string, unknown>
  ) => BessAIError,
};

/**
 * Throw the appropriate error for an HTTP error status code.
 */
export function raiseForStatus(
  statusCode: number,
  body?: Record<string, unknown>
): void {
  if (statusCode < 400) return;

  body = body ?? {};
  const detail = body.detail;

  if (Array.isArray(detail)) {
    // FastAPI validation error format
    const message = detail
      .map((e: Record<string, unknown>) => {
        const loc = (e.loc as string[]) ?? ["?"];
        return `${loc[loc.length - 1]}: ${e.msg ?? "?"}`;
      })
      .join("; ");
    throw new ValidationError(message, detail, body);
  }

  const message = detail ? String(detail) : `HTTP ${statusCode}`;

  if (statusCode === 422) {
    throw new ValidationError(message, [], body);
  }

  if (statusCode === 429) {
    throw new RateLimitError(message, undefined, body);
  }

  const ErrorClass = STATUS_CODE_MAP[statusCode];
  if (ErrorClass) {
    throw new ErrorClass(message, body);
  }

  if (statusCode >= 500) {
    throw new InternalServerError(message, body);
  }

  throw new BessAIError(message, statusCode, body);
}

import { Exception } from '@PescaPE/exceptions/Exception';

export class ApiResponse<T = null> {
  readonly timestamp = Date.now();

  public constructor(
    readonly success: boolean,
    readonly body: T | null = null,
    readonly error: Exception | null = null
  ) {}
}

import { RuntimeError } from '@jamashita/anden-error';

export class RedisError extends RuntimeError<'RedisError'> {
  public readonly noun: 'RedisError' = 'RedisError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

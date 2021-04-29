import { DataSourceError } from '@jamashita/catacombe-error';

export class RedisError extends DataSourceError<'RedisError'> {
  public readonly noun: 'RedisError' = 'RedisError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

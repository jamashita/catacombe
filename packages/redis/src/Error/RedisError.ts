import { DataSourceError } from '@jamashita/catacombe-datasource';

export class RedisError extends DataSourceError<'RedisError'> {
  public override readonly noun: 'RedisError' = 'RedisError';

  public constructor(message: string, cause?: Error) {
    super('RedisError', message, cause);
  }
}
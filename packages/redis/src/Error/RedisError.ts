import { DataSourceError } from '@jamashita/anden-error';

export class RedisError extends DataSourceError<'RedisError', 'Redis'> {
  public constructor(message: string, cause?: Error) {
    super('RedisError', 'Redis', message, cause);
  }
}

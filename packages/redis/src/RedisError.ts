import { DataSourceError } from '@jamashita/catacombe-datasource';

export class RedisError extends DataSourceError {
  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

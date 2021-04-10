import { DataSourceError } from '@jamashita/anden-error';

export class HeapError extends DataSourceError<'CacheError', 'Cache'> {
  public constructor(message: string, cause?: Error) {
    super('CacheError', 'Cache', message, cause);
  }
}

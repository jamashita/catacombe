import { DataSourceError } from '@jamashita/catacombe-datasource';

export class HeapError extends DataSourceError<'HeapError'> {
  public readonly noun: 'HeapError' = 'HeapError';

  public constructor(message: string, cause?: Error) {
    super('HeapError', message, cause);
  }
}

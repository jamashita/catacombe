import { DataSourceError } from '@jamashita/catacombe-datasource';

export class HeapError extends DataSourceError<'HeapError'> {
  public override readonly noun: 'HeapError' = 'HeapError';

  public constructor(message: string, cause?: Error) {
    super('HeapError', message, cause);
  }
}

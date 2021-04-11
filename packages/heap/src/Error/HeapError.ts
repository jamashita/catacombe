import { DataSourceError } from '@jamashita/anden-error';

export class HeapError extends DataSourceError<'HeapError', 'Heap'> {
  public constructor(message: string, cause?: Error) {
    super('HeapError', 'Heap', message, cause);
  }
}

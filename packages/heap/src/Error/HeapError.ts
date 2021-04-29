import { DataSourceError } from '@jamashita/catacombe-error';

export class HeapError extends DataSourceError<'HeapError'> {
  public readonly noun: 'HeapError' = 'HeapError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

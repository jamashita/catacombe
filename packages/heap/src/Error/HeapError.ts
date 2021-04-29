import { RuntimeError } from '@jamashita/anden-error';

export class HeapError extends RuntimeError<'HeapError'> {
  public readonly noun: 'HeapError' = 'HeapError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

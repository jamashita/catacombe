import { RuntimeError } from '@jamashita/anden-error';

export class FetchError extends RuntimeError<'FetchError'> {
  public readonly noun: 'FetchError' = 'FetchError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

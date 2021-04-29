import { RuntimeError } from '@jamashita/anden-error';

export class RequestError extends RuntimeError<'RequestError'> {
  public readonly noun: 'RequestError' = 'RequestError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

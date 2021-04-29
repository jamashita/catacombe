import { DataSourceError } from '@jamashita/catacombe-error';

export class RequestError extends DataSourceError<'RequestError'> {
  public readonly noun: 'RequestError' = 'RequestError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

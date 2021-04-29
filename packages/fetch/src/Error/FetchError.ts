import { DataSourceError } from '@jamashita/catacombe-error';

export class FetchError extends DataSourceError<'FetchError'> {
  public readonly noun: 'FetchError' = 'FetchError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

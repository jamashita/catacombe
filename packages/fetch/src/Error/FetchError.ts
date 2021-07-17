import { DataSourceError } from '@jamashita/catacombe-datasource';

export class FetchError extends DataSourceError<'FetchError'> {
  public override readonly noun: 'FetchError' = 'FetchError';

  public constructor(message: string, cause?: Error) {
    super('FetchError', message, cause);
  }
}

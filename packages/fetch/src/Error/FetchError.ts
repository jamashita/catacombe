import { DataSourceError } from '@jamashita/anden-error';

export class FetchError extends DataSourceError<'FetchError', 'Fetch'> {
  public constructor(message: string, cause?: Error) {
    super('FetchError', 'Fetch', message, cause);
  }
}

import { DataSourceError } from '@jamashita/catacombe-datasource';

export class RequestError extends DataSourceError<'RequestError'> {
  public override readonly noun: 'RequestError' = 'RequestError';

  public constructor(message: string, cause?: Error) {
    super('RequestError', message, cause);
  }
}

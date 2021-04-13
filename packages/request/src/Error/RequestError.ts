import { DataSourceError } from '@jamashita/anden-error';

export class RequestError extends DataSourceError<'RequestError', 'Request'> {
  public constructor(message: string, cause?: Error) {
    super('RequestError', 'Request', message, cause);
  }
}

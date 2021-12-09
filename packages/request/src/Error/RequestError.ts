import { DataSourceError } from '@jamashita/catacombe-datasource';

export class RequestError extends DataSourceError {
  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

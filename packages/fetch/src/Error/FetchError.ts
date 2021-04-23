import { DataSourceError } from '@jamashita/anden-error';

export class FetchError extends DataSourceError<'FetchError', 'Fetch'> {
  private status: number;

  public constructor(message: string, status: number, cause?: Error) {
    super('FetchError', 'Fetch', message, cause);
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}

import { DataSourceError } from '@jamashita/catacombe-error';

export class MySQLError extends DataSourceError<'MySQLError'> {
  public readonly noun: 'MySQLError' = 'MySQLError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

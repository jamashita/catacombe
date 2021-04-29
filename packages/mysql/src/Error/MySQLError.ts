import { DataSourceError } from '@jamashita/catacombe-datasource';

export class MySQLError extends DataSourceError<'MySQLError'> {
  public readonly noun: 'MySQLError' = 'MySQLError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

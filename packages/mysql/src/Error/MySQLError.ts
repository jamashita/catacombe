import { DataSourceError } from '@jamashita/catacombe-datasource';

export class MySQLError extends DataSourceError<'MySQLError'> {
  public override readonly noun: 'MySQLError' = 'MySQLError';

  public constructor(message: string, cause?: Error) {
    super('MySQLError', message, cause);
  }
}

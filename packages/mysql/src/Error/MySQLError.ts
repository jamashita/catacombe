import { RuntimeError } from '@jamashita/anden-error';

export class MySQLError extends RuntimeError<'MySQLError'> {
  public readonly noun: 'MySQLError' = 'MySQLError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

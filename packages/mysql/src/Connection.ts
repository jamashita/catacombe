import { Kind, Nullable, ObjectLiteral, Reject, Resolve } from '@jamashita/anden-type';
import { MysqlError, PoolConnection } from 'mysql';
import { IConnection } from './IConnection';
import { MySQLError } from './MySQLError';

export class Connection implements IConnection {
  private readonly connection: PoolConnection;

  public constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  public commit(): Promise<void> {
    return new Promise<void>((resolve: Resolve<void>, reject: Reject) => {
      this.connection.commit((err: MysqlError) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
          reject(new MySQLError(err.message));

          return;
        }

        resolve();
      });
    });
  }

  public execute<R>(sql: string, value?: ObjectLiteral): Promise<R> {
    return new Promise<R>((resolve: Resolve<R>, reject: Reject) => {
      this.connection.query(sql, value, (err: Nullable<MysqlError>, result: R) => {
        if (!Kind.isNull(err)) {
          reject(new MySQLError(err.message));

          return;
        }

        resolve(result);
      });
    });
  }

  public release(): void {
    this.connection.release();
  }

  public rollback(): Promise<void> {
    return new Promise<void>((resolve: Resolve<void>, reject: Reject) => {
      this.connection.rollback((err: MysqlError) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
          reject(new MySQLError(err.message));

          return;
        }

        resolve();
      });
    });
  }
}

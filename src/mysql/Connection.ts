import { Kind, type Nullable, type ObjectLiteral, type Reject, type Resolve } from '@jamashita/anden/type';
import type { MysqlError, PoolConnection } from 'mysql';
import type { IConnection } from './IConnection.js';
import { MySQLError } from './MySQLError.js';

export class Connection implements IConnection {
  private readonly connection: PoolConnection;

  public constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  public commit(): Promise<void> {
    return new Promise((resolve: Resolve<void>, reject: Reject) => {
      this.connection.commit((e: MysqlError) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (e) {
          reject(new MySQLError(e.message));

          return;
        }

        resolve();
      });
    });
  }

  public execute<R>(sql: string, value?: ObjectLiteral): Promise<R> {
    return new Promise((resolve: Resolve<R>, reject: Reject) => {
      this.connection.query(sql, value, (e: Nullable<MysqlError>, result: R) => {
        if (!Kind.isNull(e)) {
          reject(new MySQLError(e.message));

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
    return new Promise((resolve: Resolve<void>, reject: Reject) => {
      this.connection.rollback((e: MysqlError) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (e) {
          reject(new MySQLError(e.message));

          return;
        }

        resolve();
      });
    });
  }
}

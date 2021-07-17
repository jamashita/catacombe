import { Kind, Nullable, ObjectLiteral, Reject, Resolve } from '@jamashita/anden-type';
import mysql from 'mysql';
import { MySQLError } from './Error/MySQLError.js';
import { IConnection } from './Interface/IConnection.js';

export class Connection implements IConnection {
  private readonly connection: mysql.PoolConnection;

  public constructor(connection: mysql.PoolConnection) {
    this.connection = connection;
  }

  public commit(): Promise<void> {
    return new Promise<void>((resolve: Resolve<void>, reject: Reject) => {
      this.connection.commit((err: mysql.MysqlError) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
          reject(new MySQLError('Connection.commit()', err));

          return;
        }

        resolve();
      });
    });
  }

  public execute<R>(sql: string, value?: ObjectLiteral): Promise<R> {
    return new Promise<R>((resolve: Resolve<R>, reject: Reject) => {
      this.connection.query(sql, value, (err: Nullable<mysql.MysqlError>, result: R) => {
        if (!Kind.isNull(err)) {
          reject(new MySQLError('Connection.execute()', err));

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
      this.connection.rollback((err: mysql.MysqlError) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
          reject(new MySQLError('Connection.rollback()', err));

          return;
        }

        resolve();
      });
    });
  }
}

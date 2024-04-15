import { type Inconnu, Kind, type Nullable, type ObjectLiteral, type Reject, type Resolve } from '@jamashita/anden/type';
import { type Connection as Conn, createPool, type MysqlError, type Pool, type PoolConfig, type PoolConnection } from 'mysql';
import { Connection } from './Connection.js';
import type { IMySQL } from './IMySQL.js';
import type { ITransaction } from './ITransaction.js';
import { MySQLError } from './MySQLError.js';

export class MySQL implements IMySQL {
  private readonly pool: Pool;

  public constructor(config: PoolConfig) {
    const pool: Pool = createPool(config);

    pool.on('connection', (connection: Conn) => {
      connection.config.queryFormat = (query: string, value?: Inconnu) => {
        if (Kind.isUndefined(value)) {
          return query;
        }

        return query.replace(/:(\w+)/gu, (_: string, key: string) => {
          if (key in value) {
            return connection.escape(value[key]);
          }

          return 'NULL';
        });
      };
    });

    this.pool = pool;
  }

  public execute<R>(sql: string, value?: ObjectLiteral): Promise<R> {
    return new Promise((resolve: Resolve<R>, reject: Reject) => {
      this.pool.query(sql, value, (e: Nullable<MysqlError>, result: R) => {
        if (!Kind.isNull(e)) {
          reject(new MySQLError(e.message));

          return;
        }

        resolve(result);
      });
    });
  }

  private getConnection(): Promise<Connection> {
    return new Promise((resolve: Resolve<Connection>, reject: Reject) => {
      this.pool.getConnection((err1: MysqlError, connection: PoolConnection) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition
        if (err1) {
          reject(new MySQLError(err1.message));

          return;
        }

        connection.beginTransaction((err2: MysqlError) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition
          if (err2) {
            reject(new MySQLError(err2.message));

            return;
          }

          resolve(new Connection(connection));
        });
      });
    });
  }

  public async transact<R>(transaction: ITransaction<R>): Promise<R> {
    const connection: Connection = await this.getConnection();

    try {
      const ret: R = await transaction.with(connection);

      await connection.commit();
      connection.release();

      return ret;
    } catch (e: unknown) {
      await connection.rollback();
      connection.release();

      throw e;
    }
  }
}

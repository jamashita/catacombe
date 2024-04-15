import type { ISQL } from './ISQL.js';
import type { ITransaction } from './ITransaction.js';

export interface IMySQL extends ISQL {
  transact<R>(transaction: ITransaction<R>): Promise<R>;
}

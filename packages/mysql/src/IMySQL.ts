import { ISQL } from './ISQL.js';
import { ITransaction } from './ITransaction.js';

export interface IMySQL extends ISQL {
  transact<R>(transaction: ITransaction<R>): Promise<R>;
}

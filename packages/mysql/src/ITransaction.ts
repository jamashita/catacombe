import { ISQL } from './ISQL';

export interface ITransaction<R> {
  with(sql: ISQL): Promise<R>;
}

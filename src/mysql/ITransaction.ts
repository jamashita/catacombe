import type { ISQL } from './ISQL.js';

export interface ITransaction<R> {
  with(sql: ISQL): Promise<R>;
}

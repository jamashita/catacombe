import { Noun } from '@jamashita/anden-type';
import { ISQL } from './ISQL';

export interface ITransaction<R, N extends string = string> extends Noun<N> {
  with(sql: ISQL): Promise<R>;
}

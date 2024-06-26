import { UnimplementedError } from '@jamashita/anden/error';
import type { ISQL } from '../ISQL.js';

export class MockSQL implements ISQL {
  public execute<R>(): Promise<R> {
    throw new UnimplementedError();
  }
}

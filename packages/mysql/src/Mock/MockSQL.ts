import { UnimplementedError } from '@jamashita/anden-error';
import { ISQL } from '../Interface/ISQL.js';

export class MockSQL implements ISQL {
  public execute<R>(): Promise<R> {
    throw new UnimplementedError();
  }
}

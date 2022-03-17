import { UnimplementedError } from '@jamashita/anden-error';
import { ISQL } from '../ISQL';

export class MockSQL implements ISQL {
  public execute<R>(): Promise<R> {
    throw new UnimplementedError();
  }
}

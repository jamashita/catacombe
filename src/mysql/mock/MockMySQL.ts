import { UnimplementedError } from '@jamashita/anden';
import { IMySQL } from '../IMySQL.js';

export class MockMySQL implements IMySQL {
  public execute<R>(): Promise<R> {
    throw new UnimplementedError();
  }

  public transact<R>(): Promise<R> {
    throw new UnimplementedError();
  }
}

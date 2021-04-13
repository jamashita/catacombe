import { UnimplementedError } from '@jamashita/anden-error';
import { IMySQL } from '../Interface/IMySQL';

export class MockMySQL implements IMySQL {
  public transact<R>(): Promise<R> {
    throw new UnimplementedError();
  }

  public execute<R>(): Promise<R> {
    throw new UnimplementedError();
  }
}

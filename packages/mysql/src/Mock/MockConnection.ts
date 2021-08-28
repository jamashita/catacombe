import { UnimplementedError } from '@jamashita/anden-error';
import { IConnection } from '../IConnection';

export class MockConnection implements IConnection {
  public commit(): Promise<void> {
    throw new UnimplementedError();
  }

  public execute<R>(): Promise<R> {
    throw new UnimplementedError();
  }

  public release(): void {
    throw new UnimplementedError();
  }

  public rollback(): Promise<void> {
    throw new UnimplementedError();
  }
}

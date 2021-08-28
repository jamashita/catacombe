import { UnimplementedError } from '@jamashita/anden-error';
import { Nullable } from '@jamashita/anden-type';
import { IRedisSet } from '../IRedisSet';

export class MockRedisSet implements IRedisSet {
  public add(): Promise<number> {
    throw new UnimplementedError();
  }

  public dump(): Promise<Array<string>> {
    throw new UnimplementedError();
  }

  public has(): Promise<boolean> {
    throw new UnimplementedError();
  }

  public length(): Promise<number> {
    throw new UnimplementedError();
  }

  public pop(): Promise<Nullable<string>> {
    throw new UnimplementedError();
  }

  public random(): Promise<Nullable<string>> {
    throw new UnimplementedError();
  }

  public remove(): Promise<number> {
    throw new UnimplementedError();
  }
}

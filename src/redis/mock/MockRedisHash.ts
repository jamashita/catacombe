import { UnimplementedError } from '@jamashita/anden/error';
import type { Nullable } from '@jamashita/anden/type';
import type { IRedisHash } from '../IRedisHash.js';

export class MockRedisHash implements IRedisHash {
  public delete(): Promise<number> {
    throw new UnimplementedError();
  }

  public get(): Promise<Nullable<string>> {
    throw new UnimplementedError();
  }

  public has(): Promise<boolean> {
    throw new UnimplementedError();
  }

  public length(): Promise<number> {
    throw new UnimplementedError();
  }

  public set(): Promise<boolean> {
    throw new UnimplementedError();
  }
}

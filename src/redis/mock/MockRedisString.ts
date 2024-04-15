import { UnimplementedError } from '@jamashita/anden/error';
import type { Nullable } from '@jamashita/anden/type';
import type { IRedisString } from '../IRedisString.js';

export class MockRedisString implements IRedisString {
  public get(): Promise<Nullable<string>> {
    throw new UnimplementedError();
  }

  public set(): Promise<boolean> {
    throw new UnimplementedError();
  }
}

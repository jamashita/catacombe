import { UnimplementedError } from '@jamashita/anden/error';
import type { IRedis } from '../IRedis.js';
import type { IRedisHash } from '../IRedisHash.js';
import type { IRedisList } from '../IRedisList.js';
import type { IRedisSet } from '../IRedisSet.js';
import type { IRedisString } from '../IRedisString.js';
import { MockRedisHash } from './MockRedisHash.js';
import { MockRedisList } from './MockRedisList.js';
import { MockRedisSet } from './MockRedisSet.js';
import { MockRedisString } from './MockRedisString.js';

type MockRedisSetting = Partial<
  Readonly<{
    hash: IRedisHash;
    set: IRedisSet;
    list: IRedisList;
    string: IRedisString;
  }>
>;

export class MockRedis implements IRedis {
  private readonly hash: IRedisHash;
  private readonly set: IRedisSet;
  private readonly list: IRedisList;
  private readonly string: IRedisString;

  public constructor({
    hash = new MockRedisHash(),
    set = new MockRedisSet(),
    list = new MockRedisList(),
    string = new MockRedisString()
  }: MockRedisSetting = {}) {
    this.hash = hash;
    this.set = set;
    this.list = list;
    this.string = string;
  }

  public delete(): Promise<boolean> {
    throw new UnimplementedError();
  }

  public exists(): Promise<boolean> {
    throw new UnimplementedError();
  }

  public expires(): Promise<boolean> {
    throw new UnimplementedError();
  }

  public getHash(): IRedisHash {
    return this.hash;
  }

  public getList(): IRedisList {
    return this.list;
  }

  public getSet(): IRedisSet {
    return this.set;
  }

  public getString(): IRedisString {
    return this.string;
  }

  public on(): void {
    // NOOP
  }

  public publish(): Promise<number> {
    throw new UnimplementedError();
  }

  public subscribe(): Promise<void> {
    throw new UnimplementedError();
  }

  public unsubscribe(): Promise<void> {
    throw new UnimplementedError();
  }
}

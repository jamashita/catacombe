import { UnimplementedError } from '@jamashita/anden-error';
import IORedis from 'ioredis';
import { IRedis } from '../IRedis.js';
import { IRedisHash } from '../IRedisHash.js';
import { IRedisList } from '../IRedisList.js';
import { IRedisSet } from '../IRedisSet.js';
import { IRedisString } from '../IRedisString.js';
import { MockRedisHash } from './MockRedisHash.js';
import { MockRedisList } from './MockRedisList.js';
import { MockRedisSet } from './MockRedisSet.js';
import { MockRedisString } from './MockRedisString.js';

type MockRedisSetting = Partial<Readonly<{
  hash: IRedisHash;
  set: IRedisSet;
  list: IRedisList;
  string: IRedisString;
}>>;

export class MockRedis implements IRedis {
  private readonly client: IORedis.Redis;
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
    this.client = new IORedis({});
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

  public getClient(): IORedis.Redis {
    return this.client;
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

  public subscribe(): Promise<number> {
    throw new UnimplementedError();
  }

  public unsubscribe(): Promise<number> {
    throw new UnimplementedError();
  }
}

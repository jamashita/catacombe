import { UnimplementedError } from '@jamashita/anden-error';
import Redis from 'ioredis';
import { IRedis } from '../IRedis';
import { IRedisHash } from '../IRedisHash';
import { IRedisList } from '../IRedisList';
import { IRedisSet } from '../IRedisSet';
import { IRedisString } from '../IRedisString';
import { MockRedisHash } from './MockRedisHash';
import { MockRedisList } from './MockRedisList';
import { MockRedisSet } from './MockRedisSet';
import { MockRedisString } from './MockRedisString';

type MockRedisSetting = Partial<Readonly<{
  hash: IRedisHash;
  set: IRedisSet;
  list: IRedisList;
  string: IRedisString;
}>>;

export class MockRedis implements IRedis {
  private readonly client: Redis;
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
    this.client = new Redis({});
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

  public getClient(): Redis {
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

  public subscribe(): Promise<unknown> {
    throw new UnimplementedError();
  }

  public unsubscribe(): Promise<unknown> {
    throw new UnimplementedError();
  }
}

import { BinaryFunction } from '@jamashita/anden-type';
import Redis from 'ioredis';
import { IRedisHash } from './IRedisHash';
import { IRedisList } from './IRedisList';
import { IRedisSet } from './IRedisSet';
import { IRedisString } from './IRedisString';

export interface IRedis {
  delete(...keys: ReadonlyArray<string>): Promise<boolean>;

  exists(...keys: ReadonlyArray<string>): Promise<boolean>;

  expires(key: string, seconds: number): Promise<boolean>;

  getClient(): Redis;

  getHash(): IRedisHash;

  getList(): IRedisList;

  getSet(): IRedisSet;

  getString(): IRedisString;

  on(callback: BinaryFunction<string, string, void>): void;

  publish(channel: string, message: string): Promise<number>;

  subscribe(...channels: ReadonlyArray<string>): Promise<unknown>;

  unsubscribe(...channels: ReadonlyArray<string>): Promise<unknown>;
}

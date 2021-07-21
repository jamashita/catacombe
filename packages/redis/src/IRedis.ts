import { BinaryFunction } from '@jamashita/anden-type';
import IORedis from 'ioredis';
import { IRedisHash } from './IRedisHash.js';
import { IRedisList } from './IRedisList.js';
import { IRedisSet } from './IRedisSet.js';
import { IRedisString } from './IRedisString.js';

export interface IRedis {
  delete(...keys: ReadonlyArray<string>): Promise<boolean>;

  exists(...keys: ReadonlyArray<string>): Promise<boolean>;

  expires(key: string, seconds: number): Promise<boolean>;

  getClient(): IORedis.Redis;

  getHash(): IRedisHash;

  getList(): IRedisList;

  getSet(): IRedisSet;

  getString(): IRedisString;

  on(callback: BinaryFunction<string, string, void>): void;

  publish(channel: string, message: string): Promise<number>;

  subscribe(...channels: ReadonlyArray<string>): Promise<number>;

  unsubscribe(...channels: ReadonlyArray<string>): Promise<number>;
}

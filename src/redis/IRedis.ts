import type { BinaryConsumer } from '@jamashita/anden/type';
import type { IRedisHash } from './IRedisHash.js';
import type { IRedisList } from './IRedisList.js';
import type { IRedisSet } from './IRedisSet.js';
import type { IRedisString } from './IRedisString.js';

export interface IRedis {
  delete(...keys: ReadonlyArray<string>): Promise<boolean>;

  exists(...keys: ReadonlyArray<string>): Promise<boolean>;

  expires(key: string, seconds: number): Promise<boolean>;

  getHash(): IRedisHash;

  getList(): IRedisList;

  getSet(): IRedisSet;

  getString(): IRedisString;

  on(callback: BinaryConsumer<string, string>): void;

  publish(channel: string, message: string): Promise<number>;

  subscribe(channel: string, callback: BinaryConsumer<string, string>): Promise<void>;

  unsubscribe(...channels: ReadonlyArray<string>): Promise<void>;
}

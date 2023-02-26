import { BinaryConsumer } from '@jamashita/anden/type';
import {
  createClient,
  RedisClientOptions,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts
} from 'redis';
import { IRedis } from './IRedis.js';
import { RedisError } from './RedisError.js';
import { RedisHash } from './RedisHash.js';
import { RedisList } from './RedisList.js';
import { RedisSet } from './RedisSet.js';
import { RedisString } from './RedisString.js';

export type RedisConfig = RedisClientOptions;

export class Redis implements IRedis {
  private readonly client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;
  private readonly hash: RedisHash;
  private readonly set: RedisSet;
  private readonly list: RedisList;
  private readonly string: RedisString;

  public constructor(config: RedisConfig) {
    this.client = createClient(config);
    this.hash = new RedisHash(this.client);
    this.set = new RedisSet(this.client);
    this.list = new RedisList(this.client);
    this.string = new RedisString(this.client);
  }

  public async delete(...keys: ReadonlyArray<string>): Promise<boolean> {
    try {
      const result: number = await this.client.del([...keys]);

      return result !== 0;
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON DELETE', e);
      }

      throw e;
    }
  }

  public async exists(...keys: ReadonlyArray<string>): Promise<boolean> {
    try {
      const result: number = await this.client.exists([...keys]);

      return result !== 0;
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON EXISTS', e);
      }

      throw e;
    }
  }

  public async expires(key: string, seconds: number): Promise<boolean> {
    try {
      return await this.client.expire(key, seconds);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON EXPIRES', e);
      }

      throw e;
    }
  }

  public getHash(): RedisHash {
    return this.hash;
  }

  public getList(): RedisList {
    return this.list;
  }

  public getSet(): RedisSet {
    return this.set;
  }

  public getString(): RedisString {
    return this.string;
  }

  public on(callback: BinaryConsumer<string, string>): void {
    try {
      this.client.on('message', callback);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON ON', e);
      }

      throw e;
    }
  }

  public async publish(channel: string, message: string): Promise<number> {
    try {
      return await this.client.publish(channel, message);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON PUBLISH', e);
      }

      throw e;
    }
  }

  public async subscribe(channel: string, callback: BinaryConsumer<string, string>): Promise<void> {
    try {
      await this.client.subscribe(channel, callback);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SUBSCRIBE', e);
      }

      throw e;
    }
  }

  public async unsubscribe(...channels: ReadonlyArray<string>): Promise<void> {
    try {
      await this.client.unsubscribe(...channels);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON UNSUBSCRIBE', e);
      }

      throw e;
    }
  }
}

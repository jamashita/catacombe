import { BinaryConsumer } from '@jamashita/anden';
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
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON DELETE', err);
      }

      throw err;
    }
  }

  public async exists(...keys: ReadonlyArray<string>): Promise<boolean> {
    try {
      const result: number = await this.client.exists([...keys]);

      return result !== 0;
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON EXISTS', err);
      }

      throw err;
    }
  }

  public async expires(key: string, seconds: number): Promise<boolean> {
    try {
      return await this.client.expire(key, seconds);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON EXPIRES', err);
      }

      throw err;
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
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON ON', err);
      }

      throw err;
    }
  }

  public async publish(channel: string, message: string): Promise<number> {
    try {
      return await this.client.publish(channel, message);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON PUBLISH', err);
      }

      throw err;
    }
  }

  public async subscribe(channel: string, callback: BinaryConsumer<string, string>): Promise<void> {
    try {
      await this.client.subscribe(channel, callback);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SUBSCRIBE', err);
      }

      throw err;
    }
  }

  public async unsubscribe(...channels: ReadonlyArray<string>): Promise<void> {
    try {
      await this.client.unsubscribe(...channels);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON UNSUBSCRIBE', err);
      }

      throw err;
    }
  }
}

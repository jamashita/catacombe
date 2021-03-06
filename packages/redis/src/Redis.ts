import R, { RedisOptions } from 'ioredis';
import { IRedis } from './IRedis';
import { RedisError } from './RedisError';
import { RedisHash } from './RedisHash';
import { RedisList } from './RedisList';
import { RedisSet } from './RedisSet';
import { RedisString } from './RedisString';

export type RedisConfig = RedisOptions;

export class Redis implements IRedis {
  private readonly client: R;
  private readonly hash: RedisHash;
  private readonly set: RedisSet;
  private readonly list: RedisList;
  private readonly string: RedisString;

  public constructor(config: RedisConfig) {
    const client: R = new R(config);

    this.client = client;
    this.hash = new RedisHash(client);
    this.set = new RedisSet(client);
    this.list = new RedisList(client);
    this.string = new RedisString(client);
  }

  public async delete(...keys: ReadonlyArray<string>): Promise<boolean> {
    try {
      const result: number = await this.client.del(...keys);

      if (result === 0) {
        return false;
      }

      return true;
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
      const result: number = await this.client.exists(...keys);

      if (result === 0) {
        return false;
      }

      return true;
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
      const result: number = await this.client.expire(key, seconds);

      if (result === 0) {
        return false;
      }

      return true;
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON EXPIRES', err);
      }

      throw err;
    }
  }

  public getClient(): R {
    return this.client;
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

  public on(callback: (channel: string, message: string) => void): void {
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

  public async subscribe(...channels: ReadonlyArray<string>): Promise<unknown> {
    try {
      return await this.client.subscribe(...channels);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SUBSCRIBE', err);
      }

      throw err;
    }
  }

  public async unsubscribe(...channels: ReadonlyArray<string>): Promise<unknown> {
    try {
      return await this.client.unsubscribe(...channels);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON UNSUBSCRIBE', err);
      }

      throw err;
    }
  }
}

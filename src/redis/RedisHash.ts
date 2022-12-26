import { Ambiguous, Kind, Nullable } from '@jamashita/anden/type';
import { RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import { IRedisHash } from './IRedisHash.js';
import { RedisError } from './RedisError.js';

export class RedisHash implements IRedisHash {
  private readonly client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

  public constructor(client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>) {
    this.client = client;
  }

  public async delete(key: string, field: string): Promise<number> {
    try {
      return await this.client.hDel(key, field);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON HDEL', err);
      }

      throw err;
    }
  }

  public async get(key: string, field: string): Promise<Nullable<string>> {
    try {
      const str: Ambiguous<string> = await this.client.hGet(key, field);

      if (Kind.isUndefined(str)) {
        return null;
      }

      return str;
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON HGET', err);
      }

      throw err;
    }
  }

  public async has(key: string, field: string): Promise<boolean> {
    try {
      return await this.client.hExists(key, field);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON HEXISTS', err);
      }

      throw err;
    }
  }

  public async length(key: string): Promise<number> {
    try {
      return await this.client.hLen(key);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON HLEN', err);
      }

      throw err;
    }
  }

  public async set(key: string, field: string, value: string): Promise<boolean> {
    try {
      const num: number = await this.client.hSet(key, field, value);

      if (num > 0) {
        return true;
      }

      return false;
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON HSET', err);
      }

      throw err;
    }
  }
}

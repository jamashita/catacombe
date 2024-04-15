import { Kind, type Nullable, type Undefinable } from '@jamashita/anden/type';
import type { RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import type { IRedisHash } from './IRedisHash.js';
import { RedisError } from './RedisError.js';

export class RedisHash implements IRedisHash {
  private readonly client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

  public constructor(client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>) {
    this.client = client;
  }

  public async delete(key: string, field: string): Promise<number> {
    try {
      return await this.client.hDel(key, field);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON HDEL', e);
      }

      throw e;
    }
  }

  public async get(key: string, field: string): Promise<Nullable<string>> {
    try {
      const str: Undefinable<string> = await this.client.hGet(key, field);

      if (Kind.isUndefined(str)) {
        return null;
      }

      return str;
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON HGET', e);
      }

      throw e;
    }
  }

  public async has(key: string, field: string): Promise<boolean> {
    try {
      return await this.client.hExists(key, field);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON HEXISTS', e);
      }

      throw e;
    }
  }

  public async length(key: string): Promise<number> {
    try {
      return await this.client.hLen(key);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON HLEN', e);
      }

      throw e;
    }
  }

  public async set(key: string, field: string, value: string): Promise<boolean> {
    try {
      const num: number = await this.client.hSet(key, field, value);

      return num > 0;
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON HSET', e);
      }

      throw e;
    }
  }
}

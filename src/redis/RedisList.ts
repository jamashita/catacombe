import type { Nullable } from '@jamashita/anden/type';
import type { RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import type { IRedisList } from './IRedisList.js';
import { RedisError } from './RedisError.js';

export class RedisList implements IRedisList {
  private readonly client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

  public constructor(client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>) {
    this.client = client;
  }

  public async dump(key: string): Promise<Array<string>> {
    try {
      return await this.client.lRange(key, 0, -1);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON LRANGE', e);
      }

      throw e;
    }
  }

  public async length(key: string): Promise<number> {
    try {
      return await this.client.lLen(key);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON LLEN', e);
      }

      throw e;
    }
  }

  public async pop(key: string): Promise<Nullable<string>> {
    try {
      return await this.client.rPop(key);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON RPOP', e);
      }

      throw e;
    }
  }

  public async push(key: string, value: string): Promise<number> {
    try {
      return await this.client.rPush(key, value);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON RPUSH', e);
      }

      throw e;
    }
  }

  public async remove(key: string, value: string): Promise<number> {
    try {
      return await this.client.lRem(key, 0, value);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON LREM', e);
      }

      throw e;
    }
  }

  public async select(key: string, offset: number, limit: number): Promise<Array<string>> {
    const start: number = offset;
    const stop: number = offset + limit;

    try {
      return await this.client.lRange(key, start, stop);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON LRANGE', e);
      }

      throw e;
    }
  }

  public async shift(key: string): Promise<Nullable<string>> {
    try {
      return await this.client.lPop(key);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON LPOP', e);
      }

      throw e;
    }
  }
}

import { Nullable } from '@jamashita/anden-type';
import Redis from 'ioredis';
import { IRedisHash } from './IRedisHash';
import { RedisError } from './RedisError';

export class RedisHash implements IRedisHash {
  private readonly client: Redis;

  public constructor(client: Redis) {
    this.client = client;
  }

  public async delete(key: string, field: string): Promise<number> {
    try {
      return await this.client.hdel(key, field);
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
      return await this.client.hget(key, field);
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
      const result: number = await this.client.hexists(key, field);

      if (result === 0) {
        return false;
      }

      return true;
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
      return await this.client.hlen(key);
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
      await this.client.hset(key, field, value);

      return true;
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON HSET', err);
      }

      throw err;
    }
  }
}

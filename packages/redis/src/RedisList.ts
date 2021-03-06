import { Nullable } from '@jamashita/anden-type';
import Redis from 'ioredis';
import { IRedisList } from './IRedisList';
import { RedisError } from './RedisError';

export class RedisList implements IRedisList {
  private readonly client: Redis;

  public constructor(client: Redis) {
    this.client = client;
  }

  public async dump(key: string): Promise<Array<string>> {
    try {
      return await this.client.lrange(key, 0, -1);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON LRANGE', err);
      }

      throw err;
    }
  }

  public async length(key: string): Promise<number> {
    try {
      return await this.client.llen(key);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON LLEN', err);
      }

      throw err;
    }
  }

  public async pop(key: string): Promise<Nullable<string>> {
    try {
      return await this.client.rpop(key);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON RPOP', err);
      }

      throw err;
    }
  }

  public async push(key: string, value: string): Promise<number> {
    try {
      return await this.client.rpush(key, value);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON RPUSH', err);
      }

      throw err;
    }
  }

  public async remove(key: string, value: string): Promise<number> {
    try {
      return await this.client.lrem(key, 0, value);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON LREM', err);
      }

      throw err;
    }
  }

  public async select(key: string, offset: number, limit: number): Promise<Array<string>> {
    const start: number = offset;
    const stop: number = offset + limit;

    try {
      return await this.client.lrange(key, start, stop);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON LRANGE', err);
      }

      throw err;
    }
  }

  public async shift(key: string): Promise<Nullable<string>> {
    try {
      return await this.client.lpop(key);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON LPOP', err);
      }

      throw err;
    }
  }
}

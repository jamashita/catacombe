import { Nullable } from '@jamashita/anden-type';
import Redis from 'ioredis';
import { IRedisSet } from './IRedisSet';
import { RedisError } from './RedisError';

export class RedisSet implements IRedisSet {
  private readonly client: Redis;

  public constructor(client: Redis) {
    this.client = client;
  }

  public async add(key: string, ...values: ReadonlyArray<string>): Promise<number> {
    try {
      return await this.client.sadd(key, ...values);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SADD', err);
      }

      throw err;
    }
  }

  public async dump(key: string): Promise<Array<string>> {
    try {
      return await this.client.smembers(key);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SMEMBERS', err);
      }

      throw err;
    }
  }

  public async has(key: string, value: string): Promise<boolean> {
    try {
      const result: number = await this.client.sismember(key, value);

      if (result === 0) {
        return false;
      }

      return true;
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SISMEMBER', err);
      }

      throw err;
    }
  }

  public async length(key: string): Promise<number> {
    try {
      return await this.client.scard(key);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SCARD', err);
      }

      throw err;
    }
  }

  public async pop(key: string): Promise<Nullable<string>> {
    try {
      return await this.client.spop(key);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SPOP', err);
      }

      throw err;
    }
  }

  public async random(key: string): Promise<Array<unknown> | Nullable<string>> {
    try {
      return await this.client.srandmember(key);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SRANDMEMBER', err);
      }

      throw err;
    }
  }

  public async remove(key: string, ...values: ReadonlyArray<string>): Promise<number> {
    try {
      return await this.client.srem(key, ...values);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SREM', err);
      }

      throw err;
    }
  }
}

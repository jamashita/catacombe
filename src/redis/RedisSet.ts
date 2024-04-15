import type { Nullable } from '@jamashita/anden/type';
import type { RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import type { IRedisSet } from './IRedisSet.js';
import { RedisError } from './RedisError.js';

export class RedisSet implements IRedisSet {
  private readonly client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

  public constructor(client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>) {
    this.client = client;
  }

  public async add(key: string, ...values: ReadonlyArray<string>): Promise<number> {
    try {
      return await this.client.sAdd(key, [...values]);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SADD', e);
      }

      throw e;
    }
  }

  public async dump(key: string): Promise<Array<string>> {
    try {
      return await this.client.sMembers(key);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SMEMBERS', e);
      }

      throw e;
    }
  }

  public async has(key: string, value: string): Promise<boolean> {
    try {
      return await this.client.sIsMember(key, value);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SISMEMBER', e);
      }

      throw e;
    }
  }

  public async length(key: string): Promise<number> {
    try {
      return await this.client.sCard(key);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SCARD', e);
      }

      throw e;
    }
  }

  public async pop(key: string): Promise<Nullable<string>> {
    try {
      const pop: Array<string> = await this.client.sPop(key);

      if (pop.length === 0) {
        return null;
      }

      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return pop[0]!;
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SPOP', e);
      }

      throw e;
    }
  }

  public async random(key: string): Promise<Array<unknown> | Nullable<string>> {
    try {
      return await this.client.sRandMember(key);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SRANDMEMBER', e);
      }

      throw e;
    }
  }

  public async remove(key: string, ...values: ReadonlyArray<string>): Promise<number> {
    try {
      return await this.client.sRem(key, [...values]);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SREM', e);
      }

      throw e;
    }
  }
}

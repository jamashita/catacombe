import { Nullable } from '@jamashita/anden/type';
import { RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import { IRedisSet } from './IRedisSet.js';
import { RedisError } from './RedisError.js';

export class RedisSet implements IRedisSet {
  private readonly client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

  public constructor(client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>) {
    this.client = client;
  }

  public async add(key: string, ...values: ReadonlyArray<string>): Promise<number> {
    try {
      return await this.client.sAdd(key, [...values]);
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
      return await this.client.sMembers(key);
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
      return await this.client.sIsMember(key, value);
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
      return await this.client.sCard(key);
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
      const pop: Array<string> = await this.client.sPop(key);

      if (pop.length === 0) {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return pop[0]!;
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
      return await this.client.sRandMember(key);
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
      return await this.client.sRem(key, [...values]);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SREM', err);
      }

      throw err;
    }
  }
}

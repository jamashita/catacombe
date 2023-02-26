import { Kind, Nullable } from '@jamashita/anden/type';
import { RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import { IRedisString } from './IRedisString.js';
import { RedisError } from './RedisError.js';

export class RedisString implements IRedisString {
  private readonly client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

  public constructor(client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>) {
    this.client = client;
  }

  public async get(key: string): Promise<Nullable<string>> {
    try {
      return await this.client.get(key);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON GET', e);
      }

      throw e;
    }
  }

  public async set(key: string, value: string): Promise<boolean> {
    try {
      const result: Nullable<string> = await this.client.set(key, value);

      return !Kind.isNull(result);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new RedisError('FAIL ON SET', e);
      }

      throw e;
    }
  }
}

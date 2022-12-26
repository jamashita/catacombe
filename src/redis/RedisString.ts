import { Kind, Nullable } from '@jamashita/anden';
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
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON GET', err);
      }

      throw err;
    }
  }

  public async set(key: string, value: string): Promise<boolean> {
    try {
      const result: Nullable<string> = await this.client.set(key, value);

      return !Kind.isNull(result);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SET', err);
      }

      throw err;
    }
  }
}

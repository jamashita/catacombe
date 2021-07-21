import { Nullable } from '@jamashita/anden-type';
import IORedis from 'ioredis';
import { RedisError } from './Error/RedisError.js';
import { IRedisString } from './IRedisString.js';

export class RedisString implements IRedisString {
  private readonly client: IORedis.Redis;

  public constructor(client: IORedis.Redis) {
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
      const result: Nullable<'OK'> = await this.client.set(key, value);

      if (result === 'OK') {
        return true;
      }

      return false;
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new RedisError('FAIL ON SET', err);
      }

      throw err;
    }
  }
}

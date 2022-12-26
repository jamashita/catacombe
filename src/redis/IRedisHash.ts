import { Nullable } from '@jamashita/anden/type';

export interface IRedisHash {
  delete(key: string, field: string): Promise<number>;

  get(key: string, field: string): Promise<Nullable<string>>;

  has(key: string, field: string): Promise<boolean>;

  length(key: string): Promise<number>;

  set(key: string, field: string, value: string): Promise<boolean>;
}

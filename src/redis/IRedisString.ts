import { Nullable } from '@jamashita/anden/type';

export interface IRedisString {
  get(key: string): Promise<Nullable<string>>;

  set(key: string, value: string): Promise<boolean>;
}

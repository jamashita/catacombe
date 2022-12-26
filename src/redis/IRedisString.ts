import { Nullable } from '@jamashita/anden';

export interface IRedisString {
  get(key: string): Promise<Nullable<string>>;

  set(key: string, value: string): Promise<boolean>;
}

import { Nullable } from '@jamashita/anden';

export interface IRedisSet {
  add(key: string, ...values: ReadonlyArray<string>): Promise<number>;

  dump(key: string): Promise<Array<string>>;

  has(key: string, value: string): Promise<boolean>;

  length(key: string): Promise<number>;

  pop(key: string): Promise<Nullable<string>>;

  random(key: string): Promise<Array<unknown> | Nullable<string>>;

  remove(key: string, ...values: ReadonlyArray<string>): Promise<number>;
}

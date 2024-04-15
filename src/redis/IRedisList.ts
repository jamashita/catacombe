import type { Nullable } from '@jamashita/anden/type';

export interface IRedisList {
  dump(key: string): Promise<Array<string>>;

  length(key: string): Promise<number>;

  pop(key: string): Promise<Nullable<string>>;

  push(key: string, value: string): Promise<number>;

  remove(key: string, value: string): Promise<number>;

  select(key: string, offset: number, limit: number): Promise<Array<string>>;

  shift(key: string): Promise<Nullable<string>>;
}

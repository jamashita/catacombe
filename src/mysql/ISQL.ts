import { ObjectLiteral } from '@jamashita/anden/type';

export interface ISQL {
  execute<R>(sql: string, value?: ObjectLiteral): Promise<R>;
}

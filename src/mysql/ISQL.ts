import { ObjectLiteral } from '@jamashita/anden';

export interface ISQL {
  execute<R>(sql: string, value?: ObjectLiteral): Promise<R>;
}

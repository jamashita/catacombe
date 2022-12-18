import { ISQL } from './ISQL';

export interface IConnection extends ISQL {
  commit(): Promise<void>;

  release(): void;

  rollback(): Promise<void>;
}

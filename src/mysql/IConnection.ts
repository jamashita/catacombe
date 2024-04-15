import type { ISQL } from './ISQL.js';

export interface IConnection extends ISQL {
  commit(): Promise<void>;

  release(): void;

  rollback(): Promise<void>;
}

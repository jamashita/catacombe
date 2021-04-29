import { RuntimeError } from '@jamashita/anden-error';

export abstract class DataSourceError<N extends string = string> extends RuntimeError<N> {
  public abstract readonly noun: N;

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

import { RuntimeError } from '@jamashita/anden-error';

export class DataSourceError<N extends string = string> extends RuntimeError<N> {
  public readonly noun: N;

  public constructor(noun: N, message: string, cause?: Error) {
    super(message, cause);
    this.noun = noun;
  }
}

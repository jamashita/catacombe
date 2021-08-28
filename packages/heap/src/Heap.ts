import { Ambiguous, Kind } from '@jamashita/anden-type';
import { HeapError } from './Error/HeapError';
import { IHeap } from './IHeap';

const LIFETIME_MAX: number = Infinity;

export class Heap implements IHeap {
  private readonly values: Map<symbol, unknown>;
  private readonly timeouts: Map<symbol, NodeJS.Timeout>;
  private readonly lifetime: number;

  public constructor(seconds: number = LIFETIME_MAX) {
    this.values = new Map<symbol, unknown>();
    this.timeouts = new Map<symbol, NodeJS.Timeout>();

    if (seconds <= 0) {
      this.lifetime = LIFETIME_MAX;

      return;
    }

    this.lifetime = seconds * 1000;
  }

  public get<H>(identifier: symbol): H {
    const instance: Ambiguous<unknown> = this.values.get(identifier);

    if (Kind.isUndefined(instance)) {
      throw new HeapError(`NO SUCH IDENTIFIER: ${identifier.toString()}`);
    }

    return instance as H;
  }

  public set(identifier: symbol, value: unknown): void {
    this.values.set(identifier, value);
    this.setTimeout(identifier);
  }

  private cancelTimeout(identifier: symbol): void {
    const timeout: Ambiguous<NodeJS.Timeout> = this.timeouts.get(identifier);

    if (!Kind.isUndefined(timeout)) {
      clearTimeout(timeout);
    }
  }

  private setTimeout(identifier: symbol): void {
    if (this.lifetime === LIFETIME_MAX) {
      return;
    }

    this.cancelTimeout(identifier);

    const timeout: NodeJS.Timeout = setTimeout(() => {
      this.cancelTimeout(identifier);
      this.values.delete(identifier);
    }, this.lifetime);

    this.timeouts.set(identifier, timeout);
  }
}

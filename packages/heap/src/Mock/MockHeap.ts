import { UnimplementedError } from '@jamashita/anden-error';
import { IHeap } from '../IHeap';

export class MockHeap implements IHeap {
  public get<H>(): H {
    throw new UnimplementedError();
  }

  public set(): void {
    throw new UnimplementedError();
  }
}

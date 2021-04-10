import { UnimplementedError } from '@jamashita/anden-error';
import { IHeap } from '../Interface/IHeap';

export class MockHeap implements IHeap {
  public set(): void {
    throw new UnimplementedError();
  }

  public get<H>(): H {
    throw new UnimplementedError();
  }
}

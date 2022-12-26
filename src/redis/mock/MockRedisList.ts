import { UnimplementedError } from '@jamashita/anden';
import { IRedisList } from '../IRedisList.js';

export class MockRedisList implements IRedisList {
  public dump(): Promise<Array<string>> {
    throw new UnimplementedError();
  }

  public length(): Promise<number> {
    throw new UnimplementedError();
  }

  public pop(): Promise<string> {
    throw new UnimplementedError();
  }

  public push(): Promise<number> {
    throw new UnimplementedError();
  }

  public remove(): Promise<number> {
    throw new UnimplementedError();
  }

  public select(): Promise<Array<string>> {
    throw new UnimplementedError();
  }

  public shift(): Promise<string> {
    throw new UnimplementedError();
  }
}

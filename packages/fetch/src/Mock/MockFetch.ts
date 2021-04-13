import { UnimplementedError } from '@jamashita/anden-error';
import { FetchResponse, FetchResponseType } from '../FetchResponse';
import { IFetch } from '../Interface/IFetch';

export class MockFetch<T extends FetchResponseType> implements IFetch<T> {
  public get(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }

  public post(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }

  public put(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }

  public delete(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }

  public head(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }
}

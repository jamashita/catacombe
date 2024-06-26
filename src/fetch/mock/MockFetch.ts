import { UnimplementedError } from '@jamashita/anden/error';
import type { FetchResponse, FetchResponseType } from '../FetchResponse.js';
import type { IFetch } from '../IFetch.js';

export class MockFetch<T extends FetchResponseType> implements IFetch<T> {
  public delete(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }

  public get(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }

  public head(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }

  public post(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }

  public put(): Promise<FetchResponse<T>> {
    throw new UnimplementedError();
  }
}

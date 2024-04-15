import type { ObjectLiteral } from '@jamashita/anden/type';
import type { FetchResponse, FetchResponseType } from './FetchResponse.js';

export interface IFetch<T extends FetchResponseType> {
  delete(url: string): Promise<FetchResponse<T>>;

  get(url: string): Promise<FetchResponse<T>>;

  head(url: string): Promise<FetchResponse<T>>;

  post(url: string, payload?: ObjectLiteral): Promise<FetchResponse<T>>;

  put(url: string, payload?: ObjectLiteral): Promise<FetchResponse<T>>;
}

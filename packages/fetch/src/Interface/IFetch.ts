import { ObjectLiteral } from '@jamashita/anden-type';
import { FetchResponse, FetchResponseType } from '../FetchResponse';

export interface IFetch<T extends FetchResponseType> {
  get(url: string): Promise<FetchResponse<T>>;

  post(url: string, payload?: ObjectLiteral): Promise<FetchResponse<T>>;

  put(url: string, payload?: ObjectLiteral): Promise<FetchResponse<T>>;

  delete(url: string): Promise<FetchResponse<T>>;

  head(url: string): Promise<FetchResponse<T>>;
}

import { ObjectLiteral } from '@jamashita/anden-type';
import { RequestResponse, RequestResponseType } from './RequestResponse';

export interface IRequest<T extends RequestResponseType> {
  delete(url: string): Promise<RequestResponse<T>>;

  get(url: string): Promise<RequestResponse<T>>;

  head(url: string): Promise<RequestResponse<T>>;

  post(url: string, payload?: ObjectLiteral): Promise<RequestResponse<T>>;

  put(url: string, payload?: ObjectLiteral): Promise<RequestResponse<T>>;
}

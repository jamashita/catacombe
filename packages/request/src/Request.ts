import { Kind, Nullable, ObjectLiteral, Reject, Resolve } from '@jamashita/anden-type';
import { JSONA } from '@jamashita/steckdose-json';
import needle, { NeedleResponse } from 'needle';
import { IRequest } from './IRequest';
import { RequestError } from './RequestError';
import { RequestResponse, RequestResponseType } from './RequestResponse';

const HAPPY: number = 2;

export class Request<T extends RequestResponseType> implements IRequest<T> {
  private readonly type: T;

  public constructor(type: T) {
    this.type = type;
  }

  public async delete(url: string): Promise<RequestResponse<T>> {
    try {
      const res: NeedleResponse = await new Promise<NeedleResponse>((resolve: Resolve<NeedleResponse>, reject: Reject) => {
        needle.delete(url, null, (err: Nullable<Error>, response: NeedleResponse) => {
          if (!Kind.isNull(err)) {
            reject(err);

            return;
          }

          resolve(response);
        });
      });

      if (Kind.isUndefined(res.statusCode)) {
        throw new RequestError('request RETURNED undefined');
      }
      if (res.statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${res.statusCode}`);
      }

      return this.hydrate(res);
    }
    catch (err: unknown) {
      if (err instanceof RequestError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new RequestError(err.message, err);
      }

      throw err;
    }
  }

  private async flatten(payload?: ObjectLiteral): Promise<Nullable<string>> {
    if (Kind.isUndefined(payload)) {
      return Promise.resolve<null>(null);
    }

    return JSONA.stringify(payload);
  }

  public async get(url: string): Promise<RequestResponse<T>> {
    try {
      const res: NeedleResponse = await new Promise<NeedleResponse>((resolve: Resolve<NeedleResponse>, reject: Reject) => {
        needle.get(url, (err: Nullable<Error>, response: NeedleResponse) => {
          if (!Kind.isNull(err)) {
            reject(err);

            return;
          }

          resolve(response);
        });
      });

      if (Kind.isUndefined(res.statusCode)) {
        throw new RequestError('request RETURNED undefined');
      }
      if (res.statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${res.statusCode}`);
      }

      return this.hydrate(res);
    }
    catch (err: unknown) {
      if (err instanceof RequestError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new RequestError(err.message, err);
      }

      throw err;
    }
  }

  public async head(url: string): Promise<RequestResponse<T>> {
    try {
      const res: NeedleResponse = await new Promise<NeedleResponse>((resolve: Resolve<NeedleResponse>, reject: Reject) => {
        needle.head(url, (err: Nullable<Error>, response: NeedleResponse) => {
          if (!Kind.isNull(err)) {
            reject(err);

            return;
          }

          resolve(response);
        });
      });

      if (Kind.isUndefined(res.statusCode)) {
        throw new RequestError('request RETURNED undefined');
      }
      if (res.statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${res.statusCode}`);
      }

      return this.hydrate(res);
    }
    catch (err: unknown) {
      if (err instanceof RequestError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new RequestError(err.message, err);
      }

      throw err;
    }
  }

  private hydrate(res: NeedleResponse): RequestResponse<T> {
    switch (this.type) {
      case 'buffer': {
        return {
          status: res.statusCode,
          body: res.raw
        } as RequestResponse<T>;
      }
      case 'json': {
        return {
          status: res.statusCode,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          body: res.body
        } as RequestResponse<T>;
      }
      case 'text': {
        return {
          status: res.statusCode,
          body: res.raw.toString('utf-8')
        } as RequestResponse<T>;
      }
      default: {
        throw new RequestError(`UNEXPECTED TYPE. GIVEN: ${this.type}`);
      }
    }
  }

  public async post(url: string, payload?: ObjectLiteral): Promise<RequestResponse<T>> {
    try {
      const body: Nullable<string> = await this.flatten(payload);
      const res: NeedleResponse = await new Promise<NeedleResponse>((resolve: Resolve<NeedleResponse>, reject: Reject) => {
        needle.post(url, body, (err: Nullable<Error>, response: NeedleResponse) => {
          if (!Kind.isNull(err)) {
            reject(err);

            return;
          }

          resolve(response);
        });
      });

      if (Kind.isUndefined(res.statusCode)) {
        throw new RequestError('request RETURNED undefined');
      }
      if (res.statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${res.statusCode}`);
      }

      return this.hydrate(res);
    }
    catch (err: unknown) {
      if (err instanceof RequestError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new RequestError(err.message, err);
      }

      throw err;
    }
  }

  public async put(url: string, payload?: ObjectLiteral): Promise<RequestResponse<T>> {
    try {
      const body: Nullable<string> = await this.flatten(payload);
      const res: NeedleResponse = await new Promise<NeedleResponse>((resolve: Resolve<NeedleResponse>, reject: Reject) => {
        needle.put(url, body, (err: Nullable<Error>, response: NeedleResponse) => {
          if (!Kind.isNull(err)) {
            reject(err);

            return;
          }

          resolve(response);
        });
      });

      if (Kind.isUndefined(res.statusCode)) {
        throw new RequestError('request RETURNED undefined');
      }
      if (res.statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${res.statusCode}`);
      }

      return this.hydrate(res);
    }
    catch (err: unknown) {
      if (err instanceof RequestError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new RequestError(err.message, err);
      }

      throw err;
    }
  }
}

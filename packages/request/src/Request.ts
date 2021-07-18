import { Ambiguous, Kind, ObjectLiteral } from '@jamashita/anden-type';
import { JSONA } from '@jamashita/steckdose-json';
import fetch from 'node-fetch';
import { RequestError } from './Error/RequestError.js';
import { IRequest } from './Interface/IRequest.js';
import { RequestResponse, RequestResponseType } from './RequestResponse.js';

export class Request<T extends RequestResponseType> implements IRequest<T> {
  private readonly type: T;

  public constructor(type: T) {
    this.type = type;
  }

  public async delete(url: string): Promise<RequestResponse<T>> {
    try {
      const res: fetch.Response = await fetch(url, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new RequestError(`request RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
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

  public async get(url: string): Promise<RequestResponse<T>> {
    try {
      const res: fetch.Response = await fetch(url, {
        method: 'GET'
      });

      if (!res.ok) {
        throw new RequestError(`request RETURNED ${res.status}`);
      }

      return await this.hydrate(res);
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
      const res: fetch.Response = await fetch(url, {
        method: 'HEAD'
      });

      if (!res.ok) {
        throw new RequestError(`request RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
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

  public async post(url: string, payload?: ObjectLiteral): Promise<RequestResponse<T>> {
    try {
      const body: Ambiguous<string> = await this.flatten(payload);
      const res: fetch.Response = await fetch(url, {
        method: 'POST',
        body
      });

      if (!res.ok) {
        throw new RequestError(`request RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
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
      const body: Ambiguous<string> = await this.flatten(payload);
      const res: fetch.Response = await fetch(url, {
        method: 'PUT',
        body
      });

      if (!res.ok) {
        throw new RequestError(`request RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
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

  private async flatten(payload?: ObjectLiteral): Promise<Ambiguous<string>> {
    if (Kind.isUndefined(payload)) {
      return Promise.resolve<undefined>(undefined);
    }

    return JSONA.stringify(payload);
  }

  private async hydrate(res: fetch.Response): Promise<RequestResponse<T>> {
    switch (this.type) {
      case 'buffer': {
        return {
          status: res.status,
          body: await res.buffer()
        } as RequestResponse<T>;
      }
      case 'json': {
        return {
          status: res.status,
          body: await res.json() as ObjectLiteral
        } as RequestResponse<T>;
      }
      case 'text': {
        return {
          status: res.status,
          body: await res.text()
        } as RequestResponse<T>;
      }
      default: {
        throw new RequestError(`UNEXPECTED TYPE. GIVEN: ${this.type}`);
      }
    }
  }
}

import { ObjectLiteral } from '@jamashita/anden/type';
import ky, { KyResponse } from 'ky';
import { FetchError } from './FetchError.js';
import { FetchResponse, FetchResponseType } from './FetchResponse.js';
import { IFetch } from './IFetch.js';

export class Fetch<T extends FetchResponseType> implements IFetch<T> {
  private readonly type: T;

  public constructor(type: T) {
    this.type = type;
  }

  public async delete(url: string): Promise<FetchResponse<T>> {
    try {
      const res: KyResponse = await ky.delete(url);

      if (!res.ok) {
        throw new FetchError(`fetch RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.transform(res);
    }
    catch (err: unknown) {
      if (err instanceof FetchError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new FetchError(err.message, err);
      }

      throw err;
    }
  }

  public async get(url: string): Promise<FetchResponse<T>> {
    try {
      const res: KyResponse = await ky.get(url);

      if (!res.ok) {
        throw new FetchError(`Fetch RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.transform(res);
    }
    catch (err: unknown) {
      if (err instanceof FetchError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new FetchError(err.message, err);
      }

      throw err;
    }
  }

  public async head(url: string): Promise<FetchResponse<T>> {
    try {
      const res: KyResponse = await ky.head(url);

      if (!res.ok) {
        throw new FetchError(`fetch RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.transform(res);
    }
    catch (err: unknown) {
      if (err instanceof FetchError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new FetchError(err.message, err);
      }

      throw err;
    }
  }

  public async post(url: string, payload?: ObjectLiteral): Promise<FetchResponse<T>> {
    try {
      const res: KyResponse = await ky.post(url, {
        json: payload
      });

      if (!res.ok) {
        throw new FetchError(`fetch RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.transform(res);
    }
    catch (err: unknown) {
      if (err instanceof FetchError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new FetchError(err.message, err);
      }

      throw err;
    }
  }

  public async put(url: string, payload?: ObjectLiteral): Promise<FetchResponse<T>> {
    try {
      const res: KyResponse = await ky.put(url, {
        json: payload
      });

      if (!res.ok) {
        throw new FetchError(`fetch RETURNED ${res.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.transform(res);
    }
    catch (err: unknown) {
      if (err instanceof FetchError) {
        throw err;
      }
      if (err instanceof Error) {
        throw new FetchError(err.message, err);
      }

      throw err;
    }
  }

  private async transform(res: KyResponse): Promise<FetchResponse<T>> {
    switch (this.type) {
      case 'arraybuffer': {
        return {
          status: res.status,
          body: await res.arrayBuffer()
        } as FetchResponse<T>;
      }
      case 'blob': {
        return {
          status: res.status,
          body: await res.blob()
        } as FetchResponse<T>;
      }
      case 'json': {
        return {
          status: res.status,
          body: await res.json<ObjectLiteral>()
        } as FetchResponse<T>;
      }
      case 'text': {
        return {
          status: res.status,
          body: await res.text()
        } as FetchResponse<T>;
      }
      default: {
        throw new FetchError(`UNEXPECTED TYPE. GIVEN: ${this.type}`);
      }
    }
  }
}

import { ObjectLiteral } from '@jamashita/anden';
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
      return this.hydrate(res);
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
      return this.hydrate(res);
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
      return this.hydrate(res);
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

  private async hydrate(res: KyResponse): Promise<FetchResponse<T>> {
    switch (this.type) {
      case 'arraybuffer': {
        const body: ArrayBuffer = await res.arrayBuffer();

        return {
          status: res.status,
          body
        } as FetchResponse<T>;
      }
      case 'blob': {
        const body: Blob = await res.blob();

        return {
          status: res.status,
          body
        } as FetchResponse<T>;
      }
      case 'json': {
        const body: ObjectLiteral = await res.json<ObjectLiteral>();

        return {
          status: res.status,
          body
        } as FetchResponse<T>;
      }
      case 'text': {
        const body: string = await res.text();

        return {
          status: res.status,
          body
        } as FetchResponse<T>;
      }
      default: {
        throw new FetchError(`UNEXPECTED TYPE. GIVEN: ${this.type}`);
      }
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
      return this.hydrate(res);
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
      return this.hydrate(res);
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
}

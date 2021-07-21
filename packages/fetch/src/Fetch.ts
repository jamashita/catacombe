import { Ambiguous, Kind, ObjectLiteral } from '@jamashita/anden-type';
import { JSONA } from '@jamashita/steckdose-json';
import { FetchError } from './Error/FetchError.js';
import { FetchResponse, FetchResponseType } from './FetchResponse.js';
import { IFetch } from './IFetch.js';

export class Fetch<T extends FetchResponseType> implements IFetch<T> {
  private readonly type: T;

  public constructor(type: T) {
    this.type = type;
  }

  public async delete(url: string): Promise<FetchResponse<T>> {
    try {
      const res: Response = await fetch(url, {
        method: 'DELETE'
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

  public async get(url: string): Promise<FetchResponse<T>> {
    try {
      const res: Response = await fetch(url, {
        method: 'GET'
      });

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
      const res: Response = await fetch(url, {
        method: 'HEAD'
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

  public async post(url: string, payload?: ObjectLiteral): Promise<FetchResponse<T>> {
    try {
      const body: Ambiguous<string> = await this.flatten(payload);
      const res: Response = await fetch(url, {
        method: 'POST',
        body
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
      const body: Ambiguous<string> = await this.flatten(payload);
      const res: Response = await fetch(url, {
        method: 'PUT',
        body
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

  private async flatten(payload?: ObjectLiteral): Promise<Ambiguous<string>> {
    if (Kind.isUndefined(payload)) {
      return Promise.resolve<undefined>(undefined);
    }

    return JSONA.stringify(payload);
  }

  private async hydrate(res: Response): Promise<FetchResponse<T>> {
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
          body: await res.json() as ObjectLiteral
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

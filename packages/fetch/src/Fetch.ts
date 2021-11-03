import { Kind, Nullable, ObjectLiteral } from '@jamashita/anden-type';
import { JSONA } from '@jamashita/steckdose-json';
import { FetchError } from './Error/FetchError';
import { FetchResponse, FetchResponseType } from './FetchResponse';
import { IFetch } from './IFetch';

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
      const body: Nullable<string> = await this.flatten(payload);
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
      const body: Nullable<string> = await this.flatten(payload);
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

  private async flatten(payload?: ObjectLiteral): Promise<Nullable<string>> {
    if (Kind.isUndefined(payload)) {
      return Promise.resolve<null>(null);
    }

    return JSONA.stringify(payload);
  }

  private async hydrate(res: Response): Promise<FetchResponse<T>> {
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
        const body: ObjectLiteral = await res.json() as ObjectLiteral;

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
}

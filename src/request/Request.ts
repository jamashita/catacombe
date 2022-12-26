import { ObjectLiteral } from '@jamashita/anden/type';
import { JSONA } from '@jamashita/steckdose/json';
import got from 'got';
import { IRequest } from './IRequest.js';
import { RequestError } from './RequestError.js';
import { RequestResponse, RequestResponseType } from './RequestResponse.js';

const HAPPY: number = 2;

export class Request<T extends RequestResponseType> implements IRequest<T> {
  private readonly type: T;

  public constructor(type: T) {
    this.type = type;
  }

  public async delete(url: string): Promise<RequestResponse<T>> {
    try {
      const { rawBody, statusCode } = await got.delete(url, {
        responseType: this.type
      });

      if (statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${statusCode}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.hydrate(rawBody, statusCode);
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
      const { rawBody, statusCode } = await got.get(url, {
        responseType: this.type
      });

      if (statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${statusCode}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.hydrate(rawBody, statusCode);
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
      const { rawBody, statusCode } = await got.head(url, {
        responseType: this.type
      });

      if (statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${statusCode}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.hydrate(rawBody, statusCode);
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

  private async hydrate(buffer: Buffer, status: number): Promise<RequestResponse<T>> {
    switch (this.type) {
      case 'buffer': {
        return {
          status,
          body: buffer
        } as RequestResponse<T>;
      }
      case 'json': {
        return {
          status,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          body: await JSONA.parse(buffer.toString('utf-8'))
        } as RequestResponse<T>;
      }
      case 'text': {
        return {
          status,
          body: buffer.toString('utf-8')
        } as RequestResponse<T>;
      }
      default: {
        throw new RequestError(`UNEXPECTED TYPE. GIVEN: ${this.type}`);
      }
    }
  }

  public async post(url: string, payload?: ObjectLiteral): Promise<RequestResponse<T>> {
    try {
      const { rawBody, statusCode } = await got.post(url, {
        responseType: this.type,
        json: payload
      });

      if (statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${statusCode}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.hydrate(rawBody, statusCode);
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
      const { rawBody, statusCode } = await got.put(url, {
        responseType: this.type,
        json: payload
      });

      if (statusCode / 100 !== HAPPY) {
        throw new RequestError(`request RETURNED ${statusCode}`);
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return this.hydrate(rawBody, statusCode);
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

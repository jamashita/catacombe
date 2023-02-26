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

      return await this.transform(rawBody, statusCode);
    }
    catch (e: unknown) {
      if (e instanceof RequestError) {
        throw e;
      }
      if (e instanceof Error) {
        throw new RequestError(e.message, e);
      }

      throw e;
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

      return await this.transform(rawBody, statusCode);
    }
    catch (e: unknown) {
      if (e instanceof RequestError) {
        throw e;
      }
      if (e instanceof Error) {
        throw new RequestError(e.message, e);
      }

      throw e;
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

      return await this.transform(rawBody, statusCode);
    }
    catch (e: unknown) {
      if (e instanceof RequestError) {
        throw e;
      }
      if (e instanceof Error) {
        throw new RequestError(e.message, e);
      }

      throw e;
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

      return await this.transform(rawBody, statusCode);
    }
    catch (e: unknown) {
      if (e instanceof RequestError) {
        throw e;
      }
      if (e instanceof Error) {
        throw new RequestError(e.message, e);
      }

      throw e;
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

      return await this.transform(rawBody, statusCode);
    }
    catch (e: unknown) {
      if (e instanceof RequestError) {
        throw e;
      }
      if (e instanceof Error) {
        throw new RequestError(e.message, e);
      }

      throw e;
    }
  }

  private async transform(buffer: Buffer, status: number): Promise<RequestResponse<T>> {
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
}

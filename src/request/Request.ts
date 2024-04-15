import type { ObjectLiteral } from '@jamashita/anden/type';
import { JSONA } from '@jamashita/steckdose/json';
import got, { HTTPError, MaxRedirectsError } from 'got';
import type { IRequest } from './IRequest.js';
import { RequestError } from './RequestError.js';
import type { RequestResponse, RequestResponseType } from './RequestResponse.js';

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

      return await this.transform(rawBody, statusCode);
    } catch (e: unknown) {
      if (e instanceof MaxRedirectsError || e instanceof HTTPError) {
        const { rawBody, statusCode } = e.response;

        return this.transform(rawBody, statusCode);
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

      return await this.transform(rawBody, statusCode);
    } catch (e: unknown) {
      if (e instanceof MaxRedirectsError || e instanceof HTTPError) {
        const { rawBody, statusCode } = e.response;

        return this.transform(rawBody, statusCode);
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

      return await this.transform(rawBody, statusCode);
    } catch (e: unknown) {
      if (e instanceof MaxRedirectsError || e instanceof HTTPError) {
        const { rawBody, statusCode } = e.response;

        return this.transform(rawBody, statusCode);
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

      return await this.transform(rawBody, statusCode);
    } catch (e: unknown) {
      if (e instanceof MaxRedirectsError || e instanceof HTTPError) {
        const { rawBody, statusCode } = e.response;

        return this.transform(rawBody, statusCode);
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

      return await this.transform(rawBody, statusCode);
    } catch (e: unknown) {
      if (e instanceof MaxRedirectsError || e instanceof HTTPError) {
        const { rawBody, statusCode } = e.response;

        return this.transform(rawBody, statusCode);
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
        throw new RequestError(`UNEXPECTED TYPE: ${this.type}`);
      }
    }
  }
}

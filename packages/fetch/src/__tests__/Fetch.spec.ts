/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectLiteral } from '@jamashita/anden-type';
import { StatusCodes } from 'http-status-codes';
import fetchMock, { MockResponseInit } from 'jest-fetch-mock';
import { Fetch } from '../Fetch';
import { FetchError } from '../FetchError';
import { FetchResponse } from '../FetchResponse';

const sr: string = '2ea736db-8aa0-496f-950b-dec53b2eb268';
const jr: ObjectLiteral = {
  mo: 'response string',
  nu: false,
  pq: -13
};
const url: string = 'https://example.com/morceau/de/poitrine';

describe('Fetch', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('delete', () => {
    it('responds CONTINUE', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.CONTINUE,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.delete(url)).rejects.toThrow(FetchError);
    });

    it('responds OK: response is text', async () => {
      expect.assertions(2);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: sr
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      const r: FetchResponse<'text'> = await fetch.delete(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);
    });

    it('responds OK: response is json', async () => {
      expect.assertions(2);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'json'> = new Fetch<'json'>('json');

      const r: FetchResponse<'json'> = await fetch.delete(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);
    });

    it('responds MULTIPLE_CHOICE', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.MULTIPLE_CHOICES,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.delete(url)).rejects.toThrow(FetchError);
    });

    it('responds BAD_REQUEST', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.BAD_REQUEST,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.delete(url)).rejects.toThrow(FetchError);
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.delete(url)).rejects.toThrow(FetchError);
    });
  });

  describe('get', () => {
    it('responds CONTINUE', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.CONTINUE,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.get(url)).rejects.toThrow(FetchError);
    });

    it('responds OK: response is text', async () => {
      expect.assertions(2);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: sr
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      const r: FetchResponse<'text'> = await fetch.get(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);
    });

    it('responds OK: response is json', async () => {
      expect.assertions(2);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'json'> = new Fetch<'json'>('json');

      const r: FetchResponse<'json'> = await fetch.get(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);
    });

    it('responds MULTIPLE_CHOICE', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.MULTIPLE_CHOICES,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.get(url)).rejects.toThrow(FetchError);
    });

    it('responds BAD_REQUEST', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.BAD_REQUEST,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.get(url)).rejects.toThrow(FetchError);
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.get(url)).rejects.toThrow(FetchError);
    });
  });

  describe('head', () => {
    it('responds CONTINUE', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.CONTINUE,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.head(url)).rejects.toThrow(FetchError);
    });

    it('responds OK: response is text', async () => {
      expect.assertions(2);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: sr
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      const r: FetchResponse<'text'> = await fetch.head(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);
    });

    it('responds OK: response is json', async () => {
      expect.assertions(2);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'json'> = new Fetch<'json'>('json');

      const r: FetchResponse<'json'> = await fetch.head(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);
    });

    it('responds MULTIPLE_CHOICE', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.MULTIPLE_CHOICES,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.head(url)).rejects.toThrow(FetchError);
    });

    it('responds BAD_REQUEST', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.BAD_REQUEST,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.head(url)).rejects.toThrow(FetchError);
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      expect.assertions(1);

      fetchMock.mockResponse(async (): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.head(url)).rejects.toThrow(FetchError);
    });
  });

  describe('post', () => {
    it('responds CONTINUE', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.CONTINUE,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.post(url)).rejects.toThrow(FetchError);
    });

    it('responds OK: response is text', async () => {
      expect.assertions(2);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: sr
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      const r: FetchResponse<'text'> = await fetch.post(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);
    });

    it('responds OK: response is json', async () => {
      expect.assertions(2);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'json'> = new Fetch<'json'>('json');

      const r: FetchResponse<'json'> = await fetch.post(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);
    });

    it('responds MULTIPLE_CHOICES', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.MULTIPLE_CHOICES,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.post(url)).rejects.toThrow(FetchError);
    });

    it('responds BAD_REQUEST', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.BAD_REQUEST,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.post(url)).rejects.toThrow(FetchError);
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.post(url)).rejects.toThrow(FetchError);
    });
  });

  describe('put', () => {
    it('responds CONTINUE', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.CONTINUE,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.put(url)).rejects.toThrow(FetchError);
    });

    it('responds OK: response is text', async () => {
      expect.assertions(2);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: sr
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      const r: FetchResponse<'text'> = await fetch.put(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);
    });

    it('responds OK: response is json', async () => {
      expect.assertions(2);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'json'> = new Fetch<'json'>('json');

      const r: FetchResponse<'json'> = await fetch.put(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);
    });

    it('responds MULTIPLE_CHOICES', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.MULTIPLE_CHOICES,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.put(url)).rejects.toThrow(FetchError);
    });

    it('responds BAD_REQUEST', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.BAD_REQUEST,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.put(url)).rejects.toThrow(FetchError);
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      expect.assertions(1);

      fetchMock.mockResponse((): Promise<MockResponseInit> => {
        return Promise.resolve<MockResponseInit>({
          init: {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            headers: {
              'Content-Type': 'text/html'
            }
          },
          body: JSON.stringify(jr)
        });
      });

      const fetch: Fetch<'text'> = new Fetch('text');

      await expect(fetch.put(url)).rejects.toThrow(FetchError);
    });
  });
});

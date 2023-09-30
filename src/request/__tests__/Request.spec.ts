import { ObjectLiteral } from '@jamashita/anden/type';
import { StatusCodes } from '@jamashita/steckdose/http';
import nock, { Scope } from 'nock';
import { Request } from '../Request.js';
import { RequestResponse } from '../RequestResponse.js';

const sr: string = 'ce8781d8-85ac-4b3e-908f-17253facb1af';
const jr: ObjectLiteral = {
  mo: 'response string',
  nu: false,
  pq: -13
};
const br: Buffer = Buffer.from('f8060634-7b33-4582-8bb5-a8e98e91cc4f');
const url: string = 'https://oichokabu.wiki';

describe('Request', () => {
  beforeAll(() => {
    nock.disableNetConnect();
    nock.cleanAll();
  });

  beforeEach(() => {
    if (!nock.isActive()) {
      nock.activate();
    }
  });

  afterEach(() => {
    nock.cleanAll();
    nock.restore();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  describe('delete', () => {
    it('responds CONTINUE', async () => {
      const scope: Scope = nock(url).persist().delete('/').reply(StatusCodes.CONTINUE, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.delete(url);

      expect(r.status).toBe(StatusCodes.CONTINUE);

      scope.done();
    });

    it('responds OK: response is text', async () => {
      const scope: Scope = nock(url).persist().delete('/').reply(StatusCodes.OK, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.delete(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds OK: response is json', async () => {
      const scope: Scope = nock(url).persist().delete('/').reply(StatusCodes.OK, jr);

      const request: Request<'json'> = new Request('json');
      const r: RequestResponse<'json'> = await request.delete(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);

      scope.done();
    });

    it('responds OK: response is buffer', async () => {
      const scope: Scope = nock(url).persist().delete('/').reply(StatusCodes.OK, br);

      const request: Request<'buffer'> = new Request('buffer');
      const r: RequestResponse<'buffer'> = await request.delete(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body.equals(br)).toBe(true);

      scope.done();
    });

    it('responds MULTIPLE_CHOICES', async () => {
      const scope: Scope = nock(url).persist().delete('/').reply(StatusCodes.MULTIPLE_CHOICES, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.delete(url);

      expect(r.status).toBe(StatusCodes.MULTIPLE_CHOICES);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds BAD_REQUEST', async () => {
      const scope: Scope = nock(url).persist().delete('/').reply(StatusCodes.BAD_REQUEST, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.delete(url);

      expect(r.status).toBe(StatusCodes.BAD_REQUEST);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      const scope: Scope = nock(url).persist().delete('/').reply(StatusCodes.INTERNAL_SERVER_ERROR, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.delete(url);

      expect(r.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(r.body).toBe(sr);

      scope.done();
    });
  });

  describe('get', () => {
    it('responds CONTINUE', async () => {
      const scope: Scope = nock(url).persist().get('/').reply(StatusCodes.CONTINUE, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.get(url);

      expect(r.status).toBe(StatusCodes.CONTINUE);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds OK: response is text', async () => {
      const scope: Scope = nock(url).persist().get('/').reply(StatusCodes.OK, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.get(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds OK: response is json', async () => {
      const scope: Scope = nock(url).persist().get('/').reply(StatusCodes.OK, jr);

      const request: Request<'json'> = new Request('json');
      const r: RequestResponse<'json'> = await request.get(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);

      scope.done();
    });

    it('responds OK: response is buffer', async () => {
      const scope: Scope = nock(url).persist().get('/').reply(StatusCodes.OK, br);

      const request: Request<'buffer'> = new Request('buffer');
      const r: RequestResponse<'buffer'> = await request.get(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body.equals(br)).toBe(true);

      scope.done();
    });

    it('responds MULTIPLE_CHOICES', async () => {
      const scope: Scope = nock(url).persist().get('/').reply(StatusCodes.MULTIPLE_CHOICES, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.get(url);

      expect(r.status).toBe(StatusCodes.MULTIPLE_CHOICES);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds BAD_REQUEST', async () => {
      const scope: Scope = nock(url).persist().get('/').reply(StatusCodes.BAD_REQUEST, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.get(url);

      expect(r.status).toBe(StatusCodes.BAD_REQUEST);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      const scope: Scope = nock(url).persist().get('/').reply(StatusCodes.INTERNAL_SERVER_ERROR, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.get(url);

      expect(r.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(r.body).toBe(sr);

      scope.done();
    });
  });

  describe('head', () => {
    it('responds OK: response is text', async () => {
      const scope: Scope = nock(url).persist().head('/').reply(StatusCodes.OK, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.head(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds OK: response is json', async () => {
      const scope: Scope = nock(url).persist().head('/').reply(StatusCodes.OK, jr);

      const request: Request<'json'> = new Request('json');
      const r: RequestResponse<'json'> = await request.head(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);

      scope.done();
    });

    it('responds OK: response is buffer', async () => {
      const scope: Scope = nock(url).persist().head('/').reply(StatusCodes.OK, br);

      const request: Request<'buffer'> = new Request('buffer');
      const r: RequestResponse<'buffer'> = await request.head(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body.equals(br)).toBe(true);

      scope.done();
    });

    it('responds MULTIPLE_CHOICES', async () => {
      const scope: Scope = nock(url).persist().head('/').reply(StatusCodes.MULTIPLE_CHOICES, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.head(url);

      expect(r.status).toBe(StatusCodes.MULTIPLE_CHOICES);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds BAD_REQUEST', async () => {
      const scope: Scope = nock(url).persist().head('/').reply(StatusCodes.BAD_REQUEST, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.head(url);

      expect(r.status).toBe(StatusCodes.BAD_REQUEST);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      const scope: Scope = nock(url).persist().head('/').reply(StatusCodes.INTERNAL_SERVER_ERROR, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.head(url);

      expect(r.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(r.body).toBe(sr);

      scope.done();
    });
  });

  describe('post', () => {
    it('responds CONTINUE', async () => {
      const scope: Scope = nock(url).persist().post('/').reply(StatusCodes.CONTINUE, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.post(url);

      expect(r.status).toBe(StatusCodes.CONTINUE);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds OK: response is text', async () => {
      const scope: Scope = nock(url).persist().post('/').reply(StatusCodes.OK, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.post(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds OK: response is json', async () => {
      const scope: Scope = nock(url).persist().post('/').reply(StatusCodes.OK, jr);

      const request: Request<'json'> = new Request('json');
      const r: RequestResponse<'json'> = await request.post(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);

      scope.done();
    });

    it('responds OK: response is buffer', async () => {
      const scope: Scope = nock(url).persist().post('/').reply(StatusCodes.OK, br);

      const request: Request<'buffer'> = new Request('buffer');
      const r: RequestResponse<'buffer'> = await request.post(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body.equals(br)).toBe(true);

      scope.done();
    });

    it('responds MULTIPLE_CHOICES', async () => {
      const scope: Scope = nock(url).persist().post('/').reply(StatusCodes.MULTIPLE_CHOICES, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.post(url);

      expect(r.status).toBe(StatusCodes.MULTIPLE_CHOICES);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds BAD_REQUEST', async () => {
      const scope: Scope = nock(url).persist().post('/').reply(StatusCodes.BAD_REQUEST, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.post(url);

      expect(r.status).toBe(StatusCodes.BAD_REQUEST);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      const scope: Scope = nock(url).persist().post('/').reply(StatusCodes.INTERNAL_SERVER_ERROR, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.post(url);

      expect(r.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(r.body).toBe(sr);

      scope.done();
    });
  });

  describe('put', () => {
    it('responds CONTINUE', async () => {
      const scope: Scope = nock(url).persist().put('/').reply(StatusCodes.CONTINUE, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.put(url);

      expect(r.status).toBe(StatusCodes.CONTINUE);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds OK: response is text', async () => {
      const scope: Scope = nock(url).persist().put('/').reply(StatusCodes.OK, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.put(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds OK: response is json', async () => {
      const scope: Scope = nock(url).persist().put('/').reply(StatusCodes.OK, jr);

      const request: Request<'json'> = new Request('json');

      const r: RequestResponse<'json'> = await request.put(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body).toStrictEqual(jr);

      scope.done();
    });

    it('responds OK: response is buffer', async () => {
      const scope: Scope = nock(url).persist().put('/').reply(StatusCodes.OK, br);

      const request: Request<'buffer'> = new Request('buffer');
      const r: RequestResponse<'buffer'> = await request.put(url);

      expect(r.status).toBe(StatusCodes.OK);
      expect(r.body.equals(br)).toBe(true);

      scope.done();
    });

    it('responds MULTIPLE_CHOICES', async () => {
      const scope: Scope = nock(url).persist().put('/').reply(StatusCodes.MULTIPLE_CHOICES, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.put(url);

      expect(r.status).toBe(StatusCodes.MULTIPLE_CHOICES);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds BAD_REQUEST', async () => {
      const scope: Scope = nock(url).persist().put('/').reply(StatusCodes.BAD_REQUEST, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.put(url);

      expect(r.status).toBe(StatusCodes.BAD_REQUEST);
      expect(r.body).toBe(sr);

      scope.done();
    });

    it('responds INTERNAL_SERVER_ERROR', async () => {
      const scope: Scope = nock(url).persist().put('/').reply(StatusCodes.INTERNAL_SERVER_ERROR, sr);

      const request: Request<'text'> = new Request('text');
      const r: RequestResponse<'text'> = await request.put(url);

      expect(r.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(r.body).toBe(sr);

      scope.done();
    });
  });
});

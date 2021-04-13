import { ObjectLiteral } from '@jamashita/anden-type';

type FetchBodyKV = Readonly<{
  arraybuffer: ArrayBuffer;
  blob: Blob;
  json: ObjectLiteral;
  text: string;
}>;

export type FetchResponseType = keyof FetchBodyKV;

export type FetchResponse<T extends FetchResponseType> = Readonly<{
  status: number;
  body: FetchBodyKV[T];
}>;

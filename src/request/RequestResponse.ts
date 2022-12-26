import { ObjectLiteral } from '@jamashita/anden';

export type RequestBodyKV = Readonly<{
  buffer: Buffer;
  json: ObjectLiteral;
  text: string;
}>;

export type RequestResponseType = keyof RequestBodyKV;

export type RequestResponse<T extends RequestResponseType> = Readonly<{
  status: number;
  body: RequestBodyKV[T];
}>;

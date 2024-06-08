export interface IFile {
  append(path: string, data: Buffer | string): Promise<void>;

  dir(path: string): Promise<Array<string>>;

  exists(path: string): Promise<boolean>;

  read(path: string): Promise<Buffer>;

  write(path: string, data: Buffer | string): Promise<void>;
}

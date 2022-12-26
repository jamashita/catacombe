export interface IFile {
  exists(path: string): Promise<boolean>;

  read(path: string): Promise<Buffer>;

  write(path: string, data: Buffer | string): Promise<void>;
}

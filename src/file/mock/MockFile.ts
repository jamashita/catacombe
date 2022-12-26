import { UnimplementedError } from '@jamashita/anden';
import { IFile } from '../IFile.js';

export class MockFile implements IFile {
  public exists(): Promise<boolean> {
    return Promise.reject(new UnimplementedError());
  }

  public read(): Promise<Buffer> {
    return Promise.reject(new UnimplementedError());
  }

  public write(): Promise<void> {
    return Promise.reject(new UnimplementedError());
  }
}

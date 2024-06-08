import { UnimplementedError } from '@jamashita/anden/error';
import type { IFile } from '../IFile.js';

export class MockFile implements IFile {
  public append(): Promise<void> {
    return Promise.reject(new UnimplementedError());
  }

  public dir(): Promise<string[]> {
    return Promise.reject(new UnimplementedError());
  }

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

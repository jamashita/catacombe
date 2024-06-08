import { constants, promises } from 'fs';
import { FileError } from './FileError.js';
import type { IFile } from './IFile.js';

export class File implements IFile {
  public async append(path: string, data: Buffer | string): Promise<void> {
    try {
      await promises.appendFile(path, data);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new FileError(e.message, e);
      }

      throw e;
    }
  }

  public async dir(path: string): Promise<Array<string>> {
    try {
      return await promises.readdir(path);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new FileError(e.message, e);
      }

      throw e;
    }
  }

  public async exists(path: string): Promise<boolean> {
    try {
      await promises.access(path, constants.R_OK | constants.W_OK);

      return true;
    }
    catch {
      return false;
    }
  }

  public async read(path: string): Promise<Buffer> {
    try {
      return await promises.readFile(path);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new FileError(e.message, e);
      }

      throw e;
    }
  }

  public async write(path: string, data: Buffer | string): Promise<void> {
    try {
      await promises.writeFile(path, data);
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        throw new FileError(e.message, e);
      }

      throw e;
    }
  }
}

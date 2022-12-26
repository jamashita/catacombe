import fs from 'fs';
import { FileError } from './FileError.js';
import { IFile } from './IFile.js';

export class File implements IFile {
  public async exists(path: string): Promise<boolean> {
    try {
      // eslint-disable-next-line no-bitwise
      await fs.promises.access(path, fs.constants.R_OK | fs.constants.W_OK);

      return true;
    }
    catch (err: unknown) {
      return false;
    }
  }

  public async read(path: string): Promise<Buffer> {
    try {
      return await fs.promises.readFile(path);
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new FileError(err.message, err);
      }

      throw err;
    }
  }

  public async write(path: string, data: Buffer | string): Promise<void> {
    try {
      await fs.promises.writeFile(path, data);

      return;
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new FileError(err.message, err);
      }

      throw err;
    }
  }
}

import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const buffer: Buffer = file.buffer;

      const fileName: string = uuidv4() + '.jpg';
      const filePath: string = path.resolve(__dirname, '..', '..', 'static');

      if (!fs.existsSync(filePath)) {
        await fs.promises.mkdir(filePath, { recursive: true });
      }

      await fs.promises.writeFile(path.join(filePath, fileName), buffer);

      return fileName;
    } catch (e) {
      console.error('Ошибка при сохранении файла:', e);
      throw new Error('Не удалось сохранить файл');
    }
  }
}

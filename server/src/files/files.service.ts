import {Injectable} from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
    private readonly baseUploadPath = path.resolve(__dirname, '..', '..', 'uploads');

    constructor() {
        this.ensureDirectoryExists(this.baseUploadPath);
    }

    private ensureDirectoryExists(directoryPath: string): void {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    saveFile(file: Express.Multer.File, relativePath = 'shared'): string {
        const targetPath = path.join(this.baseUploadPath, relativePath);
        this.ensureDirectoryExists(targetPath);

        const fileName = `${uuidv4()}_${file.originalname}`;
        const fullFilePath = path.join(targetPath, fileName);

        fs.writeFileSync(fullFilePath, file.buffer);

        return path.relative(this.baseUploadPath, fullFilePath).replace(/\\/g, '/');
    }

    getFilePath(relativeFilePath: string): string {
        return path.resolve(this.baseUploadPath, relativeFilePath);
    }
}

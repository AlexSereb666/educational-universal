import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { Files } from './files.model';
import { UploadFileDto } from './dto/upload-file.dto';
import { RenameFileDto } from './dto/rename-file.dto';

@Injectable()
export class FilesService {
    private readonly baseUploadPath = path.resolve(__dirname, '..', '..', 'uploads');

    constructor(@InjectModel(Files) private filesRepository: typeof Files) {
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

    async getFilesInFolder(userId: number, folderId?: number) {
        return this.filesRepository.findAll({
            where: { userId, folderId: folderId || null },
        });
    }

    async deleteFile(userId: number, fileId: number) {
        const file = await this.filesRepository.findOne({
            where: { userId, id: fileId },
        });

        if (!file) {
            throw new Error('Файл не найден или у вас нет к нему доступа');
        }

        const fullFilePath = path.join(this.baseUploadPath, file.storagePath);

        if (fs.existsSync(fullFilePath)) {
            fs.unlinkSync(fullFilePath);
        }

        await this.filesRepository.destroy({ where: { id: fileId } });

        return { fileId };
    }

    async uploadFile(userId: number, file: Express.Multer.File, dto: UploadFileDto) {
        const userFolderPath = path.join(this.baseUploadPath, userId.toString());
        this.ensureDirectoryExists(userFolderPath);

        const fileName = `${uuidv4()}_${file.originalname}`;
        const fullFilePath = path.join(userFolderPath, fileName);

        fs.writeFileSync(fullFilePath, file.buffer);

        const fileRecord = await this.filesRepository.create({
            userId,
            folderId: dto.folderId || null,
            name: file.originalname,
            size: file.size,
            mimeType: file.mimetype,
            storagePath: `${userId}/${fileName}`,
            createdAt: new Date(),
        });

        return fileRecord;
    }

    async renameFile(dto: RenameFileDto) {
        const { userId, fileId, newName } = dto;

        const file = await this.filesRepository.findOne({
            where: { userId, id: fileId },
        });

        if (!file) {
            throw new Error('Файл не найден или у вас нет к нему доступа');
        }

        const ext = path.extname(file.name);

        const hasExtension = path.extname(newName) !== '';
        const finalName = hasExtension ? newName : `${newName}${ext}`;

        const oldPath = path.join(this.baseUploadPath, file.storagePath);
        const newFileName = `${uuidv4()}_${finalName}`;
        const newStoragePath = path.join(path.dirname(file.storagePath), newFileName);
        const newFullPath = path.join(this.baseUploadPath, newStoragePath);

        if (!fs.existsSync(oldPath)) {
            throw new Error('Физический файл не найден на сервере');
        }

        fs.renameSync(oldPath, newFullPath);

        file.name = finalName;
        file.storagePath = newStoragePath;
        await file.save();

        return file;
    }
}

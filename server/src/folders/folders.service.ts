import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Folders } from './folders.model';
import { FilesService } from '../files/files.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { RenameFolderDto } from './dto/rename-folder.dto';
import { FolderContentsDto } from './dto/folder-contents.dto';

@Injectable()
export class FoldersService {
    constructor(
        @InjectModel(Folders) private foldersRepository: typeof Folders,
        private filesService: FilesService,
    ) {}

    async createFolder(userId: number, dto: CreateFolderDto) {
        const { name, parentId } = dto;

        if (parentId) {
            const parentFolder = await this.foldersRepository.findByPk(parentId);
            if (!parentFolder) {
                throw new Error('Родительская папка не найдена');
            }
        }

        const folder = await this.foldersRepository.create({
            userId,
            name,
            parentId: parentId || null,
            createdAt: new Date(),
        });

        return folder;
    }

    async getFolderContents(
        userId: number,
        folderId?: number,
    ): Promise<FolderContentsDto> {
        let currentFolder = null;

        if (folderId) {
            currentFolder = await this.foldersRepository.findByPk(folderId);

            if (!currentFolder || currentFolder.userId !== userId) {
                throw new Error('Папка не найдена или нет доступа');
            }
        }

        const folders = await this.foldersRepository.findAll({
            where: { userId, parentId: folderId || null },
        });

        const files = await this.filesService.getFilesInFolder(userId, folderId);

        return new FolderContentsDto(currentFolder, folders, files);
    }

    async deleteFolder(userId: number, folderId: number) {
        const folder = await this.foldersRepository.findByPk(folderId);

        if (!folder || folder.userId !== Number(userId)) {
            throw new Error('Папка не найдена или нет доступа');
        }

        const subfolders = await this.getAllSubfolders(folderId);

        const folderIds = [...subfolders.map((f) => f.id), folderId];

        for (const id of folderIds) {
            const files = await this.filesService.getFilesInFolder(userId, id);
            for (const file of files) {
                await this.filesService.deleteFile(userId, file.id);
            }
        }

        await this.foldersRepository.destroy({ where: { id: folderIds } });

        return { folderId };
    }

    private async getAllSubfolders(parentId: number): Promise<Folders[]> {
        const subfolders = await this.foldersRepository.findAll({ where: { parentId } });

        let allFolders = [...subfolders];
        for (const folder of subfolders) {
            const deeperFolders = await this.getAllSubfolders(folder.id);
            allFolders = [...allFolders, ...deeperFolders];
        }

        return allFolders;
    }

    async renameFolder(dto: RenameFolderDto) {
        const { userId, folderId, newName } = dto;

        const folder = await this.foldersRepository.findByPk(folderId);

        if (!folder || folder.userId !== userId) {
            throw new Error('Папка не найдена или нет доступа');
        }

        folder.name = newName;
        await folder.save();

        return folder;
    }
}

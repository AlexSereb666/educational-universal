import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { UploadFileDto } from './dto/upload-file.dto';
import { RenameFileDto } from './dto/rename-file.dto';
import { MoveFileDto } from './dto/move-file.dto';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('path') path?: string,
    ): string {
        if (!file) {
            throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
        }

        const relativePath = path || 'shared';
        return this.filesService.saveFile(file, relativePath);
    }

    @Get(':fileName')
    getFile(@Param('fileName') fileName: string, @Res() res: Response) {
        const filePath = this.filesService.getFilePath(fileName);
        if (!fs.existsSync(filePath)) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }
        res.sendFile(filePath);
    }

    @Delete('delete/:userId/:fileId')
    async deleteFile(@Param('userId') userId: number, @Param('fileId') fileId: number) {
        return this.filesService.deleteFile(userId, fileId);
    }

    @Post(':userId/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileBd(
        @Param('userId', ParseIntPipe) userId: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: UploadFileDto,
    ) {
        return this.filesService.uploadFile(userId, file, dto);
    }

    @Patch('rename')
    async renameFile(@Body() dto: RenameFileDto) {
        return this.filesService.renameFile(dto);
    }

    @Get('download/:fileId/:userId')
    async downloadFile(
        @Param('fileId') fileId: number,
        @Param('userId') userId: number,
        @Res() res: Response,
    ) {
        const { filePath, fileName, mimeType } = await this.filesService.downloadFile(
            userId,
            fileId,
        );

        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${encodeURIComponent(fileName)}"`,
        );
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Length', fs.statSync(filePath).size);

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.log('Ошибка при отправке файла:', err);
            }
        });
    }

    @Patch('move')
    @UsePipes(new ValidationPipe())
    async moveFile(@Body() dto: MoveFileDto) {
        return this.filesService.moveFile(dto);
    }
}

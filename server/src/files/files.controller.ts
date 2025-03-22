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
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { UploadFileDto } from './dto/upload-file.dto';
import { RenameFileDto } from './dto/rename-file.dto';

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

    @Delete('delete')
    async deleteFile(@Body() { userId, filePath }: { userId: number; filePath: string }) {
        return this.filesService.deleteFile(userId, filePath);
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
}

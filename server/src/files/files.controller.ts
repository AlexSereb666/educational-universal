import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {FilesService} from "./files.service";
import {FileInterceptor} from "@nestjs/platform-express";
import { Response } from 'express';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('path') path?: string
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
}

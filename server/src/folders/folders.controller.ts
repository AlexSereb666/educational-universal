import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { RenameFolderDto } from './dto/rename-folder.dto';

@Controller('folders')
export class FoldersController {
    constructor(private readonly foldersService: FoldersService) {}

    @Post('create/:id')
    async createFolder(@Param('id') id: number, @Body() dto: CreateFolderDto) {
        return this.foldersService.createFolder(id, dto);
    }

    @Get('contents')
    async getFolderContents(
        @Query('userId') userId: number,
        @Query('folderId') folderId?: number,
    ) {
        return this.foldersService.getFolderContents(Number(userId), folderId);
    }

    @Delete('delete/:userId/:folderId')
    async deleteFolder(
        @Param('userId') userId: number,
        @Param('folderId') folderId: number,
    ) {
        return this.foldersService.deleteFolder(userId, folderId);
    }

    @Patch('rename')
    async renameFolder(@Body() dto: RenameFolderDto) {
        return this.foldersService.renameFolder(dto);
    }
}

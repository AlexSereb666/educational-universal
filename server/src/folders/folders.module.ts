import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Folders } from './folders.model';
import { FilesModule } from '../files/files.module';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';

@Module({
    controllers: [FoldersController],
    providers: [FoldersService],
    imports: [SequelizeModule.forFeature([Folders]), forwardRef(() => FilesModule)],
})
export class FoldersModule {}

import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Files } from './files.model';
import { FoldersModule } from '../folders/folders.module';
import { Folders } from '../folders/folders.model';

@Module({
    providers: [FilesService],
    controllers: [FilesController],
    imports: [
        SequelizeModule.forFeature([Files, Folders]),
        forwardRef(() => FoldersModule),
    ],
    exports: [FilesService],
})
export class FilesModule {}

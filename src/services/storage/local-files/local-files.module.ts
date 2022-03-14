import { Module } from '@nestjs/common';
import { LocalFilesService } from './local-files.service';

@Module({
  providers: [LocalFilesService]
})
export class LocalFilesModule {}

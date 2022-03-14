import { Module } from '@nestjs/common';
import { S3FilesService } from './s3-files.service';

@Module({
  exports: [S3FilesService],
  providers: [S3FilesService]
})
export class S3FilesModule {}
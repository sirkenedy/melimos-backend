import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './entities/blog.entity';
import { S3FilesModule } from './../../services/storage/s3-files/s3-files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), S3FilesModule],
  exports: [TypeOrmModule, BlogsService],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}

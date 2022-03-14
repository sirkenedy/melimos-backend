import { Test, TestingModule } from '@nestjs/testing';
import { S3FilesService } from './s3-files.service';

describe('S3FilesService', () => {
  let service: S3FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3FilesService],
    }).compile();

    service = module.get<S3FilesService>(S3FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

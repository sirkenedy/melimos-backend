import { Blog } from './entities/blog.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async create(data: object)  {
    return await this.blogsRepository.save(Object.assign(new Blog(), data)).then(res => res);
  }

  findAll(): Promise<Blog[]> {
    return this.blogsRepository.find()
  }

  async findOne(id: any): Promise<Blog> {
    return await this.blogsRepository.findOneOrFail(id).then(res => res).catch (e => {
      throw new NotFoundException(e);
    });
  }

  async findByIds(...ids): Promise<Blog[]> {
    return await this.blogsRepository.findByIds(ids).then(res=>res);
  }

  async update(id:number, data: object): Promise<Blog | UpdateResult | undefined> {
    const Blog = await this.findOne(id).then(res => res)
    return await this.blogsRepository.save(Object.assign(Blog, data)).then(res => res);
  }

  async remove(id: number) {
    this.findOne(id)
    return await this.blogsRepository.delete(id);
  }
}

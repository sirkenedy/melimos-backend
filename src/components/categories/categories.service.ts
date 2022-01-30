import { Category } from './entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(data: object)  {
    return await this.categoriesRepository.save(data).then(res => res);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find()
  }

  async findOne(id: any): Promise<Category> {
    return await this.categoriesRepository.findOneOrFail(id).then(res => res).catch (e => {
      console.log(e);
      throw new NotFoundException(e);
    });
  }

  async findByIds(...ids): Promise<Category[]> {
    return await this.categoriesRepository.findByIds(ids).then(res=>res);
  }

  async update(id:number, data: object): Promise<Category | UpdateResult | undefined> {
    const Category = await this.findOne(id).then(res => res)
    return await this.categoriesRepository.save(Object.assign(Category, data)).then(res => res);
  }

  async remove(id: number) {
    this.findOne(id)
    return await this.categoriesRepository.delete(id);
  }
}

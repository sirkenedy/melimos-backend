import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Roles as Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private RolesRepository: Repository<Role>,
  ) {}

  async create(data: object)  {
    return await this.RolesRepository.save(data).then(res => res);
  }

  findAll(): Promise<Role[]> {
    return this.RolesRepository.find()
  }

  async findOne(id: number): Promise<Role> {
    return await this.RolesRepository.findOneOrFail(id, {relations: ["users"]}).then(res => res).catch (e => {
      throw new NotFoundException(e)
    });
  }

  async update(id:number, data: object): Promise<Role | UpdateResult | undefined> {
    this.findOne(id)
    return await this.RolesRepository.update(id, data).then(res => res);
  }

  async remove(id: number) {
    this.findOne(id)
    return await this.RolesRepository.delete(id);
  }
}

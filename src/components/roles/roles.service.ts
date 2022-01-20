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

  async findOne(id: any): Promise<Role> {
    return await this.RolesRepository.findOneOrFail(id).then(res => res).catch (e => {
      console.log(e);
      throw new NotFoundException(e);
    });
  }

  async findByIds(...ids): Promise<Role[]> {
    return await this.RolesRepository.findByIds(ids).then(res=>res);
  }

  async update(id:number, data: object): Promise<Role | UpdateResult | undefined> {
    const role = await this.findOne(id).then(res => res)
    return await this.RolesRepository.save(Object.assign(role, data)).then(res => res);
  }

  async remove(id: number) {
    this.findOne(id)
    return await this.RolesRepository.delete(id);
  }
}

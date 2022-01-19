import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Users as User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto).then(res => res).catch(e => { 
      throw new UnprocessableEntityException() 
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: any): Promise<User | undefined> {
    return await this.usersRepository.findOne(id, {relations: ["roles"]});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

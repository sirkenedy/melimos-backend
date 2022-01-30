import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async create(data: object)  {
    return await this.subscriptionsRepository.save(data).then(res => res);
  }

  findAll(): Promise<Subscription[]> {
    return this.subscriptionsRepository.find()
  }

  async findOne(id: any): Promise<Subscription> {
    return await this.subscriptionsRepository.findOneOrFail(id).then(res => res).catch (e => {
      console.log(e);
      throw new NotFoundException(e);
    });
  }

  async findByIds(...ids): Promise<Subscription[]> {
    return await this.subscriptionsRepository.findByIds(ids).then(res=>res);
  }

  async remove(id: number) {
    this.findOne(id)
    return await this.subscriptionsRepository.delete(id);
  }
}

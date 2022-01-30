import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}
  
  async create(data: object)  {
    return await this.contactsRepository.save(data).then(res => res);
  }

  findAll(): Promise<Contact[]> {
    return this.contactsRepository.find()
  }

  async findOne(id: any): Promise<Contact> {
    return await this.contactsRepository.findOneOrFail(id).then(res => res).catch (e => {
      throw new NotFoundException(e);
    });
  }

  async findByIds(...ids): Promise<Contact[]> {
    return await this.contactsRepository.findByIds(ids).then(res=>res);
  }

  async update(id:number, data: object): Promise<Contact | UpdateResult | undefined> {
    const role = await this.findOne(id).then(res => res)
    return await this.contactsRepository.save(Object.assign(role, data)).then(res => res);
  }

  async remove(id: number) {
    this.findOne(id)
    return await this.contactsRepository.delete(id);
  }
}

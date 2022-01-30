import { Public } from './../../utils/decorators/is-public.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Roles } from '../../utils/decorators/roles.decorator';
import { Role as E_Role} from '../../utils/enum/role.enum'
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Roles(E_Role.SuperAdmin)
  @Post()
  create(@Body() CreateContactDto: CreateContactDto) {
    return this.contactsService.create(CreateContactDto);
  }
  
  // @Roles(E_Role.User)
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.findOne(+id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateContactDto: UpdateContactDto, @Res() res: Response) {
    const response = await this.contactsService.update(+id, UpdateContactDto);
    if(response) return res.status(HttpStatus.OK).json({"message" : "Contact information updated successfully"});
    return res.status(HttpStatus.NOT_FOUND).json({"error" : "The resource to be updated no longer exist"})
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.contactsService.remove(+id);
    res.status(HttpStatus.OK).json({"message" : "Contact details deleted successfully"});
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from '../../utils/decorators/roles.decorator';
import { Role as E_Role} from '../../utils/enum/role.enum';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Roles(E_Role.SuperAdmin)
  @Post()
  create(@Body() CreateSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(CreateSubscriptionDto);
  }

  @Roles(E_Role.SuperAdmin)
  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Roles(E_Role.SuperAdmin)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.subscriptionsService.remove(+id);
    res.status(HttpStatus.OK).json({"message" : "Blog details deleted successfully"});
  }
}

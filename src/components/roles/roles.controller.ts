import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles as Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateRoleDto: CreateRoleDto) {
    return this.rolesService.create(CreateRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(+id)
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateRoleDto: UpdateRoleDto, @Res() res: Response) {
    const response = await this.rolesService.update(+id, UpdateRoleDto);
    if(response) return res.status(HttpStatus.OK).json({"message" : "Role information updated successfully"});
    return res.status(HttpStatus.NOT_FOUND).json({"error" : "The resource to be updated no longer exist"})
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.rolesService.remove(+id);
    res.status(HttpStatus.OK).json({"message" : "Role details deleted successfully"});
  }
}

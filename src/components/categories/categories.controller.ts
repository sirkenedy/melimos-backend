import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from '../../utils/decorators/roles.decorator';
import { Role as E_Role} from '../../utils/enum/role.enum'
import { Response } from 'express';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(E_Role.SuperAdmin)
  @Post()
  create(@Body() CreateCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(CreateCategoryDto);
  }
  
  @Roles(E_Role.SuperAdmin)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Roles(E_Role.SuperAdmin)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(+id)
  }

  @Roles(E_Role.SuperAdmin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Res() res: Response) {
    const response = await this.categoriesService.update(+id, updateCategoryDto);
    if(response) return res.status(HttpStatus.OK).json({"message" : "Categories information updated successfully"});
    return res.status(HttpStatus.NOT_FOUND).json({"error" : "The resource to be updated no longer exist"})
  }

  @Roles(E_Role.SuperAdmin)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.categoriesService.remove(+id);
    res.status(HttpStatus.OK).json({"message" : "Category details deleted successfully"});
  }
}

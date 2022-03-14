import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Roles } from '../../utils/decorators/roles.decorator';
import { Role as E_Role} from '../../utils/enum/role.enum';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Roles(E_Role.SuperAdmin)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() image: Express.Multer.File, @Body() createBlogDto: CreateBlogDto) {
    console.log(image);
    return this.blogsService.create(createBlogDto, image);
  }
  
  @Roles(E_Role.SuperAdmin)
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Roles(E_Role.SuperAdmin)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findOne(+id)
  }

  @Roles(E_Role.SuperAdmin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @Res() res: Response) {
    const response = await this.blogsService.update(+id, updateBlogDto);
    if(response) return res.status(HttpStatus.OK).json({"message" : "Blog information updated successfully"});
    return res.status(HttpStatus.NOT_FOUND).json({"error" : "The resource to be updated no longer exist"})
  }

  @Roles(E_Role.SuperAdmin)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.blogsService.remove(+id);
    res.status(HttpStatus.OK).json({"message" : "Blog details deleted successfully"});
  }

  // @Get('post-image/:imgpath')
  //   async seeUploadedImage(@Param('imgpath') image, @Res() res) {
  //     await this.blogsService.get().pipe(res);
  //       return res.sendFile(image, { root: './files/post-images' });
  //    }
}

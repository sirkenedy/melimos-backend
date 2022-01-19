import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles as Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [TypeOrmModule, RolesService],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}

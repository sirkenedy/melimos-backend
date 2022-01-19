import { RolesService } from './../../components/roles/roles.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles  } from '../decorators/roles.decorator';
// import { RolesService } from 'src/components/roles/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private rolesService: RolesService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const Role = await this.rolesService.findAll()
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
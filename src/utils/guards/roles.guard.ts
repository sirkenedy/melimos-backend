import { RolesService } from './../../components/roles/roles.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles  } from '../decorators/roles.decorator';
import { AuthService } from '../../components/auth/auth.service';
// import { RolesService } from 'src/components/roles/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private rolesService: RolesService,
    private authService: AuthService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const  req   = context.switchToHttp().getRequest(); 
    const tokenArray = req.headers.authorization;
    if (tokenArray) {
      req.user = this.authService.decodeToken(tokenArray.split(" ")[1]).user;
    }
    return requiredRoles.some((role) => req.user?.roles?.includes(role));
  }
}
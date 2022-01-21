import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../../utils/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, 
    private jwtService: JwtService,
    private rolesService: RolesService
    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({"email":email});
    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
        user : {
            id: user.user.id, 
            email: user.user.email, 
            name: user.user.name, 
            roles: user.user.roles, 
            created_at: user.user.created_at, 
            updated_at: user.user.updated_at 
        }
    };
    // console.log({payload});
    return {
      access_token: this.jwtService.sign(payload),
    };

  }

    async register(data) {
      const role = await this.rolesService.findOne({name: Role.User})
        data.password = await bcrypt.hash(data.password, 10);
        data.roles = [role];
        let response = await this.usersService.create(data).then(res => res);
        if (response) {
            const { password, ...result } = response;
            return result;
        }
    }

  decodeToken(token) : any {
    return this.jwtService.decode(token)
  }

  // private async generateToken(user) {
  //   const token = await this.jwtService.signAsync(user);
  //   return token;
  // }

  // private async hashPassword(password) {
  //     const hash = await bcrypt.hash(password, 10);
  //     return hash;
  // }

  // private async comparePassword(enteredPassword, dbPassword) {
  //     const match = await bcrypt.compare(enteredPassword, dbPassword);
  //     return match;
  // }
}
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
    if (user && this.comparePassword(user.password, await this.hashPassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({user}: any) {
    const payload = { 
        user : {
            id: user.id, 
            email: user.email, 
            name: user.name, 
            roles: user.roles.map((role) => role.name), 
            created_at: user.created_at, 
            updated_at: user.updated_at 
        }
    };
    return this.generateToken(payload)

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

  private generateToken(payload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async hashPassword(password) {
      const hash = await bcrypt.hash(password, 10);
      return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
      return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
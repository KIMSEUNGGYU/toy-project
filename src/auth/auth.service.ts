import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async vaildateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.find(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // jwt의 sign() 를 이용하여 access token 반환
  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }
}

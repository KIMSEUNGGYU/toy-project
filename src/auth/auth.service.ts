import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // username 을 통해 user 정보를 가져와 password 가 맞는지 확인
  // 일치시, password 를 제외한 user 정보를 반환
  async vaildateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.find(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

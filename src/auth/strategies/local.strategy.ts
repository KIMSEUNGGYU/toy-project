import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // passport-local 구성 옵션
    super();
  }

  // validate 메소드는 passport 에서 validate 라는 이름을 찾아 호출함.
  // 사용자가 존재하는지 확인 및 유효한지 확인 (username 과 password) 를 통해 검증
  // 유효하지 않으면 예외 던짐
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.vaildateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

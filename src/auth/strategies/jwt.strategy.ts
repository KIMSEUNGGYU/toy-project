import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from '../constants';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// jwtFromRequest : JWT 추출 방법을 제공합니다. Request의 Authorization 헤더에 토큰을 제공하는 방식입니다.
// ignoreExpiration : false라면 JWT가 만료되었는지 확인하고 만료되었다면 401 예외를 발생합니다.
// secretOrKey : 다칭키를 제공하는 옵션입니다.

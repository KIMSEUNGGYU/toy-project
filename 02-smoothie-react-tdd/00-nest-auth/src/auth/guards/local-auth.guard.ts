import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// passport 에서 제공하는 AuthGuard 를 이용하여 passport-local 패키지에서 제공하는 코드와연결
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

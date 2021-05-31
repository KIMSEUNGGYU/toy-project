import { Controller, Post, Req, UseGuards, Res, Body } from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 인증(username, password 검증)은 LocalAuthGuard 가 대신 해주고
  // LocalAuthGuard 가 통과되면, authSerivice 의 login() 함수를 통해 jwt 할당(sign)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('Authentication', token, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }
}

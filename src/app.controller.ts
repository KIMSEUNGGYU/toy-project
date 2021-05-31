import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  // 인증(username, password 검증)은 LocalAuthGuard 가 대신 해주고
  // LocalAuthGuard 가 통과되면, authSerivice 의 login() 함수를 통해 jwt 할당(sign)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('Authentication', token, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param() id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  @Post()
  async createUser(@Body() user: User) {
    await this.usersService.createNewUser(user);
  }
}

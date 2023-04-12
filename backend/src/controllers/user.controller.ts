import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  // @Post('register')
  // async registerUser(@Body() user: User): Promise<User> {
  //   return await this.userService.registerUser(user);
  // }
}

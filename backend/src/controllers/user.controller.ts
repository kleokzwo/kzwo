import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UserInterface } from 'src/entities/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  public async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserInterface,
  ): Promise<User> {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Get('address/:address')
  public async findByAddress(
    @Param('address') address: string,
  ): Promise<UserInterface> {
    console.log('addr >>>', address);
    return this.userService.findByAddress(address);
  }
}

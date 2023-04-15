import {
  Controller,
  // Request,
  Post,
  // UseGuards,
  Body,
  UnauthorizedException,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() user: { address: string; password: string }) {
    const result = await this.authService.login(user);
    if (!result) {
      throw new UnauthorizedException();
    }
    return result;
  }

  @Post('register')
  async register(@Body() createUserDto: any): Promise<{ accessToken: string }> {
    const { address, password } = createUserDto;
    const user = await this.authService.register(address, password);
    const accessToken = await this.authService.generateAccessToken(user);
    return { accessToken };
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUserById(id);
  }
}

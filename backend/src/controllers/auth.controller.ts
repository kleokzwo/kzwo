import {
  Controller,
  // Request,
  Post,
  // UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
// import { LocalAuthGuard } from 'src/auth/authGuard';
// import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

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
}

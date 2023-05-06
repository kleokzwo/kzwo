import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/services/auth.service';
// import { AuthService } from '../services/authSevice.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(address: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(address, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}

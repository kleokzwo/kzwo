import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/auth.controller';
import { LocalAuthGuard } from './authGuard';
// import { AuthService } from '../services/authSevice.service';
import { LocalStrategy } from './localStrategy';
import { jwtConstants } from './jwtConstant';
import { JwtStrategy } from './jwtStrategy';
import passport from 'passport';
import { UsersModule } from 'src/user.module';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  // constructor(
  //   private authService: AuthService,
  //   private jwtStrategy: JwtStrategy,
  // ) {
  //   passport.use(this.jwtStrategy);
  // }
}

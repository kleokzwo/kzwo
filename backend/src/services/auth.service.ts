// auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(address: string, password: string): Promise<User> {
    const user = await this.userService.findOneByAddress(address);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  public async login(user: any) {
    const validatedUser = await this.validateUser(user.address, user.password);
    console.log('validate >>', validatedUser);
    if (validatedUser) {
      const payload = { address: validatedUser.address };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  public async register(address: string, password: string): Promise<any> {
    const user = await this.userService.findOne(address);
    const saltRounds = 10;
    if (user) {
      throw new BadRequestException('Address already registered');
    }

    const hashedPassword = bcrypt.hash(password, saltRounds);
    const newUser = await this.userService.create({
      address,
      password: hashedPassword,
    });

    const payload = { address: newUser.address };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: 3600,
    };
  }
  public generateAccessToken(user: User): string {
    const JWT_SECRET_KEY = crypto.randomBytes(64).toString('hex');
    const payload = { username: user.address, sub: user.id };
    return sign(payload, JWT_SECRET_KEY, {
      expiresIn: 3600,
    });
  }
}
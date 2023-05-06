import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { TransferController } from './controllers/transfer.controller';
import { TransferService } from './services/transfer.service';
import { dataSourceOptions } from 'db/data-source';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions
    }),
    JwtModule.register({
      secret: 'secret123',
    }),
    AuthModule,
    UsersModule,
    PassportModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    TransferController
  ],
  providers: [AppService, TransferService],
})
export class AppModule { }

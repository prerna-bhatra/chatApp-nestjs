import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/users.module';
import { LocalStrategy } from './local.auth';
import { UserSchema } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'SPOOKYSECRET',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

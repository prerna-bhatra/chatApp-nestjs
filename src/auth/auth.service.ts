import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log({ username, password });
    const user = await this.usersService.getUser({
      username: username,
    });
    console.log('validate', user);
    if (!user) {
      return {
        isError: true,
      };
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      // throw new NotAcceptableException('could not find the user');
      return {
        isError: true,
      };
    }
    if (user && passwordValid) {
      return user;
    }
    return {
      isError: true,
    };
  }
  async login(user: any) {
    if (user.isError) {
      return {
        isError: true,
        err: 'wrong credentilas ',
      };
    } else {
      const payload = {
        username: user.username,
        sub: user._id,
        fullname: user.fullname,
      };
      return {
        isError: false,
        err: 'no error',
        result: this.jwtService.sign(payload),
      };
    }
  }
}

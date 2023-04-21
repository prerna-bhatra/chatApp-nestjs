import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { responseType } from 'src/interfaces';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('fullname') fullname: string,
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<responseType> {
    console.log({ username });
    const isExistsAlready = await this.usersService.getUser({
      username: username,
    });
    console.log({ isExistsAlready });
    if (isExistsAlready) {
      return {
        isError: true,
        err: 'Email Already Exists',
      };
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      fullname,
      username,
      hashedPassword,
    );
    return {
      isError: false,
      result: result,
      err: 'no error',
    };
  }

  @Get('/users')
  async findUsers(): Promise<User[]> {
    const result = await this.usersService.getUsers();
    return result;
  }
}

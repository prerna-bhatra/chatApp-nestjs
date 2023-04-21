import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(
    fullname: string,
    username: string,
    password: string,
  ): Promise<User> {
    return this.userModel.create({
      fullname,
      username,
      password,
    });
  }
  async getUser(query: object): Promise<User> {
    console.log({ query });
    return this.userModel.findOne(query);
  }
  async getUsers(): Promise<User[]> {
    return this.userModel.find({}, { password: 0 });
  }
}

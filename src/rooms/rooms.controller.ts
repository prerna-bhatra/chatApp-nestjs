import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './rooms.model';

@Controller('api/rooms')
export class RoomsController {
  constructor(@InjectModel(Room.name) private model: Model<Room>) {}

  @Get()
  async findAllRooms() {
    const rooms = await this.model.find();
    return {
      isError: false,
      err: 'no err',
      result: rooms,
    };
  }

  @Get()
  find(@Query('q') q) {
    if (q) return this.model.find({ name: { $regex: new RegExp(`.*${q}.*`) } });
    else return this.model.find();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.model.findById(id);
  }

  @Post()
  async save(@Body() item: Room) {
    const result = await this.model.create(item);
    console.log({ result });
    return {
      isError: false,
      err: 'no err',
      result,
    };
  }
}

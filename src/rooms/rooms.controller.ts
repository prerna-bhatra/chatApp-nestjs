import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './rooms.model';
import { AuthgaurdService } from 'src/authgaurd/authgaurd.service';

@Controller('api/rooms')
export class RoomsController {
  constructor(@InjectModel(Room.name) private model: Model<Room>) {}

  @UseGuards(AuthgaurdService)
  @Get()
  async findAllRooms() {
    const rooms = await this.model.find().sort({ _id: -1 });
    return {
      isError: false,
      err: 'no err',
      result: rooms,
    };
  }

  @UseGuards(AuthgaurdService)
  @Get()
  find(@Query('q') q) {
    if (q) return this.model.find({ name: { $regex: new RegExp(`.*${q}.*`) } });
    else return this.model.find();
  }

  @UseGuards(AuthgaurdService)
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.model.findById(id);
  }

  @UseGuards(AuthgaurdService)
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

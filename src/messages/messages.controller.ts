import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './messages.model';
import { AuthgaurdService } from 'src/authgaurd/authgaurd.service';

@Controller('api/messages')
export class MessagesController {
  constructor(
    @InjectModel(Message.name) private readonly model: Model<Message>,
  ) {}

  @UseGuards(AuthgaurdService)
  @Get('/:roomId')
  async findByRoomId(@Param('roomId') roomId: string) {
    try {
      console.log({ roomId });

      const result = await this.model.aggregate([
        {
          $match: {
            room: roomId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'owner',
            foreignField: '_id',
            as: 'msgOwner',
          },
        },
        // {
        //   $sort: { _id: 1 },
        // },
      ]);

      return {
        isError: false,
        err: 'no err',
        result,
      };
    } catch (error) {
      return {
        isError: false,
        err: 'no err',
      };
    }
  }

  @UseGuards(AuthgaurdService)
  @Get()
  find(@Query('where') where) {
    where = JSON.parse(where || '{}');
    return this.model.find(where).populate('owner').exec();
  }

  @UseGuards(AuthgaurdService)
  @Post()
  save(@Body() item: Message) {
    this.model.create(item);
  }
}

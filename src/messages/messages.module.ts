import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { Message, MessageSchema } from './messages.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      // { name: Room.name, schema: RoomSchema },
      // { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}

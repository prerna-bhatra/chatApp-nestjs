import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { Message, MessageSchema } from './messages.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthgaurdService } from 'src/authgaurd/authgaurd.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      // { name: Room.name, schema: RoomSchema },
      // { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthgaurdService],
  controllers: [MessagesController],
})
export class MessagesModule {}

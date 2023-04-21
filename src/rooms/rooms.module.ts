import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { Room, RoomSchema } from './rooms.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: Message.name, schema: MessageSchema },
      { name: Room.name, schema: RoomSchema },
      // { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [RoomsController],
})
export class RoomsModule {}

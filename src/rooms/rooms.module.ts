import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { Room, RoomSchema } from './rooms.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthgaurdService } from 'src/authgaurd/authgaurd.service';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      // { name: Message.name, schema: MessageSchema },
      { name: Room.name, schema: RoomSchema },
      // { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthgaurdService],
  controllers: [RoomsController],
})
export class RoomsModule {}

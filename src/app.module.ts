import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { MessagesGateway } from './messages/messages.gateway';
import { Message, MessageSchema } from './messages/messages.model';
import { Room, RoomSchema } from './rooms/rooms.model';
import { User, UserSchema } from './users/users.model';
import { AuthgaurdService } from './authgaurd/authgaurd.service';
import { JwtModule } from '@nestjs/jwt';
console.log('process.env.CHAT_DB', process.env.CHAT_DB);

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bhatraprerna1998:VLNvMFgERUMPjGiD@cluster0.jqkm6mn.mongodb.net/chat-app-nestjs?retryWrites=true&w=majority',
    ),
    JwtModule.register({
      secret: 'SPOOKYSECRET',
      // signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
    AuthModule,
    ChatModule,
    RoomsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessagesGateway, AuthgaurdService],
})
export class AppModule {}

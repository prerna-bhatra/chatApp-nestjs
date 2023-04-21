import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { Message } from './messages.model';
import { Room } from 'src/rooms/rooms.model';
import { User } from 'src/users/users.model';

@WebSocketGateway({ cors: '*:*' })
export class MessagesGateway implements OnGatewayDisconnect {
  constructor(
    @InjectModel(Message.name) private readonly messagesModel: Model<Message>,
    @InjectModel(Room.name) private readonly roomsModel: Model<Room>,
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleDisconnect(client: Socket) {
    const user = await this.usersModel.findOne({ clientId: client.id });
    if (user) {
      this.server.emit('users-changed', { user: user.fullname, event: 'left' });
      user.id = null;
      await this.usersModel.findByIdAndUpdate(user._id, user);
    }
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(
    client: Socket,
    data: { nickname: string; roomId: string },
  ) {
    console.log('INSIDE ', { data });
    let user = await this.usersModel.findOne({ nickname: data.nickname });
    if (!user) {
      user = await this.usersModel.create({
        nickname: data.nickname,
        clientId: client.id,
      });
    } else {
      user.id = client.id;
      user = await this.usersModel.findByIdAndUpdate(user._id, user, {
        new: true,
      });
    }
    client.join(data.roomId);
    client.broadcast
      .to(data.roomId)
      .emit('users-changed', { user: user.fullname, event: 'joined' });
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(
    client: Socket,
    data: { nickname: string; roomId: string },
  ) {
    const user = await this.usersModel.findOne({ nickname: data.nickname });
    client.broadcast
      .to(data.roomId)
      .emit('users-changed', { user: user.fullname, event: 'left' });
    client.leave(data.roomId);
  }

  @SubscribeMessage('add-message')
  async addMessage(client: Socket, message: Message) {
    console.log('msg send ', { id: client.id, message });
    message.owner = await this.usersModel.findOne({ _id: message.ownerId });
    console.log({ owner: message.owner });
    message.created = new Date();
    message = await this.messagesModel.create(message);

    console.log('created ', message);
    const result = {
      text: message.text,
      owner: message.owner,
      created: message.created,
      room: message.room,
      msgOwner: [message.owner],
    };
    console.log({ result, OWNER: message.owner });
    this.server.in(message.room as string).emit('message', result);
  }
}

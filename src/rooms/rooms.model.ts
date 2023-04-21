import { ObjectId } from 'bson';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Message } from 'src/messages/messages.model';
import { User } from 'src/users/users.model';

@Schema()
export class Room {
  _id: ObjectId | string;

  @Prop({ required: true, maxlength: 20, minlength: 5 })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Message[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  connectedUsers: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);

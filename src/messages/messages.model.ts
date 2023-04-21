import { ObjectId } from 'bson';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/users.model';
import { Room } from 'src/rooms/rooms.model';

@Schema()
export class Message {
  _id: ObjectId | string;

  ownerId?: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  created: Date;

  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  owner: User;

  @Prop({ required: true, ref: 'Room', type: Types.ObjectId })
  room: Room | string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

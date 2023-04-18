import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
console.log('process.env.CHAT_DB', process.env.CHAT_DB);

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bhatraprerna1998:VLNvMFgERUMPjGiD@cluster0.jqkm6mn.mongodb.net/chat-app-nestjs?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

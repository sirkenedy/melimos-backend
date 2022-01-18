import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './components/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env'
    }), 
    TypeOrmModule.forRoot(), UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

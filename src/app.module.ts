import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Unique } from './validators/unique';
import { Exist } from './validators/exist';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './components/users/users.module';
import { RolesModule } from './components/roles/roles.module';
import { AuthModule } from './components/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RolesGuard } from './utils/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal : true
    }), 
    
    TypeOrmModule.forRoot(), UsersModule, RolesModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, Unique, Exist, {
    provide: APP_INTERCEPTOR,
    useClass: AuthInterceptor,
  }, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
],
})
export class AppModule {}

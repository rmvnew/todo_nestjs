
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/shared/auth.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './components/user/user.module';
import { ProfileModule } from './components/profile/profile.module';
import { TodoModule } from './components/todo/todo.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProfileModule,
    TodoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

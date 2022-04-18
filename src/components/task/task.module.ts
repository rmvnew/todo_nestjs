import { Module } from '@nestjs/common';
import { TodoService } from './task.service';
import { TodoController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UserModule
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule { }

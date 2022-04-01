import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    ProfileModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

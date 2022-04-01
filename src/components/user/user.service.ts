import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from 'src/common/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const user = this.userRepository.create(createUserDto)

    user.isActive = true

    user.name = Utils.getInstance().getValidName(user.name)

    user.password = await Utils.getInstance().encryptPassword(user.password)

    return this.userRepository.save(user)

  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number) {

    return this.userRepository.findOne({
      where: {
        id_user: id, isActive: true
      }
    })

  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const { name, password, email } = updateUserDto

    const isRegistered = await this.findOne(id)

    if (!isRegistered) {

      throw new BadRequestException('usuário não existe!!')

    }

    const user = await this.userRepository.preload({

      id_user: id,
      ...updateUserDto

    })

    if (name) {

      user.name = Utils.getInstance().getValidName(name)

    }

    if (password) {

      user.password = await Utils.getInstance().encryptPassword(password)

    }

    user.isActive = true

    return this.userRepository.save(user)
  }

  async remove(id: number) {

    const user = await this.findOne(id)

    if (!user) {

      throw new BadRequestException('usuário não existe!!')

    }

    user.isActive = false

    await this.userRepository.save(user)
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/common/enums';
import { Utils } from 'src/common/utils';
import { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUser } from './dto/filter.user';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const { id_profile } = createUserDto

    const user = this.userRepository.create(createUserDto)

    user.isActive = true

    user.name = Utils.getInstance().getValidName(user.name)

    const isRegistered = await this.findByName(user.name)

    if (isRegistered) {
      throw new BadRequestException('Usuário já cadastrado!!')
    }

    user.password = await Utils.getInstance().encryptPassword(user.password)

    const profile = await this.profileService.findOne(id_profile)

    if (!profile) {
      throw new NotFoundException('Perfil escolhido é inválido!!')
    }

    user.profile = profile

    return this.userRepository.save(user)

  }

  async findAll(filter : FilterUser): Promise<Pagination<User>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.userRepository.createQueryBuilder('inf')
    .leftJoinAndSelect('inf.profile','profile')
      .where('inf.is_active = true')

    if (name) {
      return paginate<User>(
        queryBuilder.where('inf.name like :name', { name: `%${name.toUpperCase()}%` })
          .andWhere('inf.is_active = true'), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.is_active = true')

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.create_at', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.is_active = true')

    } else {

      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.is_active = true')

    }

    return paginate<User>(queryBuilder, filter)
  }

  async findOne(id: number) {

    return this.userRepository.findOne({
      where: {
        id_user: id, isActive: true
      }
    })

  }

  async findByName(name: string): Promise<User> {
    return this.userRepository.findOne({
      where: { name, isActive: true }
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

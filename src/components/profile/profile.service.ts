import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) { }


  async create(createProfileDto: CreateProfileDto): Promise<Profile> {

    const profile = this.profileRepository.create(createProfileDto)


    return this.profileRepository.save(profile)
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find()
  }

  async findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: {
        id_profile: id, isActive: true
      }
    })
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {

    const isRegistered = this.findOne(id)

    if (!isRegistered) {
      throw new NotFoundException('profile não encontrada!!')
    }

    const profile = await this.profileRepository.preload({
      id_profile: id,
      ...updateProfileDto
    })

    await this.profileRepository.save(profile)

    return this.findOne(id)
  }

  async remove(id: number) {

    const profile = await this.findOne(id)

    if (!profile) {
      throw new NotFoundException('profile não encontrada!!')
    }

    profile.isActive = false

    await this.profileRepository.save(profile)

  }
}

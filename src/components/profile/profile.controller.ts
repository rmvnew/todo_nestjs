import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profiles')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  async create(
    @Body() createProfileDto: CreateProfileDto
  ): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<Profile> {
    return this.profileService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ): Promise<Profile> {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FilterUser } from './dto/filter.user';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';


@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findAll(
    @Query() filter: FilterUser
  ): Promise<Pagination<User>> {

    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit

    return this.userService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findOne(
    @Param('id') id: string
  ): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

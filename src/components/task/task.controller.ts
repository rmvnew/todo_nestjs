import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTodoDto } from './dto/create-task.dto';
import { UpdateTodoDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly todoService: TaskService) { }

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Put(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}

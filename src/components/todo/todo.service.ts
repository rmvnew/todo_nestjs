import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from 'src/common/utils';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly userService: UserService
  ) { }


  async create(createTodoDto: CreateTodoDto): Promise<Todo> {

    const { deadline, id_user } = createTodoDto

    const todo = this.todoRepository.create(createTodoDto)

    todo.deadline = Utils.getInstance().getDate(deadline)

    todo.task = Utils.getInstance().getValidName(todo.task)

    const user = await this.userService.findOne(id_user)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!')
    }

    todo.user = user

    todo.status = true

    return this.todoRepository.save(todo)
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: {
        status: true
      }
    })
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({
      where: {
        id_todo: id, status: true
      }
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {

    const isRegistered = this.findOne(id)
    if (!isRegistered) {
      throw new NotFoundException('task não existe')
    }

    const todo = await this.todoRepository.preload({
      id_todo: id,
      ...updateTodoDto
    })



    return this.todoRepository.save(todo)
  }

  async remove(id: number) {

    const todo = await this.findOne(id)
    if (!todo) {
      throw new NotFoundException('task não existe')
    }

    await this.todoRepository.remove(todo)
  }
}

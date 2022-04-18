import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusTasks } from 'src/common/enums';
import { Utils } from 'src/common/utils';
import { Not, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './dto/create-task.dto';
import { UpdateTodoDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Task)
    private readonly todoRepository: Repository<Task>,
    private readonly userService: UserService
  ) { }


  async create(createTodoDto: CreateTodoDto): Promise<Task> {

    const { deadline, id_user } = createTodoDto

    const todo = this.todoRepository.create(createTodoDto)

    todo.deadline = Utils.getInstance().getDate(deadline)

    todo.task = Utils.getInstance().getValidName(todo.task)

    const user = await this.userService.findOne(id_user)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!')
    }

    todo.user = user

  

    return this.todoRepository.save(todo)
  }

  async findAll(): Promise<Task[]> {
    return await this.todoRepository.find({
      where: {
        status: Not(StatusTasks.DONE)
      }
    })
  }

  async findOne(id: number): Promise<Task> {
    return await this.todoRepository.findOne({
      where: {
        id_todo: id, status: Not(StatusTasks.DONE)
      }
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Task> {

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

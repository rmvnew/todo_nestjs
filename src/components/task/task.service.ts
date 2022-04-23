import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusTasks } from 'src/common/enums';
import { Utils } from 'src/common/utils';
import { Not, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './dto/create-task.dto';
import { UpdateTodoDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly userService: UserService
  ) { }


  async create(createTodoDto: CreateTodoDto): Promise<TaskEntity> {

    const { deadline, id_user } = createTodoDto

    const task = this.taskRepository.create(createTodoDto)

    task.deadline = Utils.getInstance().getDate(deadline)

    task.task_name = Utils.getInstance().getValidName(task.task_name)

    Utils.getInstance().verifyLength(task.task_name,4,20)

    const user = await this.userService.findOne(id_user)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!')
    }

    task.user = user



    return this.taskRepository.save(task)
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find({
      where: {
        status: Not(StatusTasks.DONE)
      }
    })
  }

  async findOne(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({
      where: {
        id_task: id, status: Not(StatusTasks.DONE)
      }
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TaskEntity> {

    const isRegistered = this.findOne(id)
    if (!isRegistered) {
      throw new NotFoundException('task não existe')
    }

    const todo = await this.taskRepository.preload({
      id_task: id,
      ...updateTodoDto
    })



    return this.taskRepository.save(todo)
  }

  async remove(id: number) {

    const todo = await this.findOne(id)
    if (!todo) {
      throw new NotFoundException('task não existe')
    }

    await this.taskRepository.remove(todo)
  }
}

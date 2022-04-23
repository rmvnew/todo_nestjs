import { StatusTasks, Typepriority } from "src/common/enums";
import { User } from "src/components/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('task')
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id_task: number

    @Column()
    task_name: string

    @Column('timestamp')
    deadline: Date

    @Column({
        type: 'enum',
        enum: Typepriority,
        default: Typepriority.MIDDLE
    })
    priority: Typepriority

    @Column({
        type: 'enum',
        enum: StatusTasks,
        default: StatusTasks.TO_DO
    })
    status: StatusTasks

    @CreateDateColumn({ name: 'create_at' })
    create_at: string

    @UpdateDateColumn({ name: 'update_at' })
    update_at: string

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'id_user' })
    user: User

    // constructor(task?: Partial<TaskEntity>) {
    //     this.id_task = task?.id_task
    //     this.task = task?.task
    //     this.deadline = task?.deadline
    //     this.priority = task?.priority
    //     this.status = task?.status
    //     this.createAt = task?.createAt
    //     this.updateAt = task?.updateAt
    // }

}

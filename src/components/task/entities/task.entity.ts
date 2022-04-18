import { StatusTasks, Typepriority } from "src/common/enums";
import { User } from "src/components/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('task')
export class Task {

    @PrimaryGeneratedColumn()
    id_todo: number

    @Column()
    task: string

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
    createAt: string

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: string

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'id_user' })
    user: User

}

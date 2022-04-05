import { User } from "src/components/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('todo')
export class Todo {


    @PrimaryGeneratedColumn()
    id_todo: number

    @Column()
    task: string

    @Column('timestamp')
    deadline: Date

    @Column()
    status: boolean

    @CreateDateColumn({ name: 'create_at' })
    createAt: string

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: string

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn({name:'id_user'})
    user: User

}

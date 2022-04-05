import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

}

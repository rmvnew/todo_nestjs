import { Profile } from "src/components/profile/entities/profile.entity";
import { Todo } from "src/components/todo/entities/todo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ select: false })
    password: string

    @Column({ name: 'is_active' })
    isActive: boolean

    @CreateDateColumn({ name: 'create_at' })
    createAt: string

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: string

    @ManyToOne(() => Profile, (profile) => profile.users)
    @JoinColumn({ name: 'id_profile' })
    profile: Profile

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[]


}

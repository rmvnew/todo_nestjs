import { User } from "src/components/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('profile')
export class Profile {

    @PrimaryGeneratedColumn()
    id_profile: number

    @Column()
    name: string

    @Column({ name: 'is_active' })
    isActive: boolean

    @CreateDateColumn({ name: 'create_at' })
    createAt: string

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: string

    @OneToMany(() => User, (user) => user.profile)
    users: User[]

}

import { Profile } from "src/components/profile/entities/profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    name: string

    @Column()
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


}

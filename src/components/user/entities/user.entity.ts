import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({name:'is_active'})
    isActive: boolean

    @CreateDateColumn({name:'create_at'})
    createAt: string

    @UpdateDateColumn({name:'update_at'})
    updateAt: string


}

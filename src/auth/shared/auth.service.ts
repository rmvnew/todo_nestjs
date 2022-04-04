/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt'
import { UserService } from 'src/components/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }


    async validateUser(userEmail: string, userPassword: string) {

        const user = await this.userService.findByEmail(userEmail)

        // console.log(user)
        // console.log('Senha digitada: ',userPassword)
        // console.log('Senha do banco: ',user.password)

        if (user && this.checkPassword(userPassword,user.password)) {
            const { id_user, name, email } = user
            return { id_user, name, email }
        }
        return null

    }

    async checkPassword(password: string, passwordHash: string):Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}

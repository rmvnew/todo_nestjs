import { BadRequestException } from "@nestjs/common"
import * as bcrypt from 'bcrypt'

export class Utils {

    private static instance: Utils
    private constructor() { }
    public static getInstance(): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils();
        }
        return Utils.instance;
    }

    getValidName(name: string) {

        let currentName = name.toUpperCase();

        currentName = currentName.replace(/\s+/g, ' ');
        currentName = currentName.replace(/[0-9]/g, '');

        if (this.validateRegex(/[!@#$%^&*(),.?":{}|<>]/g, currentName)) {
            throw new BadRequestException('O nome não pode conter caracteres especiais!!');
        }

        if (currentName.length < 10 || currentName.length > 50) {
            throw new BadRequestException('Nome deve ter entre 10 a 40 caracteres!!')
        }

        return currentName;
    }

    getValidateEmail(email: string) {
        if (!this.validateRegex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i, email)) {
            throw new BadRequestException('O email informado não é válido!!')
        }
    }

    private validateRegex(regex: RegExp, value: string): boolean {
        return regex.test(value);
    }

    async encryptPassword(pass: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(pass, saltOrRounds)
    }

}
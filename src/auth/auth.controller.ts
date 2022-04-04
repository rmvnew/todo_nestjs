/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';

@ApiTags('Login')
@Controller()
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(
        // @Request() req: any
        @Body() login: LoginDto
    ) {
        return this.authService.login(login)
    }

}

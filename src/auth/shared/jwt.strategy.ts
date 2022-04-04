import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { jwtconstants } from './constants'



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: process.env.SECRET_KEY
            secretOrKey: jwtconstants.secret
        })
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email }
    }
}
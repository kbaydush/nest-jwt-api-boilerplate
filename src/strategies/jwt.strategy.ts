import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserDto } from '../modules/user/dto/UserDto';
import { UserService } from '../modules/user/user.service';

export interface AccessTokenPayload {
    sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private users: UserService;

    public constructor(users: UserService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '<SECRET KEY>',
            signOptions: {
                expiresIn: '30m',
            },
        });

        this.users = users;
    }

    async validate(payload: AccessTokenPayload): Promise<UserDto> {
        const { sub: id } = payload;
        console.log(payload)
        const user = await this.users.findForId(id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}

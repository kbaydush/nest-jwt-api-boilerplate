import {
    Body,
    Controller,
    Get, HttpCode, HttpStatus,
    Post,
    Req,
    UnauthorizedException,
    UseGuards, UsePipes,
} from '@nestjs/common';

// @ts-ignore
import { JWTGuard } from '../../guards/auth.guard';
import { UserDto } from '../user/dto/UserDto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ApiOkResponse } from "@nestjs/swagger";
import { AuthPayloadDto, IAuthPayload } from "./dto/LoginPayloadDto";
import { LoginRequestDto, RefreshRequestDto, RegisterRequestDto } from "./dto/RequestDto";
import { ValidationPipe } from "../../common/validation.pipe";

@Controller('/auth')
export class AuthController {
    private readonly users: UserService;
    private readonly tokens: AuthService;

    public constructor(users: UserService, tokens: AuthService) {
        this.users = users;
        this.tokens = tokens;
    }


    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: AuthPayloadDto,
        description: 'User info with access token',
    })
    @UsePipes(new ValidationPipe())
    public async login(@Body() body: LoginRequestDto): Promise<AuthPayloadDto> {
        const { username, password } = body;

        const user = await this.users.findForUsername(username);

        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }

        const valid = user
            ? await this.users.validateCredentials(user, password)
            : false;

        if (!valid) {
            throw new UnauthorizedException('The login is invalid');
        }

        const token = await this.tokens.generateAccessToken(user);
        const refresh = await this.tokens.generateRefreshToken(
            user,
            60 * 60 * 24 * 30,
        );

        const payload: IAuthPayload = this.buildResponsePayload(user, token, refresh);

        return {
            status: 'success',
            data: payload,
        } as AuthPayloadDto;
    }

    @Post('/register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: AuthPayloadDto,
        description: 'User info with access token',
    })
    @UsePipes(new ValidationPipe())
    public async register(@Body() body: RegisterRequestDto): Promise<AuthPayloadDto> {
        const user = await this.users.createUserFromRequest(body);

        const token = await this.tokens.generateAccessToken(user);
        const refresh = await this.tokens.generateRefreshToken(
            user,
            60 * 60 * 24 * 30,
        );

        const payload = this.buildResponsePayload(user, token, refresh);

        return {
            status: 'success',
            data: payload,
        } as AuthPayloadDto;
    }

    @Post('/refresh')
    public async refresh(@Body() body: RefreshRequestDto): Promise<AuthPayloadDto> {
        const {
            user,
            token,
        } = await this.tokens.createAccessTokenFromRefreshToken(
            body.refresh_token,
        );

        const payload = this.buildResponsePayload(user, token);

        return {
            status: 'success',
            data: payload,
        } as AuthPayloadDto;
    }

    @Get('/me')
    @UseGuards(JWTGuard)
    public async getUser(@Req() request) {
        const userId = request.user.id;

        const user = await this.users.findForId(userId);

        return {
            status: 'success',
            data: user,
        };
    }

    private buildResponsePayload(
        user: UserDto,
        accessToken: string,
        refreshToken?: string,
    ): IAuthPayload {
        return {
            user,
            payload: {
                type: 'bearer',
                token: accessToken,
                ...(refreshToken ? {refresh_token: refreshToken} : {}),
            },
        };
    }
}

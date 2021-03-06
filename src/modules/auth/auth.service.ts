// app/modules/authentication/tokens.service.ts

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { ContextService } from '../../providers/context.service';
import { UserDto } from '../user/dto/UserDto';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthEntity } from './auth.entity';
import { AuthRepository } from './auth.repository';

const BASE_OPTIONS: SignOptions = {
    issuer: 'https://localhost',
    audience: 'https://localhost',
};

export interface RefreshTokenPayload {
    jti: number;
    sub: number;
}

@Injectable()
export class AuthService {
    private readonly tokens: AuthRepository;
    private readonly users: UserRepository;
    private readonly jwt: JwtService;

    public constructor(
        tokens: AuthRepository,
        users: UserRepository,
        jwt: JwtService,
    ) {
        this.tokens = tokens;
        this.users = users;
        this.jwt = jwt;
    }

    public async generateAccessToken(user: UserEntity): Promise<string> {
        const opts: SignOptions = {
            ...BASE_OPTIONS,
            subject: String(user.id),
        };

        return this.jwt.signAsync({}, opts);
    }

    public async generateRefreshToken(
        user: UserDto,
        expiresIn: number,
    ): Promise<string> {
        const token = await this.tokens.createRefreshToken(user, expiresIn);

        const opts: SignOptions = {
            ...BASE_OPTIONS,
            expiresIn,
            subject: String(user.id),
            jwtid: String(token.id),
        };

        return this.jwt.signAsync({}, opts);
    }

    public async resolveRefreshToken(
        encoded: string,
    ): Promise<{ user: UserEntity; token: AuthEntity }> {
        const payload = await this.decodeRefreshToken(encoded);
        const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

        if (!token) {
            throw new UnprocessableEntityException('Refresh token not found');
        }

        if (token.isRevoked) {
            throw new UnprocessableEntityException('Refresh token revoked');
        }

        const user = await this.getUserFromRefreshTokenPayload(payload);

        if (!user) {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        return { user, token };
    }

    public async createAccessTokenFromRefreshToken(
        refresh: string,
    ): Promise<{ token: string; user: UserEntity }> {
        const { user } = await this.resolveRefreshToken(refresh);

        const token = await this.generateAccessToken(user);

        return { user, token };
    }

    private async decodeRefreshToken(
        token: string,
    ): Promise<RefreshTokenPayload> {
        try {
            return this.jwt.verifyAsync(token);
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                throw new UnprocessableEntityException('Refresh token expired');
            }
            throw new UnprocessableEntityException('Refresh token malformed');
        }
    }

    private async getUserFromRefreshTokenPayload(
        payload: RefreshTokenPayload,
    ): Promise<UserEntity | null> {
        const subId = payload.sub;

        if (!subId) {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        return this.users.findForId(subId);
    }

    private async getStoredTokenFromRefreshTokenPayload(
        payload: RefreshTokenPayload,
    ): Promise<AuthEntity | null> {
        const tokenId = payload.jti;

        if (!tokenId) {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        return this.tokens.findTokenById(tokenId);
    }

    static setAuthUser(user: UserEntity) {
        ContextService.set('<SECRET KEY>', user);
    }

    static getAuthUser(): UserEntity {
        return ContextService.get('<SECRET KEY>');
    }
}

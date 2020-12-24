import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MapperService } from '../../shared/mapper/mapper.service';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { ConfigService } from "../../shared/services/config.service";

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [AuthModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET_KEY'),
                signOptions: {
                    expiresIn: '30m',
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([AuthRepository]),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, MapperService],
    exports: [
        AuthService,
        MapperService,
    ],
})
export class AuthModule {}

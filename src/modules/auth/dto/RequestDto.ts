import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'A username is required' })
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'A password is required to login' })
    readonly password: string;
}

export class RegisterRequestDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'An username is required' })
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'A password is required' })
    @MinLength(6, { message: 'Your password must be at least 6 characters' })
    readonly password: string;
}

export class RefreshRequestDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'The refresh token is required' })
    readonly refresh_token: string;
}

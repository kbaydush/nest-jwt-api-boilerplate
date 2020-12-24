import { UserDto } from "../../user/dto/UserDto";
import { ApiProperty } from "@nestjs/swagger";

export interface IPayload {
    type: string;
    token: string;
    refresh_token?: string;
}

export interface IAuthPayload {
    user: UserDto;
    payload: IPayload
}

export interface ILoginPayload {
    status: string,
    data: IAuthPayload
}

export class AuthPayloadDto {
    @ApiProperty()
    status: string;
    @ApiProperty()
    data: IAuthPayload
}

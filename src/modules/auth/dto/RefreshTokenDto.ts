'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';

export class AuthDto extends AbstractDto {
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    is_revoked: boolean;

    @ApiProperty()
    expires: Date;
}

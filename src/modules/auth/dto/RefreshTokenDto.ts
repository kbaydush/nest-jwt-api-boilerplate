'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { AuthEntity } from '../auth.entity';

export class AuthDto extends AbstractDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    isRevoked: boolean;

    @ApiProperty()
    expires: Date;

    constructor(auth: AuthEntity) {
        super(auth);
        this.userId = auth.userId;
        this.isRevoked = auth.isRevoked;
        this.expires = auth.expires;
    }
}

import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { AuthDto } from './dto/RefreshTokenDto';

@Entity({ name: 'refresh_token' })
export class AuthEntity extends AbstractEntity<AuthDto> {
    @Column({ nullable: true })
    userId: string;

    @Column({ nullable: true })
    isRevoked: boolean;

    @Column({ nullable: false })
    expires: Date;

    dtoClass = AuthDto;
}

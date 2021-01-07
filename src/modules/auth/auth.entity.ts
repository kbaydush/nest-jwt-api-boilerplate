import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { AuthDto } from './dto/RefreshTokenDto';
import { UserEntity } from "../user/user.entity";

@Entity({ name: 'refresh_token' })
export class AuthEntity extends AbstractEntity<AuthDto> {
    @Column({ nullable: true })
    userId: string;

    @Column({ nullable: true })
    isRevoked: boolean;

    @Column({ nullable: false })
    expires: Date;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.tokens, {onDelete: 'CASCADE'})
    user: UserEntity;

    dtoClass = AuthDto;
}

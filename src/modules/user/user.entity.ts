import { Entity, Column, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { UserDto } from './dto/UserDto';
import { PasswordTransformer } from './password.transformer';
import { AuthEntity } from "../auth/auth.entity";

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
    @Column({ nullable: true, length: 255 })
    firstName: string;

    @Column({ nullable: true, length: 255 })
    lastName: string;

    @Column({ unique: true, nullable: false, length: 255 })
    username: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER})
    role: RoleType;

    @Column({ unique: true, nullable: true, length: 255 })
    email: string;

    @Column({ nullable: true, transformer: new PasswordTransformer(), length: 255 })
    password: string;

    @Column({ nullable: true, length: 255 })
    phone: string;

    @OneToMany(type => AuthEntity, token => token.user)
    tokens: AuthEntity;

    dtoClass = UserDto;
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { RegisterRequestDto } from '../auth/dto/RequestDto';
import { UserRepository } from '../user/user.repository';
import { UserDto } from './dto/UserDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    private readonly users: UserRepository;

    public constructor(users: UserRepository) {
        this.users = users;
    }

    public async validateCredentials(
        user: UserDto,
        password: string,
    ): Promise<boolean> {
        return await compare(password, user.password);
    }

    public async createUserFromRequest(
        request: RegisterRequestDto,
    ): Promise<UserEntity> {
        const { username, password } = request;

        const existingFromUsername = await this.findForUsername(
            request.username,
        );

        if (existingFromUsername) {
            throw new UnprocessableEntityException('Username already in use');
        }

        return this.users.createOne(username, password);
    }

    public async findForId(id: number): Promise<UserDto | null> {
        return await this.users.findForId(id);
    }

    public async findForUsername(username: string): Promise<UserEntity | null> {
        return this.users.findForUsername(username);
    }

    async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
        const queryBuilder = this.users.createQueryBuilder('user');
        const [users, usersCount] = (await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount()) as [UserEntity[], number];

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: usersCount,
        });
        return new UsersPageDto(users.toDtos(), pageMetaDto);
    }
}

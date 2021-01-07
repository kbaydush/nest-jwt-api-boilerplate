import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    public findForId(id: number): Promise<UserEntity | null> {
        return this.findOne({
            where: {
                id,
            },
        }) as Promise<UserEntity>;
    }

    public async findForUsername(username: string): Promise<UserEntity | null> {
        return this.findOne({
            where: {
                username: username
            },
        }) as Promise<UserEntity>;
    }

    public async createOne(
        username: string,
        password: string,
    ): Promise<UserEntity> {
        const user = new UserEntity();

        user.username = username;
        user.password = password;

        return this.save(user);
    }
}

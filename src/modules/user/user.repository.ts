import { hash } from 'bcrypt';
import { col, fn, where } from 'sequelize';
import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    public async findForId(id: number): Promise<UserEntity | null> {
        return this.findOne({
            where: {
                id,
            },
        });
    }

    public async findForUsername(username: string): Promise<UserEntity | null> {
        return this.findOne({
            where: {
                username: where(fn('lower', col('username')), username),
            },
        });
    }

    public async createOne(
        username: string,
        password: string,
    ): Promise<UserEntity> {
        const user = new UserEntity();

        user.username = username;
        user.password = await hash(password, 10);

        return this.save(user);
    }
}

import { EntityRepository, Repository } from 'typeorm';

import { UserDto } from '../user/dto/UserDto';
import { AuthEntity } from './auth.entity';

@EntityRepository(AuthEntity)
export class AuthRepository extends Repository<AuthEntity> {
    public async createRefreshToken(
        user: UserDto,
        ttl: number,
    ): Promise<AuthEntity> {
        const token = new AuthEntity();

        token.userId = user.id;
        token.isRevoked = false;

        const expiration = new Date();
        expiration.setTime(expiration.getTime() + ttl);

        token.expires = expiration;

        return this.save(token);
    }

    public async findTokenById(id: number): Promise<AuthEntity | null> {
        return this.findOne({
            where: {
                id,
            },
        }) as Promise<AuthEntity>;
    }
}

import { SessionStore } from '../../../../core/ports/session-storage/session-storage';
import { EntityId } from '../../../../core/entities/entity';
import { inject, injectable } from 'inversify';
import { INFRA_TYPES } from '../../../config/dependency-injection/inversify/di-types';
import { UserSession } from '../../../../core/modules/user/core/entities/session.model';
import { Redis } from 'ioredis';

@injectable()
export class SessionStorageRedis implements SessionStore {
    constructor(
        @inject(INFRA_TYPES.IORedis)
        private readonly redisDriver: Redis
    ) {}

    async get(sessionId: EntityId): Promise<UserSession | null> {
        const session = await this.redisDriver.get(sessionId);
        return !session ? session : JSON.parse(session);
    }

    async remove(sessionId: EntityId): Promise<void> {
        await this.redisDriver.del(sessionId);
    }

    async set(sessionId: EntityId, session: UserSession): Promise<void> {
        await this.redisDriver.set(sessionId, JSON.stringify(session));
    }
}

import { EntityId } from '../../../../entities/entity';

export interface UserSession {
    sessionId: EntityId;
    user: {
        id: EntityId;
        name: string;
        email: string;
    };
}

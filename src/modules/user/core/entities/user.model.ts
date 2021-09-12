import { EmailAddress } from '../../../../core/value-objects/emai/email';
import { NamedEntity } from '../../../../core/entities/entity';

interface User extends NamedEntity {
    email: EmailAddress;
    imageUrl: string;
}

export { User };

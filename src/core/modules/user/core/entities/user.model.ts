import { EmailAddress } from '../../../../value-objects/emai/email';
import { NamedEntity } from '../../../../entities/entity';

interface User extends NamedEntity {
    email: EmailAddress;
    imageUrl?: string;
    password: string;
}

export { User };

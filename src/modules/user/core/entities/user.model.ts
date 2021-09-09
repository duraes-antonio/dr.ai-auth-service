import { EmailAddress } from '../../../../core/value-objects/emai/email';

interface User {
    name: string;
    email: EmailAddress;
    imageUrl: string;
}

export { User };

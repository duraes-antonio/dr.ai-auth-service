import { UpdateUser } from '../../core/repositories/user.repository';
import {
    IUpdateUserCase as IUpdateUserCase,
    UpdateUserInput,
} from '../../core/use-cases/update-user';
import { FileStorage } from '../../../../../main/ports/file-storage/file-storage';

class UpdateUserCase implements IUpdateUserCase {
    constructor(
        private readonly updateUserRepository: UpdateUser,
        private readonly fileStorage: FileStorage
    ) {}

    async execute(input: UpdateUserInput): Promise<void> {
        if (!input) {
            return;
        }

        const { name, image } = input;
        let imageUrl: string | undefined;

        if (image) {
            imageUrl = await this.fileStorage.save(image);
        }

        return this.updateUserRepository({ name, imageUrl });
    }
}

export { UpdateUserCase };

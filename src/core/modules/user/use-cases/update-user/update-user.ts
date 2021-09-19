import {
    IUpdateUserCase as IUpdateUserCase,
    UpdateUserInput,
} from '../../core/use-cases/update-user';
import { FileStorage } from '../../../../ports/file-storage/file-storage';
import { UpdateUser } from '../../core/repositories/user.repository';

class UpdateUserCase implements IUpdateUserCase {
    constructor(
        private readonly updateUser: UpdateUser,
        private readonly fileStorage: FileStorage
    ) {}

    async execute(input: UpdateUserInput): Promise<void> {
        if (!input) {
            return;
        }

        const { id, name, image } = input;
        let imageUrl: string | undefined;

        if (image) {
            imageUrl = await this.fileStorage.save(image);
        }

        return this.updateUser.update({ id, name, imageUrl });
    }
}

export { UpdateUserCase };

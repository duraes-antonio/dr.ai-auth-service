import {
    IUpdateUserCase as IUpdateUserCase,
    UpdateUserInput,
} from '../../core/use-cases/update-user';
import { FileStorage } from '../../../../ports/file-storage/file-storage';
import { UpdateUser } from '../../core/repositories/user.repository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../../main/config/dependency-injection/inversify/di-types';

@injectable()
export class UpdateUserCase implements IUpdateUserCase {
    constructor(
        @inject(TYPES.UpdateUser) private updateUser: UpdateUser,
        @inject(TYPES.FileStorage) private fileStorage: FileStorage
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

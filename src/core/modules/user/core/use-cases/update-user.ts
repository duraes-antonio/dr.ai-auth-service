import { IFile } from '../../../../../__mocks__/adapters/file/file-storage.mock';
import { EntityId } from '../../../../entities/entity';

export type UpdateUserInput = {
    id: EntityId;
    name: string;
    image?: IFile;
};

export interface IUpdateUserCase {
    execute(input: UpdateUserInput): Promise<void>;
}

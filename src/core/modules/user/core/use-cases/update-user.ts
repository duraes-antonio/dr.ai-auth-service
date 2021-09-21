import { IFile } from '../../../../../__mocks__/adapters/file/file-storage.mock';

export type UpdateUserInput = {
    id: number;
    name: string;
    image?: IFile;
};

export interface IUpdateUserCase {
    execute(input: UpdateUserInput): Promise<void>;
}

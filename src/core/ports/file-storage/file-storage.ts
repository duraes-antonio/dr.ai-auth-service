import { IFile } from '../../../__mocks__/adapters/file/file-storage.mock';

export interface FileStorage {
    save(file: IFile): Promise<string>;

    delete(fileUrl: string): Promise<void>;
}

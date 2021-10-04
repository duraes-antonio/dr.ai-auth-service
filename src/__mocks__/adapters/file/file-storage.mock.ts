import { It, Mock } from 'moq.ts';
import { FileStorage } from '../../../core/ports/file-storage/file-storage';

// TODO: Move to right directory
export interface IFile {
    fieldname: string;
    mimetype: string;
    size: number;
    filename: string;
    buffer: Buffer;
}

export const imageMock: IFile = {
    buffer: Buffer.from([]),
    filename: 'mock.jpeg',
    mimetype: '',
    size: 100,
    fieldname: 'image',
};
export const imageUrl = `https://storage/${imageMock.filename}`;

export function factoryFileStorageMock(): FileStorage {
    return new Mock<FileStorage>()
        .setup((instance) => instance.save(It.Is((f) => f === imageMock)))
        .returns(Promise.resolve(imageUrl))
        .object();
}

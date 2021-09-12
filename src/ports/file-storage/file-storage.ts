export interface FileStorage {
    save(file: File): Promise<string>;

    delete(fileUrl: string): Promise<void>;
}

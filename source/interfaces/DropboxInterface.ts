import joinPath from "join-path";
import { FileSystemInterface } from "../FileSystemInterface";
import { registerInterface } from "../register";
import { DropboxInterfaceConfig, FileIdentifier, FileItem, PathIdentifier } from "../types";

export class DropboxInterface extends FileSystemInterface {
    dropboxClient: any;

    constructor(config: DropboxInterfaceConfig) {
        super(config);
        this.dropboxClient = config.dropboxClient;
    }

    /**
     * Delete a remote file
     * @param fileIdentifier The target identifier to delete
     * @returns A promise that resolves when deletion has
     *  completed
     */
    deleteFile(fileIdentifier: FileIdentifier): Promise<void> {
        return this.dropboxClient.deleteFile(fileIdentifier.identifier);
    }

    /**
     * Get remote directory contents
     * @param pathIdentifier Directory to fetch the contents
     *  of
     * @returns An array of resulting file items
     */
    getDirectoryContents(pathIdentifier?: PathIdentifier): Promise<Array<FileItem>> {
        const pathItem = pathIdentifier ? pathIdentifier.identifier : "/";
        return this.dropboxClient.getDirectoryContents(pathItem).then(contents =>
            contents.map(item => ({
                identifier: item.path,
                name: item.name,
                type: item.type,
                size: item.type === "directory" ? 0 : item.size,
                parent: pathIdentifier
            }))
        );
    }

    /**
     * Get remote file contents
     * @param pathIdentifier The file identifier to fetch the
     *  contents for
     * @returns A promise resolving with the file's contents
     */
    getFileContents(fileIdentifier: PathIdentifier): Promise<string> {
        return this.dropboxClient.getFileContents(fileIdentifier.identifier);
    }

    /**
     * Write remote file contents
     * @param parentPathIdentifier The parent path identifier
     * @param fileIdentifier The target file identifier
     * @param data File data
     * @returns A promise resolving with the identifier of
     *  the written file
     */
    putFileContents(
        parentPathIdentifier: PathIdentifier,
        fileIdentifier: FileIdentifier,
        data: string
    ): Promise<FileIdentifier> {
        const writePath = fileIdentifier.identifier
            ? fileIdentifier.identifier
            : joinPath(parentPathIdentifier.identifier, fileIdentifier.name);
        return this.dropboxClient.putFileContents(writePath, data).then(() => ({
            identifier: writePath,
            name: fileIdentifier.name
        }));
    }
}

registerInterface("dropbox", DropboxInterface);

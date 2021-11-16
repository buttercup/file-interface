import { FileIdentifier, FileItem, PathIdentifier } from "./types";

export class FileSystemInterface {
    constructor(config: { [key: string]: any }) {}

    /**
     * Delete a file
     * @param fileIdentifier The file identifier for deletion
     * @returns A promise that resolves after deletion
     */
    async deleteFile(fileIdentifier: FileIdentifier) {
        throw new Error("Not implemented");
    }

    /**
     * Get the contents of a directory
     * @param pathIdentifier The identifier of the path to get the
     *  contents of. Pass nothing to get root contents
     * @returns An array of file items that represent remote
     *  files and directories
     */
    async getDirectoryContents(pathIdentifier?: PathIdentifier): Promise<Array<FileItem>> {
        throw new Error("Not implemented");
    }

    /**
     * Get the file contents (text only)
     * @param fileIdentifier The file identifier to fetch for
     * @returns The file contents
     */
    async getFileContents(fileIdentifier: PathIdentifier): Promise<string> {
        throw new Error("Not implemented");
    }

    /**
     * Detect what features are supported by this interface
     * (returns things like "created", "mime", "modified")
     * @returns An array of supported feature slugs
     */
    getSupportedFeatures(): Array<string> {
        return [];
    }

    /**
     * Write a file to the storage system
     * @param parentPathIdentifier The parent path
     *  identifer that contains/will-contain the file
     * @param fileIdentifier The file identifier
     *  for the storage. `identifier` may be null to indicate a new
     *  file.
     * @param data The data to write
     * @returns Always returns a file identifier, which is useful
     *  when systems require `null` to indicate a new file -
     *  returned value will contain the new identifier.
     */
    async putFileContents(
        parentPathIdentifier: PathIdentifier,
        fileIdentifier: FileIdentifier,
        data: string
    ): Promise<FileIdentifier> {
        throw new Error("Not implemented");
    }
}

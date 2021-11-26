import { FileSystemInterface } from "../FileSystemInterface";
import { FileIdentifier, FileItem, GoogleDriveInterfaceConfig, PathIdentifier } from "../types";

export class GoogleDriveInterface extends FileSystemInterface {
    googleDriveClient: any;

    constructor(config: GoogleDriveInterfaceConfig) {
        super(config);
        this.googleDriveClient = config.googleDriveClient;
    }

    /**
     * Delete a remote file
     * @param fileIdentifier The remote file identifier to delete
     * @returns A promise that resolves once deletion is complete
     */
    deleteFile(fileIdentifier: FileIdentifier): Promise<void> {
        return this.googleDriveClient.deleteFile(fileIdentifier.identifier);
    }

    /**
     * Get remote directory contents
     * @param pathIdentifier The path identifier to get the
     *  contents of
     * @returns A promise resolving with the contents of the
     *  remote directory
     */
    getDirectoryContents(pathIdentifier?: PathIdentifier): Promise<Array<FileItem>> {
        const { identifier: parentID = null } = pathIdentifier || {};
        return this.googleDriveClient.getDirectoryContents({ tree: false }).then(files => {
            const selectedFiles = [];
            if (!parentID) {
                // Root dir
                const allIDs = files.map(file => file.id);
                files.forEach(file => {
                    // Shared files have no parents
                    if (file.shared && file.parents && file.parents.length === 0) {
                        selectedFiles.push(file);
                    } else {
                        file.parents.forEach(parentID => {
                            if (allIDs.indexOf(parentID) === -1) {
                                selectedFiles.push(file);
                            }
                        });
                    }
                });
            } else {
                // Sub dir
                files.forEach(file => {
                    if (file.parents.indexOf(parentID) >= 0) {
                        selectedFiles.push(file);
                    }
                });
            }
            return selectedFiles.map(file => ({
                identifier: file.id,
                name: file.filename,
                type: file.type,
                size: file.type === "directory" ? 0 : file.size,
                mime: file.mime,
                created: new Date(file.created).toUTCString(),
                modified: new Date(file.modified).toUTCString(),
                parent: pathIdentifier
            }));
        });
    }

    /**
     * Get remote file contents
     * @param pathIdentifier The identifer to fetch the contents of
     * @returns A promise resolving with the file's contents
     */
    getFileContents(fileIdentifier: PathIdentifier): Promise<string> {
        return this.googleDriveClient.getFileContents(fileIdentifier.identifier);
    }

    /**
     * The supported interface features
     * @see FileSystemInterface#getSupportedFeatures
     */
    getSupportedFeatures(): Array<string> {
        return [...super.getSupportedFeatures(), "created", "mime", "modified"];
    }

    /**
     * Create a new directory
     * @param parentPathIdentifier The parent path to create inside, or
     *  null to indicate the root
     * @param fileIdentifier The identifier to create
     * @returns The newly created directory identifier
     */
    async putDirectory(
        parentPathIdentifier: PathIdentifier | null,
        fileIdentifier: FileIdentifier
    ): Promise<FileIdentifier> {
        const options: {
            name: string;
            parent?: string;
        } = {
            name: fileIdentifier.name
        };
        if (parentPathIdentifier) {
            options.parent = parentPathIdentifier.identifier as string;
        }
        const folderID = await this.googleDriveClient.createDirectory(options);
        return {
            identifier: folderID,
            name: fileIdentifier.name
        };
    }

    /**
     * Write remote file contents
     * @param parentPathIdentifier The parent directory identifier
     * @param fileIdentifier The target file identifier
     * @param data File data
     * @returns A promise resolving with the file identifier written
     *  to
     */
    async putFileContents(
        parentPathIdentifier: PathIdentifier,
        fileIdentifier: FileIdentifier,
        data: string
    ): Promise<FileIdentifier> {
        const fileID = await this.googleDriveClient.putFileContents({
            id: fileIdentifier.identifier,
            parent: parentPathIdentifier.identifier,
            name: fileIdentifier.name,
            contents: data
        });
        return {
            identifier: fileID || fileIdentifier.identifier,
            name: fileIdentifier.name
        };
    }
}

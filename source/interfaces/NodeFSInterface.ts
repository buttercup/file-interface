import { Layerr } from "layerr";
import joinPath from "join-path";
import { FileSystemInterface } from "../FileSystemInterface.js";
import { FileIdentifier, FileItem, NodeFSInterfaceConfig, PathIdentifier } from "../types.js";

export class NodeFSInterface extends FileSystemInterface {
    fs: any;

    constructor(config: NodeFSInterfaceConfig) {
        super(config);
        this.fs = config.fs;
    }

    /**
     * Delete a local file
     * @param fileIdentifier The file identifier to delete
     * @returns A promise that resolves after deletion is complete
     */
    deleteFile(fileIdentifier: FileIdentifier): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.fs.unlink(fileIdentifier.identifier, (err?: Error) => {
                if (err) {
                    return reject(
                        new Layerr(err, `Failed to delete file: ${fileIdentifier.identifier}`)
                    );
                }
                resolve();
            });
        });
    }

    /**
     * Get local directory contents
     * @param pathIdentifier The path identifier to get the contents of
     * @returns An array of file items
     */
    getDirectoryContents(pathIdentifier?: PathIdentifier): Promise<Array<FileItem>> {
        const { identifier: dir = "/" } = pathIdentifier || {};
        const fetch = new Promise<Array<string>>((resolve, reject) => {
            this.fs.readdir(dir, (err: Error | null, filenames: Array<string>) => {
                if (err) {
                    return reject(new Layerr(err, `Error reading directory contents: ${dir}`));
                }
                resolve(filenames);
            });
        });
        return fetch.then(filenames =>
            this._filenamesToStats(dir as string, filenames).then(items =>
                items.map(item =>
                    Object.assign(item, {
                        parent: pathIdentifier
                    })
                )
            )
        );
    }

    /**
     * Get local file contents
     * @param pathIdentifier The target file path identifier
     * @returns The file contents
     */
    getFileContents(pathIdentifier: PathIdentifier): Promise<string> {
        const { identifier: filename } = pathIdentifier;
        return new Promise((resolve, reject) => {
            this.fs.readFile(filename, "utf8", (err, data) => {
                if (err) {
                    return reject(new Layerr(err, `Error reading file: ${filename}`));
                }
                resolve(data);
            });
        });
    }

    /**
     * @see FileSystemInterface#getSupportedFeatures
     */
    getSupportedFeatures() {
        return [...super.getSupportedFeatures(), "created", "modified"];
    }

    /**
     * Check if a path identifier matches the root
     * @param pathIdentifer The path identifier to check
     * @returns True if root, false otherwise
     */
    pathIdentifierIsRoot(pathIdentifer?: PathIdentifier): boolean {
        return !pathIdentifer || pathIdentifer?.identifier === "/";
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
        const dirPath = fileIdentifier.identifier
            ? fileIdentifier.identifier
            : parentPathIdentifier
            ? joinPath(parentPathIdentifier.identifier, fileIdentifier.name)
            : joinPath("/", fileIdentifier.name);
        await new Promise<void>((resolve, reject) => {
            this.fs.mkdir(dirPath, {}, (err?: Error) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        return {
            identifier: dirPath,
            name: fileIdentifier.name
        };
    }

    /**
     * Write local file contents
     * @param parentPathIdentifier The parent path identifier
     * @param fileIdentifier The file identifier to write to
     * @param data File data
     * @returns A promise that resolves with the identifier of the written file
     */
    putFileContents(
        parentPathIdentifier: PathIdentifier,
        fileIdentifier: FileIdentifier,
        data: string
    ): Promise<FileIdentifier> {
        const filename = fileIdentifier.identifier
            ? fileIdentifier.identifier
            : joinPath(parentPathIdentifier.identifier, fileIdentifier.name);
        return new Promise((resolve, reject) => {
            this.fs.writeFile(filename, data, err => {
                if (err) {
                    return reject(new Layerr(err, `Error writing file: ${filename}`));
                }
                resolve({
                    identifier: filename,
                    name: fileIdentifier.name
                });
            });
        });
    }

    protected _filenamesToStats(dir: string, filenames: Array<string>): Promise<Array<FileItem>> {
        return Promise.all(filenames.map(filename => this._stat(dir, filename)));
    }

    protected _stat(dir: string, filename: string): Promise<FileItem> {
        const fullPath = joinPath(dir, filename);
        return new Promise((resolve, reject) => {
            this.fs.stat(fullPath, (err, stat) => {
                if (err) {
                    return reject(new Layerr(err, `Failed getting file properties: ${filename}`));
                }
                const { ctime, mtime, size } = stat;
                const type = stat.isDirectory() ? "directory" : "file";
                const created = new Date(ctime).toUTCString();
                const modified = new Date(mtime).toUTCString();
                resolve({
                    identifier: fullPath,
                    name: filename,
                    type,
                    size: stat.isDirectory() ? 0 : size,
                    created,
                    modified
                });
            });
        });
    }
}

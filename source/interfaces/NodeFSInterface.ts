import { Layerr } from "verror";
import joinPath from "join-path";
import { FileSystemInterface } from "../FileSystemInterface";
import { registerInterface } from "../register";
import { FileIdentifier, FileItem, NodeFSInterfaceConfig, PathIdentifier } from "../types";

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

registerInterface("fs", NodeFSInterface);

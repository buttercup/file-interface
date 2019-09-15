const VError = require("verror");
const joinPath = require("join-path");
const FileSystemInterface = require("../FileSystemInterface.js");
const { registerInterface } = require("../register.js");

class NodeFSInterface extends FileSystemInterface {
    constructor(config) {
        super();
        this.fs = config.fs;
    }

    getDirectoryContents(pathIdentifier) {
        const { identifier: dir } = pathIdentifier;
        const fetch = new Promise((resolve, reject) => {
            this.fs.readdir(dir, (err, filenames) => {
                if (err) {
                    return reject(new VError(err, `Error reading directory contents: ${dir}`));
                }
                resolve(filenames);
            });
        });
        return fetch.then(filenames => this._filenamesToStats(dir, filenames));
    }

    getFileContents(pathIdentifier) {
        const { identifier: filename } = pathIdentifier;
        return new Promise((resolve, reject) => {
            this.fs.readFile(filename, "utf8", (err, data) => {
                if (err) {
                    return reject(new VError(err, `Error reading file: ${filename}`));
                }
                resolve(data);
            });
        });
    }

    getSupportedFeatures() {
        return [...super.getSupportedFeatures(), "created", "modified"];
    }

    putFileContents(parentPathIdentifier, fileIdentifier, data) {
        const filename = fileIdentifier.identifier;
        return new Promise((resolve, reject) => {
            this.fs.writeFile(filename, data, err => {
                if (err) {
                    return reject(new VError(err, `Error writing file: ${filename}`));
                }
                resolve({
                    identifier: filename,
                    name: fileIdentifier.name
                });
            });
        });
    }

    _filenamesToStats(dir, filenames) {
        return Promise.all(filenames.map(filename => this._stat(dir, filename)));
    }

    _stat(dir, filename) {
        const fullPath = joinPath(dir, filename);
        return new Promise((resolve, reject) => {
            this.fs.stat(fullPath, (err, stat) => {
                if (err) {
                    return reject(new VError(err, `Failed getting file properties: ${filename}`));
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

module.exports = NodeFSInterface;

const VError = require("verror");
const joinPath = require("join-path");
const FileSystemInterface = require("../FileSystemInterface.js");
const { registerInterface } = require("../register.js");

/**
 * @typedef {Object} NodeFSInterfaceConfig
 * @property {Object} fs - Reference to Node's fs API
 */

/**
 * Node's FS interface
 * @augments FileSystemInterface
 * @memberof module:FileInterface
 */
class NodeFSInterface extends FileSystemInterface {
    /**
     * Constructor for the interface
     * @param {NodeFSInterfaceConfig} config
     */
    constructor(config) {
        super();
        this.fs = config.fs;
    }

    /**
     * Get local directory contents
     * @param {PathIdentifier=} pathIdentifier
     * @returns {Promise.<Array.<FileItem>>}
     */
    getDirectoryContents(pathIdentifier) {
        const { identifier: dir = "/" } = pathIdentifier || {};
        const fetch = new Promise((resolve, reject) => {
            this.fs.readdir(dir, (err, filenames) => {
                if (err) {
                    return reject(new VError(err, `Error reading directory contents: ${dir}`));
                }
                resolve(filenames);
            });
        });
        return fetch.then(filenames =>
            this._filenamesToStats(dir, filenames).then(items =>
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
     * @param {PathIdentifier} pathIdentifier
     * @returns {Promise.<String>}
     */
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

    /**
     * @see FileSystemInterface#getSupportedFeatures
     */
    getSupportedFeatures() {
        return [...super.getSupportedFeatures(), "created", "modified"];
    }

    /**
     * Write local file contents
     * @param {PathIdentifier} parentPathIdentifier
     * @param {FileIdentifier} fileIdentifier
     * @param {String} data File data
     * @returns {Promise.<FileIdentifier>}
     */
    putFileContents(parentPathIdentifier, fileIdentifier, data) {
        const filename = fileIdentifier.identifier
            ? fileIdentifier.identifier
            : joinPath(parentPathIdentifier.identifier, fileIdentifier.name);
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

    /**
     * @protected
     */
    _filenamesToStats(dir, filenames) {
        return Promise.all(filenames.map(filename => this._stat(dir, filename)));
    }

    /**
     * @protected
     */
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

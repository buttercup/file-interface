const VError = require("verror");
const joinPath = require("join-path");
const FileSystemInterface = require("../FileSystemInterface.js");
const { registerInterface } = require("../register.js");

/**
 * @typedef {Object} DropboxInterfaceConfig
 * @property {Object} dropboxClient - Dropbox client
 *  instance
 */

/**
 * Dropbox interface
 * @augments FileSystemInterface
 * @memberof module:FileInterface
 */
class DropboxInterface extends FileSystemInterface {
    /**
     * Constructor for the interface
     * @param {DropboxInterfaceConfig} config
     */
    constructor(config) {
        super();
        this.dropboxClient = config.dropboxClient;
    }

    /**
     * Delete a remote file
     * @param {FileIdentifier} fileIdentifier
     * @returns {Promise}
     */
    deleteFile(fileIdentifier) {
        return this.dropboxClient.deleteFile(fileIdentifier.identifier);
    }

    /**
     * Get remote directory contents
     * @param {PathIdentifier=} pathIdentifier
     * @returns {Promise.<Array.<FileItem>>}
     */
    getDirectoryContents(pathIdentifier) {
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
     * @param {PathIdentifier} pathIdentifier
     * @returns {Promise.<String>}
     */
    getFileContents(fileIdentifier) {
        return this.dropboxClient.getFileContents(fileIdentifier.identifier);
    }

    /**
     * Write remote file contents
     * @param {PathIdentifier} parentPathIdentifier
     * @param {FileIdentifier} fileIdentifier
     * @param {String} data File data
     * @returns {Promise.<FileIdentifier>}
     */
    putFileContents(parentPathIdentifier, fileIdentifier, data) {
        const writePath = fileIdentifier.identifier
            ? fileIdentifier.identifier
            : joinPath(parentPathIdentifier.identifier, fileIdentifier.name);
        return this.dropboxClient
            .putFileContents(fileIdentifier.identifier, data)
            .then(() => fileIdentifier);
    }
}

registerInterface("dropbox", DropboxInterface);

module.exports = DropboxInterface;

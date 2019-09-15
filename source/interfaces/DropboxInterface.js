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
     * Get remote directory contents
     * @param {PathIdentifier} pathIdentifier
     * @returns {Promise.<Array.<FileItem>>}
     */
    getDirectoryContents(pathIdentifier) {
        return this.dropboxClient.getDirectoryContents(pathIdentifier.identifier).then(contents =>
            contents.map(item => ({
                identifier: item.path,
                name: item.name,
                type: item.type,
                size: item.type === "directory" ? 0 : item.size
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
        return this.dropboxClient
            .putFileContents(fileIdentifier.identifier, data)
            .then(() => fileIdentifier);
    }
}

registerInterface("dropbox", DropboxInterface);

module.exports = DropboxInterface;

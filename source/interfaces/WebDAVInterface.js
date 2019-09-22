const VError = require("verror");
const joinPath = require("join-path");
const FileSystemInterface = require("../FileSystemInterface.js");
const { registerInterface } = require("../register.js");

/**
 * @typedef {Object} WebDAVInterfaceConfig
 * @property {Object} webdavClient - WebDAV client
 *  instance
 */

/**
 * WebDAV interface
 * @augments FileSystemInterface
 * @memberof module:FileInterface
 */
class WebDAVInterface extends FileSystemInterface {
    /**
     * Constructor for the interface
     * @param {WebDAVInterfaceConfig} config
     */
    constructor(config) {
        super();
        this.webdavClient = config.webdavClient;
    }

    /**
     * Get remote directory contents
     * @param {PathIdentifier=} pathIdentifier
     * @returns {Promise.<Array.<FileItem>>}
     */
    getDirectoryContents(pathIdentifier) {
        const pathItem = pathIdentifier ? pathIdentifier.identifier : "/";
        return this.webdavClient.getDirectoryContents(pathItem).then(contents =>
            contents.map(item => ({
                identifier: item.filename,
                name: item.basename,
                type: item.type,
                size: item.type === "directory" ? 0 : item.size,
                modified: new Date(item.lastmod).toUTCString()
            }))
        );
    }

    /**
     * Get remote file contents
     * @param {PathIdentifier} pathIdentifier
     * @returns {Promise.<String>}
     */
    getFileContents(fileIdentifier) {
        return this.webdavClient.getFileContents(fileIdentifier.identifier, { format: "text" });
    }

    /**
     * @see FileSystemInterface#getSupportedFeatures
     */
    getSupportedFeatures() {
        return [...super.getSupportedFeatures(), "modified"];
    }

    /**
     * Write remote file contents
     * @param {PathIdentifier} parentPathIdentifier
     * @param {FileIdentifier} fileIdentifier
     * @param {String} data File data
     * @returns {Promise.<FileIdentifier>}
     */
    putFileContents(parentPathIdentifier, fileIdentifier, data) {
        const filename = fileIdentifier.identifier
            ? fileIdentifier.identifier
            : joinPath(parentPathIdentifier.identifier, fileIdentifier.name);
        return this.webdavClient
            .putFileContents(fileIdentifier.identifier, data)
            .then(() => fileIdentifier);
    }
}

registerInterface("webdav", WebDAVInterface);

module.exports = WebDAVInterface;

const VError = require("verror");
const joinPath = require("join-path");
const FileSystemInterface = require("../FileSystemInterface.js");
const { registerInterface } = require("../register.js");

/**
 * @typedef {Object} GoogleDriveInterfaceConfig
 * @property {Object} googleDriveClient - Google Drive client
 *  instance
 */

/**
 * Google Drive interface
 * @augments FileSystemInterface
 * @memberof module:FileInterface
 */
class GoogleDriveInterface extends FileSystemInterface {
    /**
     * Constructor for the interface
     * @param {GoogleDriveInterfaceConfig} config
     */
    constructor(config) {
        super();
        this.googleDriveClient = config.googleDriveClient;
    }

    /**
     * Get remote directory contents
     * @param {PathIdentifier=} pathIdentifier
     * @returns {Promise.<Array.<FileItem>>}
     */
    getDirectoryContents(pathIdentifier) {
        const { identifier: parentID = null } = pathIdentifier || {};
        return this.googleDriveClient.getDirectoryContents({ tree: false }).then(files => {
            const selectedFiles = [];
            if (!parentID) {
                // Root dir
                const allIDs = files.map(file => file.id);
                files.forEach(file => {
                    file.parents.forEach(parentID => {
                        if (allIDs.indexOf(parentID) === -1) {
                            selectedFiles.push(file);
                        }
                    });
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
     * @param {PathIdentifier} pathIdentifier
     * @returns {Promise.<String>}
     */
    getFileContents(fileIdentifier) {
        return this.googleDriveClient.getFileContents(fileIdentifier.identifier);
    }

    /**
     * @see FileSystemInterface#getSupportedFeatures
     */
    getSupportedFeatures() {
        return [...super.getSupportedFeatures(), "created", "mime", "modified"];
    }

    /**
     * Write remote file contents
     * @param {PathIdentifier} parentPathIdentifier
     * @param {FileIdentifier} fileIdentifier
     * @param {String} data File data
     * @returns {Promise.<FileIdentifier>}
     */
    putFileContents(parentPathIdentifier, fileIdentifier, data) {
        return this.googleDriveClient
            .putFileContents({
                id: fileIdentifier.identifier,
                parent: parentPathIdentifier.identifier,
                name: fileIdentifier.name,
                contents: data
            })
            .then(fileID => ({
                identifier: fileID || fileIdentifier.identifier,
                name: fileIdentifier.name
            }));
    }
}

registerInterface("googledrive", GoogleDriveInterface);

module.exports = GoogleDriveInterface;

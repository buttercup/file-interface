/**
 * @typedef {Object} FileItem
 * @property {String|Number} identifier - The item identifier, as
 *  recognised by the remote system/interface
 * @property {String} name - The friendly display name of the item
 * @property {String} type - The type of the item (file/directory)
 * @property {Number} size - Size, in bytes, of the item
 * @property {String=} mime - MIME type of the item
 * @property {String=} created - UTC date string that represents
 *  whenthe item was created
 * @property {String=} modified - UTC date string that represents
 *  when the item was last modified
 * @property {PathIdentifier=} parent - Parent identifier object,
 *  when available. If not set assume currently in root.
 */

/**
 * @typedef {Object} PathIdentifier
 * @property {String|Number} identifier - File system path identifier
 *  (usually path on directory-based systems, or an identifier on
 *  platforms such as Google Drive)
 * @property {String} name - File name for display (short)
 */

/**
 * @typedef {Object} FileIdentifier
 * @property {String|Number|null} identifier - File system file
 *  identifier (usually filename (full) on directory-based systems,
 *  or a file identifier on platforms such as Google Drive)
 * @property {String} name - File name (short)
 */

/**
 * Base interface definition
 * @memberof module:FileInterface
 */
module.exports = class FileSystemInterface {
    constructor() {}

    /**
     * Delete a file
     * @param {FileIdentifier} fileIdentifier The file identifier for
     *  deletion
     * @returns {Promise}
     */
    async deleteFile(fileIdentifier) {
        throw new Error("Not implemented");
    }

    /**
     * Get the contents of a directory
     * @param {PathIdentifier=} pathIdentifier The identifier of the
     *  path to get the contents of. Pass nothing to get root contents
     * @returns {Promise.<Array.<FileItem>>} An array of file items
     *  that represent remote files and directories
     */
    async getDirectoryContents(pathIdentifier) {
        throw new Error("Not implemented");
    }

    /**
     * Get the file contents (text only)
     * @param {FileIdentifier} fileIdentifier The file identifier to
     *  fetch for
     * @returns {Promise.<String>} The file contents
     */
    async getFileContents(fileIdentifier) {
        throw new Error("Not implemented");
    }

    /**
     * Detect what features are supported by this interface
     * (returns things like "created", "mime", "modified")
     * @returns {Array.<String>}
     */
    getSupportedFeatures() {
        return [];
    }

    /**
     * Write a file to the storage system
     * @param {PathIdentifier} parentPathIdentifier The parent path
     *  identifer that contains/will-contain the file
     * @param {FileIdentifier} fileIdentifier The file identifier
     *  for the storage. `identifier` may be null to indicate a new
     *  file.
     * @param {String} data The data to write
     * @returns {Promise.<FileIdentifier>} Always returns a file identifier,
     *  which is useful when systems require `null` to indicate
     *  a new file - returned value will contain the new identifier.
     */
    async putFileContents(parentPathIdentifier, fileIdentifier, data) {
        throw new Error("Not implemented");
    }
};

const VError = require("verror");
const joinPath = require("join-path");
const FileSystemInterface = require("../FileSystemInterface.js");
const { registerInterface } = require("../register.js");

class GoogleDriveInterface extends FileSystemInterface {
    constructor(config) {
        super();
        this.googleDriveClient = config.googleDriveClient;
    }

    getDirectoryContents(pathIdentifier) {
        const { identifier: parentID = null } = pathIdentifier;
        return this.googleDriveClient.getDirectoryContents({ tree: false }).then(files => {
            const selectedFiles = [];
            if (!parentID) {
                // Root dir
                const allIDs = files.map(file => file.id);
                files.forEach(file => {
                    file.parents.forEach(parentID => {
                        if (allIDs.indexOf(parentID) === -1 && rootIDs.indexOf(parentID) === -1) {
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
                created: new Date(file.createdTime).toUTCString(),
                modified: new Date(file.modifiedTime).toUTCString()
            }));
        });
    }

    getFileContents(fileIdentifier) {
        return this.googleDriveClient.getFileContents(fileIdentifier.identifier);
    }

    getSupportedFeatures() {
        return [...super.getSupportedFeatures(), "created", "mime", "modified"];
    }

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

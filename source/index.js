const FileSystemInterface = require("./FileSystemInterface.js");
const { getInterfaceReference, instantiateInterface, registerInterface } = require("./register.js");
const NodeFSInterface = require("./interfaces/NodeFSInterface.js");
const GoogleDriveInterface = require("./interfaces/GoogleDriveInterface.js");
const DropboxInterface = require("./interfaces/DropboxInterface.js");
const WebDAVInterface = require("./interfaces/WebDAVInterface.js");

/**
 * @module FileInterface
 */

module.exports = {
    DropboxInterface,
    FileSystemInterface,
    GoogleDriveInterface,
    NodeFSInterface,
    WebDAVInterface,
    getInterfaceReference,
    instantiateInterface,
    registerInterface
};

const FileSystemInterface = require("./FileSystemInterface.js");
const { getInterfaceReference, instantiateInterface, registerInterface } = require("./register.js");
const NodeFSInterface = require("./interfaces/NodeFSInterface.js");
const GoogleDriveInterface = require("./interfaces/GoogleDriveInterface.js");

/**
 * @module FileInterface
 */

module.exports = {
    FileSystemInterface,
    GoogleDriveInterface,
    NodeFSInterface,
    getInterfaceReference,
    instantiateInterface,
    registerInterface
};

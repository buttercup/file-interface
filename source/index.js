const FileSystemInterface = require("./FileSystemInterface.js");
const { getInterfaceReference, instantiateInterface, registerInterface } = require("./register.js");
const NodeFSInterface = require("./interfaces/NodeFSInterface.js");

module.exports = {
    FileSystemInterface,
    NodeFSInterface,
    getInterfaceReference,
    instantiateInterface,
    registerInterface
};

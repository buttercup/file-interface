const __registeredInterfaces = {};

function getInterfaceReference(id) {
    return __registeredInterfaces[id] || null;
}

function instantiateInterface(id, config) {
    const Interface = getInterfaceReference(id);
    if (!Interface) {
        throw new Error(`No interface found for ID: ${id}`);
    }
    return new Interface(config);
}

function registerInterface(id, classRef) {
    if (!!__registeredInterfaces[id]) {
        throw new Error(`Interface already registered for ID: ${id}`);
    }
    __registeredInterfaces[id] = classRef;
}

module.exports = {
    getInterfaceReference,
    instantiateInterface,
    registerInterface
};

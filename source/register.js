const __registeredInterfaces = {};

/**
 * Get the class reference for a registered interface
 * @param {String} id The interface identifier
 * @returns {Function|null}
 * @memberof module:FileInterface
 */
function getInterfaceReference(id) {
    return __registeredInterfaces[id] || null;
}

/**
 * Instantiate a new interface
 * @param {String} id The registered identifier
 * @param {Object} config Configuration object for the
 *  interface
 * @returns {Object} New interface instance
 * @throws {Error} Throws if no registered interface is
 *  found for the provided ID
 * @memberof module:FileInterface
 */
function instantiateInterface(id, config) {
    const Interface = getInterfaceReference(id);
    if (!Interface) {
        throw new Error(`No interface found for ID: ${id}`);
    }
    return new Interface(config);
}

/**
 * Register an interface reference for an ID
 * @param {String} id The identifier for the interface
 * @param {Function} classRef The class reference
 * @memberof module:FileInterface
 */
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

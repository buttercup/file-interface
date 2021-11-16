import { FileSystemInterface } from "./FileSystemInterface";

type RegisteredInterface = typeof FileSystemInterface;

const __registeredInterfaces: { [key: string]: RegisteredInterface } = {};

/**
 * Get the class reference for a registered interface
 * @param id The interface identifier
 * @returns The registered class
 */
export function getInterfaceReference(id: string): RegisteredInterface {
    return __registeredInterfaces[id] || null;
}

/**
 * Instantiate a new interface
 * @param id The registered identifier
 * @param config Configuration object for the interface
 * @returns New interface instance
 * @throws Throws if no registered interface is
 *  found for the provided ID
 */
export function instantiateInterface(id: string, config: { [key: string]: any }) {
    const Interface = getInterfaceReference(id);
    if (!Interface) {
        throw new Error(`No interface found for ID: ${id}`);
    }
    return new Interface(config);
}

/**
 * Register an interface reference for an ID
 * @param id The identifier for the interface
 * @param classRef The class reference
 */
export function registerInterface(id: string, classRef: RegisteredInterface) {
    if (!!__registeredInterfaces[id]) {
        throw new Error(`Interface already registered for ID: ${id}`);
    }
    __registeredInterfaces[id] = classRef;
}

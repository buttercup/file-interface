export interface DropboxInterfaceConfig {
    dropboxClient: any;
}

export interface FileIdentifier {
    identifier: Identifier | null;
    name: string;
}

export interface FileItem {
    identifier: Identifier;
    name: string;
    type: "file" | "directory";
    size: number;
    mime?: string;
    created?: string;
    modified?: string;
    parent?: PathIdentifier;
}

export interface GoogleDriveInterfaceConfig {
    googleDriveClient: any;
}

export type Identifier = string | number;

export interface NodeFSInterfaceConfig {
    fs: any;
}

export interface PathIdentifier {
    identifier: Identifier;
    name: string;
}

export interface WebDAVInterfaceConfig {
    webdavClient: any;
}

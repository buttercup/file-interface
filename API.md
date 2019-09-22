## Modules

<dl>
<dt><a href="#module_FileInterface">FileInterface</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FileItem">FileItem</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#PathIdentifier">PathIdentifier</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FileIdentifier">FileIdentifier</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#DropboxInterfaceConfig">DropboxInterfaceConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GoogleDriveInterfaceConfig">GoogleDriveInterfaceConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#NodeFSInterfaceConfig">NodeFSInterfaceConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#WebDAVInterfaceConfig">WebDAVInterfaceConfig</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_FileInterface"></a>

## FileInterface

* [FileInterface](#module_FileInterface)
    * _static_
        * [.exports](#module_FileInterface.module.exports)
        * [.getInterfaceReference(id)](#module_FileInterface.getInterfaceReference) ⇒ <code>function</code> \| <code>null</code>
        * [.instantiateInterface(id, config)](#module_FileInterface.instantiateInterface) ⇒ <code>Object</code>
        * [.registerInterface(id, classRef)](#module_FileInterface.registerInterface)
    * _inner_
        * [~DropboxInterface](#module_FileInterface.DropboxInterface) ⇐ <code>FileSystemInterface</code>
            * [new DropboxInterface(config)](#new_module_FileInterface.DropboxInterface_new)
            * [.getDirectoryContents([pathIdentifier])](#module_FileInterface.DropboxInterface+getDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
            * [.getFileContents(pathIdentifier)](#module_FileInterface.DropboxInterface+getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
            * [.putFileContents(parentPathIdentifier, fileIdentifier, data)](#module_FileInterface.DropboxInterface+putFileContents) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)
        * [~GoogleDriveInterface](#module_FileInterface.GoogleDriveInterface) ⇐ <code>FileSystemInterface</code>
            * [new GoogleDriveInterface(config)](#new_module_FileInterface.GoogleDriveInterface_new)
            * [.getDirectoryContents([pathIdentifier])](#module_FileInterface.GoogleDriveInterface+getDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
            * [.getFileContents(pathIdentifier)](#module_FileInterface.GoogleDriveInterface+getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
            * [.getSupportedFeatures()](#module_FileInterface.GoogleDriveInterface+getSupportedFeatures)
            * [.putFileContents(parentPathIdentifier, fileIdentifier, data)](#module_FileInterface.GoogleDriveInterface+putFileContents) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)
        * [~NodeFSInterface](#module_FileInterface.NodeFSInterface) ⇐ <code>FileSystemInterface</code>
            * [new NodeFSInterface(config)](#new_module_FileInterface.NodeFSInterface_new)
            * [.getDirectoryContents([pathIdentifier])](#module_FileInterface.NodeFSInterface+getDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
            * [.getFileContents(pathIdentifier)](#module_FileInterface.NodeFSInterface+getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
            * [.getSupportedFeatures()](#module_FileInterface.NodeFSInterface+getSupportedFeatures)
            * [.putFileContents(parentPathIdentifier, fileIdentifier, data)](#module_FileInterface.NodeFSInterface+putFileContents) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)
            * [._filenamesToStats()](#module_FileInterface.NodeFSInterface+_filenamesToStats)
            * [._stat()](#module_FileInterface.NodeFSInterface+_stat)
        * [~WebDAVInterface](#module_FileInterface.WebDAVInterface) ⇐ <code>FileSystemInterface</code>
            * [new WebDAVInterface(config)](#new_module_FileInterface.WebDAVInterface_new)
            * [.getDirectoryContents([pathIdentifier])](#module_FileInterface.WebDAVInterface+getDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
            * [.getFileContents(pathIdentifier)](#module_FileInterface.WebDAVInterface+getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
            * [.getSupportedFeatures()](#module_FileInterface.WebDAVInterface+getSupportedFeatures)
            * [.putFileContents(parentPathIdentifier, fileIdentifier, data)](#module_FileInterface.WebDAVInterface+putFileContents) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)

<a name="module_FileInterface.module.exports"></a>

### FileInterface.exports
Base interface definition

**Kind**: static class of [<code>FileInterface</code>](#module_FileInterface)  
<a name="module_FileInterface.getInterfaceReference"></a>

### FileInterface.getInterfaceReference(id) ⇒ <code>function</code> \| <code>null</code>
Get the class reference for a registered interface

**Kind**: static method of [<code>FileInterface</code>](#module_FileInterface)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The interface identifier |

<a name="module_FileInterface.instantiateInterface"></a>

### FileInterface.instantiateInterface(id, config) ⇒ <code>Object</code>
Instantiate a new interface

**Kind**: static method of [<code>FileInterface</code>](#module_FileInterface)  
**Returns**: <code>Object</code> - New interface instance  
**Throws**:

- <code>Error</code> Throws if no registered interface is
 found for the provided ID


| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The registered identifier |
| config | <code>Object</code> | Configuration object for the  interface |

<a name="module_FileInterface.registerInterface"></a>

### FileInterface.registerInterface(id, classRef)
Register an interface reference for an ID

**Kind**: static method of [<code>FileInterface</code>](#module_FileInterface)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The identifier for the interface |
| classRef | <code>function</code> | The class reference |

<a name="module_FileInterface.DropboxInterface"></a>

### FileInterface~DropboxInterface ⇐ <code>FileSystemInterface</code>
Dropbox interface

**Kind**: inner class of [<code>FileInterface</code>](#module_FileInterface)  
**Extends**: <code>FileSystemInterface</code>  

* [~DropboxInterface](#module_FileInterface.DropboxInterface) ⇐ <code>FileSystemInterface</code>
    * [new DropboxInterface(config)](#new_module_FileInterface.DropboxInterface_new)
    * [.getDirectoryContents([pathIdentifier])](#module_FileInterface.DropboxInterface+getDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
    * [.getFileContents(pathIdentifier)](#module_FileInterface.DropboxInterface+getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.putFileContents(parentPathIdentifier, fileIdentifier, data)](#module_FileInterface.DropboxInterface+putFileContents) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)

<a name="new_module_FileInterface.DropboxInterface_new"></a>

#### new DropboxInterface(config)
Constructor for the interface


| Param | Type |
| --- | --- |
| config | [<code>DropboxInterfaceConfig</code>](#DropboxInterfaceConfig) | 

<a name="module_FileInterface.DropboxInterface+getDirectoryContents"></a>

#### dropboxInterface.getDirectoryContents([pathIdentifier]) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
Get remote directory contents

**Kind**: instance method of [<code>DropboxInterface</code>](#module_FileInterface.DropboxInterface)  

| Param | Type |
| --- | --- |
| [pathIdentifier] | [<code>PathIdentifier</code>](#PathIdentifier) | 

<a name="module_FileInterface.DropboxInterface+getFileContents"></a>

#### dropboxInterface.getFileContents(pathIdentifier) ⇒ <code>Promise.&lt;String&gt;</code>
Get remote file contents

**Kind**: instance method of [<code>DropboxInterface</code>](#module_FileInterface.DropboxInterface)  

| Param | Type |
| --- | --- |
| pathIdentifier | [<code>PathIdentifier</code>](#PathIdentifier) | 

<a name="module_FileInterface.DropboxInterface+putFileContents"></a>

#### dropboxInterface.putFileContents(parentPathIdentifier, fileIdentifier, data) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)
Write remote file contents

**Kind**: instance method of [<code>DropboxInterface</code>](#module_FileInterface.DropboxInterface)  

| Param | Type | Description |
| --- | --- | --- |
| parentPathIdentifier | [<code>PathIdentifier</code>](#PathIdentifier) |  |
| fileIdentifier | [<code>FileIdentifier</code>](#FileIdentifier) |  |
| data | <code>String</code> | File data |

<a name="module_FileInterface.GoogleDriveInterface"></a>

### FileInterface~GoogleDriveInterface ⇐ <code>FileSystemInterface</code>
Google Drive interface

**Kind**: inner class of [<code>FileInterface</code>](#module_FileInterface)  
**Extends**: <code>FileSystemInterface</code>  

* [~GoogleDriveInterface](#module_FileInterface.GoogleDriveInterface) ⇐ <code>FileSystemInterface</code>
    * [new GoogleDriveInterface(config)](#new_module_FileInterface.GoogleDriveInterface_new)
    * [.getDirectoryContents([pathIdentifier])](#module_FileInterface.GoogleDriveInterface+getDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
    * [.getFileContents(pathIdentifier)](#module_FileInterface.GoogleDriveInterface+getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.getSupportedFeatures()](#module_FileInterface.GoogleDriveInterface+getSupportedFeatures)
    * [.putFileContents(parentPathIdentifier, fileIdentifier, data)](#module_FileInterface.GoogleDriveInterface+putFileContents) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)

<a name="new_module_FileInterface.GoogleDriveInterface_new"></a>

#### new GoogleDriveInterface(config)
Constructor for the interface


| Param | Type |
| --- | --- |
| config | [<code>GoogleDriveInterfaceConfig</code>](#GoogleDriveInterfaceConfig) | 

<a name="module_FileInterface.GoogleDriveInterface+getDirectoryContents"></a>

#### googleDriveInterface.getDirectoryContents([pathIdentifier]) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
Get remote directory contents

**Kind**: instance method of [<code>GoogleDriveInterface</code>](#module_FileInterface.GoogleDriveInterface)  

| Param | Type |
| --- | --- |
| [pathIdentifier] | [<code>PathIdentifier</code>](#PathIdentifier) | 

<a name="module_FileInterface.GoogleDriveInterface+getFileContents"></a>

#### googleDriveInterface.getFileContents(pathIdentifier) ⇒ <code>Promise.&lt;String&gt;</code>
Get remote file contents

**Kind**: instance method of [<code>GoogleDriveInterface</code>](#module_FileInterface.GoogleDriveInterface)  

| Param | Type |
| --- | --- |
| pathIdentifier | [<code>PathIdentifier</code>](#PathIdentifier) | 

<a name="module_FileInterface.GoogleDriveInterface+getSupportedFeatures"></a>

#### googleDriveInterface.getSupportedFeatures()
**Kind**: instance method of [<code>GoogleDriveInterface</code>](#module_FileInterface.GoogleDriveInterface)  
**See**: FileSystemInterface#getSupportedFeatures  
<a name="module_FileInterface.GoogleDriveInterface+putFileContents"></a>

#### googleDriveInterface.putFileContents(parentPathIdentifier, fileIdentifier, data) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)
Write remote file contents

**Kind**: instance method of [<code>GoogleDriveInterface</code>](#module_FileInterface.GoogleDriveInterface)  

| Param | Type | Description |
| --- | --- | --- |
| parentPathIdentifier | [<code>PathIdentifier</code>](#PathIdentifier) |  |
| fileIdentifier | [<code>FileIdentifier</code>](#FileIdentifier) |  |
| data | <code>String</code> | File data |

<a name="module_FileInterface.NodeFSInterface"></a>

### FileInterface~NodeFSInterface ⇐ <code>FileSystemInterface</code>
Node's FS interface

**Kind**: inner class of [<code>FileInterface</code>](#module_FileInterface)  
**Extends**: <code>FileSystemInterface</code>  

* [~NodeFSInterface](#module_FileInterface.NodeFSInterface) ⇐ <code>FileSystemInterface</code>
    * [new NodeFSInterface(config)](#new_module_FileInterface.NodeFSInterface_new)
    * [.getDirectoryContents([pathIdentifier])](#module_FileInterface.NodeFSInterface+getDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
    * [.getFileContents(pathIdentifier)](#module_FileInterface.NodeFSInterface+getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.getSupportedFeatures()](#module_FileInterface.NodeFSInterface+getSupportedFeatures)
    * [.putFileContents(parentPathIdentifier, fileIdentifier, data)](#module_FileInterface.NodeFSInterface+putFileContents) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)
    * [._filenamesToStats()](#module_FileInterface.NodeFSInterface+_filenamesToStats)
    * [._stat()](#module_FileInterface.NodeFSInterface+_stat)

<a name="new_module_FileInterface.NodeFSInterface_new"></a>

#### new NodeFSInterface(config)
Constructor for the interface


| Param | Type |
| --- | --- |
| config | [<code>NodeFSInterfaceConfig</code>](#NodeFSInterfaceConfig) | 

<a name="module_FileInterface.NodeFSInterface+getDirectoryContents"></a>

#### nodeFSInterface.getDirectoryContents([pathIdentifier]) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
Get local directory contents

**Kind**: instance method of [<code>NodeFSInterface</code>](#module_FileInterface.NodeFSInterface)  

| Param | Type |
| --- | --- |
| [pathIdentifier] | [<code>PathIdentifier</code>](#PathIdentifier) | 

<a name="module_FileInterface.NodeFSInterface+getFileContents"></a>

#### nodeFSInterface.getFileContents(pathIdentifier) ⇒ <code>Promise.&lt;String&gt;</code>
Get local file contents

**Kind**: instance method of [<code>NodeFSInterface</code>](#module_FileInterface.NodeFSInterface)  

| Param | Type |
| --- | --- |
| pathIdentifier | [<code>PathIdentifier</code>](#PathIdentifier) | 

<a name="module_FileInterface.NodeFSInterface+getSupportedFeatures"></a>

#### nodeFSInterface.getSupportedFeatures()
**Kind**: instance method of [<code>NodeFSInterface</code>](#module_FileInterface.NodeFSInterface)  
**See**: FileSystemInterface#getSupportedFeatures  
<a name="module_FileInterface.NodeFSInterface+putFileContents"></a>

#### nodeFSInterface.putFileContents(parentPathIdentifier, fileIdentifier, data) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)
Write local file contents

**Kind**: instance method of [<code>NodeFSInterface</code>](#module_FileInterface.NodeFSInterface)  

| Param | Type | Description |
| --- | --- | --- |
| parentPathIdentifier | [<code>PathIdentifier</code>](#PathIdentifier) |  |
| fileIdentifier | [<code>FileIdentifier</code>](#FileIdentifier) |  |
| data | <code>String</code> | File data |

<a name="module_FileInterface.NodeFSInterface+_filenamesToStats"></a>

#### nodeFSInterface.\_filenamesToStats()
**Kind**: instance method of [<code>NodeFSInterface</code>](#module_FileInterface.NodeFSInterface)  
**Access**: protected  
<a name="module_FileInterface.NodeFSInterface+_stat"></a>

#### nodeFSInterface.\_stat()
**Kind**: instance method of [<code>NodeFSInterface</code>](#module_FileInterface.NodeFSInterface)  
**Access**: protected  
<a name="module_FileInterface.WebDAVInterface"></a>

### FileInterface~WebDAVInterface ⇐ <code>FileSystemInterface</code>
WebDAV interface

**Kind**: inner class of [<code>FileInterface</code>](#module_FileInterface)  
**Extends**: <code>FileSystemInterface</code>  

* [~WebDAVInterface](#module_FileInterface.WebDAVInterface) ⇐ <code>FileSystemInterface</code>
    * [new WebDAVInterface(config)](#new_module_FileInterface.WebDAVInterface_new)
    * [.getDirectoryContents([pathIdentifier])](#module_FileInterface.WebDAVInterface+getDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
    * [.getFileContents(pathIdentifier)](#module_FileInterface.WebDAVInterface+getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.getSupportedFeatures()](#module_FileInterface.WebDAVInterface+getSupportedFeatures)
    * [.putFileContents(parentPathIdentifier, fileIdentifier, data)](#module_FileInterface.WebDAVInterface+putFileContents) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)

<a name="new_module_FileInterface.WebDAVInterface_new"></a>

#### new WebDAVInterface(config)
Constructor for the interface


| Param | Type |
| --- | --- |
| config | [<code>WebDAVInterfaceConfig</code>](#WebDAVInterfaceConfig) | 

<a name="module_FileInterface.WebDAVInterface+getDirectoryContents"></a>

#### webDAVInterface.getDirectoryContents([pathIdentifier]) ⇒ <code>Promise.&lt;Array.&lt;FileItem&gt;&gt;</code>
Get remote directory contents

**Kind**: instance method of [<code>WebDAVInterface</code>](#module_FileInterface.WebDAVInterface)  

| Param | Type |
| --- | --- |
| [pathIdentifier] | [<code>PathIdentifier</code>](#PathIdentifier) | 

<a name="module_FileInterface.WebDAVInterface+getFileContents"></a>

#### webDAVInterface.getFileContents(pathIdentifier) ⇒ <code>Promise.&lt;String&gt;</code>
Get remote file contents

**Kind**: instance method of [<code>WebDAVInterface</code>](#module_FileInterface.WebDAVInterface)  

| Param | Type |
| --- | --- |
| pathIdentifier | [<code>PathIdentifier</code>](#PathIdentifier) | 

<a name="module_FileInterface.WebDAVInterface+getSupportedFeatures"></a>

#### webDAVInterface.getSupportedFeatures()
**Kind**: instance method of [<code>WebDAVInterface</code>](#module_FileInterface.WebDAVInterface)  
**See**: FileSystemInterface#getSupportedFeatures  
<a name="module_FileInterface.WebDAVInterface+putFileContents"></a>

#### webDAVInterface.putFileContents(parentPathIdentifier, fileIdentifier, data) ⇒ [<code>Promise.&lt;FileIdentifier&gt;</code>](#FileIdentifier)
Write remote file contents

**Kind**: instance method of [<code>WebDAVInterface</code>](#module_FileInterface.WebDAVInterface)  

| Param | Type | Description |
| --- | --- | --- |
| parentPathIdentifier | [<code>PathIdentifier</code>](#PathIdentifier) |  |
| fileIdentifier | [<code>FileIdentifier</code>](#FileIdentifier) |  |
| data | <code>String</code> | File data |

<a name="FileItem"></a>

## FileItem : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| identifier | <code>String</code> \| <code>Number</code> | The item identifier, as  recognised by the remote system/interface |
| name | <code>String</code> | The friendly display name of the item |
| type | <code>String</code> | The type of the item (file/directory) |
| size | <code>Number</code> | Size, in bytes, of the item |
| [mime] | <code>String</code> | MIME type of the item |
| [created] | <code>String</code> | UTC date string that represents  whenthe item was created |
| [modified] | <code>String</code> | UTC date string that represents  when the item was last modified |
| [parent] | [<code>PathIdentifier</code>](#PathIdentifier) | Parent identifier object,  when available. If not set assume currently in root. |

<a name="PathIdentifier"></a>

## PathIdentifier : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| identifier | <code>String</code> \| <code>Number</code> | File system path identifier  (usually path on directory-based systems, or an identifier on  platforms such as Google Drive) |
| name | <code>String</code> | File name for display (short) |

<a name="FileIdentifier"></a>

## FileIdentifier : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| identifier | <code>String</code> \| <code>Number</code> \| <code>null</code> | File system file  identifier (usually filename (full) on directory-based systems,  or a file identifier on platforms such as Google Drive) |
| name | <code>String</code> | File name (short) |

<a name="DropboxInterfaceConfig"></a>

## DropboxInterfaceConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dropboxClient | <code>Object</code> | Dropbox client  instance |

<a name="GoogleDriveInterfaceConfig"></a>

## GoogleDriveInterfaceConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| googleDriveClient | <code>Object</code> | Google Drive client  instance |

<a name="NodeFSInterfaceConfig"></a>

## NodeFSInterfaceConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fs | <code>Object</code> | Reference to Node's fs API |

<a name="WebDAVInterfaceConfig"></a>

## WebDAVInterfaceConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| webdavClient | <code>Object</code> | WebDAV client  instance |


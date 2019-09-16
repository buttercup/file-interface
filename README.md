# File Interface
> Client request library interface and explorer

[![Build Status](https://travis-ci.org/buttercup/file-interface.svg?branch=master)](https://travis-ci.org/buttercup/file-interface) [![npm version](https://badge.fury.io/js/%40buttercup%2Ffile-interface.svg)](https://www.npmjs.com/package/@buttercup/file-interface)

## About

Reading, writing and exploring file systems within Buttercup has typically been a complex process with differing approaches on the different application platforms. This library is intended to provide a common API with which to build the following tools:

 * File explorer interface (between client and UI)
 * File creation (new vault feature)
 * File selection (UI, returing identifier)

The API provided by this library is common across all data providers:

 * Node's `fs` (`fs`)
 * [Google Drive](https://github.com/buttercup/googledrive-client) (`googledrive`)
 * [Dropbox](https://github.com/buttercup/dropbox-client) (`dropbox`)
 * [WebDAV](https://github.com/perry-mitchell/webdav-client) (`webdav`)

None of these packages are included in this repository and are expected to be provided at runtime.

### Installation

Install by running: `npm install @buttercup/file-interface --save`

## Usage

An interface is created when required, once you have the necessary components for the interface to function:

```javascript
const { instantiateInterface } = require("@buttercup/file-interface");
const fs = require("fs");

const fsInterface = instantiateInterface("fs", { fs });
fsInterface.getDirectoryContents({ identifier: "./dirname" }).then(results => {
    // Returns something like the following:
    // [{
    //     identifier: "/root/dirname/testfile.txt",
    //     name: "testfile.txt",
    //     type: "file",
    //     size: 231,
    //     created: "Mon, 10 Oct 2011 23:24:11 GMT",
    //     modified: "Mon, 11 Oct 2011 10:57:44 GMT"
    // }]
});
```

You'll notice a lot of _identifier_ usage when calling methods provided by this library. As some remote systems require more information, the API for this project uses identifier objects (parent and file) to collect information that better describes remote objects in enough detail to be usable across file systems. Google Drive, for example, doesn't use typical paths - instead files and directories are referred to by IDs:

```javascript
const { instantiateInterface } = require("@buttercup/file-interface");
const { createClient } = require("@buttercup/googledrive-client");

const googleDriveClient = createClient(myToken);
const fsInterface = instantiateInterface("googledrive", { googleDriveClient });

fsInterface.getDirectoryContents({ identifier: "<dir-id>" }).then(results => {
    // Returns something like the following:
    // [{
    //     identifier: "0BxOS7mTBMR_bMHZRUjJ5NU1ZOWs",
    //     name: "testfile.txt",
    //     type: "file",
    //     size: 231,
    //     created: "Mon, 10 Oct 2011 23:24:11 GMT",
    //     modified: "Mon, 11 Oct 2011 10:57:44 GMT"
    // }]
});

// Update existing file
fsInterface.putFileContents(
    { identifier: "<dir-id>" },
    { identifier: "0BxOS7mTBMR_bMHZRUjJ5NU1ZOWs", name: "testfile.txt" },
    "some data"
);

// Write new file
fsInterface.putFileContents(
    { identifier: "<dir-id>" },
    { identifier: null, name: "newfile.txt" },
    "some data"
).then(result => {
    // `result` is like:
    // {
    //     identifier: "0BxOS7mTBMR_bMHZRUjJ5NU1ZOWs",
    //     name: "newfile.txt"
    // }
});
```

Make sure to refer to the [API documentation](API.md) for more information.

### Supported fields

When calling `getDirectoryContents`, some base fields are always available:

 * `identifier`: The identifying path or ID of the file/directory
 * `filename`: The base filename of the file/directory
 * `type`: Either "file" or "directory"
 * `size`: The size, in bytes, of the item (always `0` for directories)

Other additional fields are sometimes returned, based upon what the remote system supports. These can be detected by calling the `getSupportedFeatures` method on the interface instance. It returns an array of strings that indicate what is specified on each returned file item:

 * `created` indicates that a field called `created` is present on every file item, which is the creation date of the file.
 * `modified` indicates that a field called `modified` is present on every file item, which is the modification date of the file.
 * `mime` indicates that a field called `mime` is present on each file item, containing the MIME type of the item.

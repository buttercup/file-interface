# File Interface changelog

## v3.0.1
_2023-07-17_

 * React-Native entry in `package.json`

## v3.0.0
_2023-04-16_

 * ESM
 * Bundled types for Google Drive, Dropbox and WebDAV clients

## v2.0.0
_2021-11-26_

 * Removed registration functionality (manual instantiation only)
 * Root path identifier handling

## v1.1.0
_2021-11-22_

 * `putDirectory` method

## v1.0.1
_2021-11-16_

 * Export types

## v1.0.0
_2021-11-16_

 * Typescript

## v0.3.3
_2021-04-05_

 * **Bugfix**
   * Google Drive shared files would not show up

## v0.3.2
_2019-10-10_

 * **Bugfix**:
   * Dropbox client `putFileContents` wouldn't return connect identifier for `null` (creation)
   * WebDAV client `putFileContents` wouldn't return connect identifier for `null` (creation)

## v0.3.1
_2019-09-29_

 * **Bugfix**:
   * Dropbox client used incorrect value when putting file contents
   * WebDAV client used incorrect value when putting file contents

## v0.3.0
_2019-09-22_

 * `deleteFile` method

## v0.2.0
_2019-09-22_

 * **Bugfix**:
   * Date parsing would return invalid strings
 * Allow `fileIdentifier.identifier` to be `null` on all platforms to create _new_ files
 * `parent` property on `getDirectoryContents` results to refer to parent instance

## v0.1.1
_2019-09-22_

 * Make `getDirectoryContents` parameters optional for root contents

## v0.1.0
_2019-09-16_

 * Initial release

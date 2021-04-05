# File Interface changelog

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

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { expect } from "chai";
import joinPath from "join-path";
import pify from "pify";
import rimraf from "rimraf";
import fileExists from "file-exists";
import dirExists from "directory-exists";
import { NodeFSInterface } from "../../dist/interfaces/NodeFSInterface.js";

const readFile = pify(fs.readFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const targetPath = path.resolve(__dirname, "../NodeFSInterface-resources");
const tmpFile = path.join(targetPath, "testfile.tmp");
const tmpDir = path.join(targetPath, "testdir");

describe("NodeFSInterface", function () {
    beforeEach(function () {
        this.interface = new NodeFSInterface({ fs });
    });

    describe("deleteFile", function () {
        beforeEach(function (done) {
            fs.writeFile(tmpFile, "test", () => {
                setTimeout(done, 250);
            });
        });

        it("deletes files", function () {
            return this.interface
                .deleteFile({ identifier: tmpFile })
                .then(() => fileExists(tmpFile))
                .then(exists => {
                    expect(exists).to.be.false;
                });
        });
    });

    describe("getDirectoryContents", function () {
        it("returns an array of items", function () {
            return this.interface
                .getDirectoryContents({ identifier: targetPath })
                .then(contents => {
                    expect(contents).to.be.an("array");
                    expect(contents).to.have.length.above(0);
                });
        });

        describe("returned items", function () {
            beforeEach(function () {
                return this.interface
                    .getDirectoryContents({ identifier: targetPath })
                    .then(contents => {
                        this.contents = contents;
                    });
            });

            it("correctly sets name & identifier properties", function () {
                const fileItem = this.contents.find(item => item.name === "rootfile.txt");
                expect(fileItem).to.have.property(
                    "identifier",
                    joinPath(targetPath, "rootfile.txt")
                );
            });

            it("correctly identify directories", function () {
                const dirItem = this.contents.find(item => item.name === "somedir");
                expect(dirItem).to.have.property("type", "directory");
            });

            it("correctly identify files", function () {
                const fileItem = this.contents.find(item => item.name === "rootfile.txt");
                expect(fileItem).to.have.property("type", "file");
            });

            it("has correct file size", function () {
                const fileItem = this.contents.find(item => item.name === "rootfile.txt");
                expect(fileItem).to.have.property("size", 14);
            });

            it("has correct directory size (0)", function () {
                const dirItem = this.contents.find(item => item.name === "somedir");
                expect(dirItem).to.have.property("size", 0);
            });
        });
    });

    describe("getFileContents", function () {
        it("returns correct file contents", function () {
            const filename = joinPath(targetPath, "rootfile.txt");
            return this.interface.getFileContents({ identifier: filename }).then(contents => {
                expect(contents.trim()).to.equal("root-file-txt");
            });
        });
    });

    describe("putDirectory", function () {
        afterEach(function () {
            return new Promise((resolve, reject) => {
                rimraf(tmpDir, err => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });

        it("creates directories at the root", async function () {
            await this.interface.putDirectory(
                { identifier: targetPath },
                { identifier: null, name: "testdir" }
            );
            const exists = await dirExists(tmpDir);
            expect(exists).to.be.true;
        });
    });

    describe("putFileContents", function () {
        afterEach(function () {
            return new Promise((resolve, reject) => {
                rimraf(tmpFile, err => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });

        it("writes correct contents", function () {
            return this.interface
                .putFileContents(
                    { identifier: targetPath },
                    { identifier: tmpFile, name: "testfile.tmp" },
                    "my\ndata"
                )
                .then(() => readFile(tmpFile, "utf8"))
                .then(contents => {
                    expect(contents).to.equal("my\ndata");
                });
        });

        it("returns correct identifier", function () {
            return this.interface
                .putFileContents(
                    { identifier: targetPath },
                    { identifier: tmpFile, name: "testfile.tmp" },
                    "my\ndata"
                )
                .then(identifier => {
                    expect(identifier).to.deep.equal({
                        identifier: tmpFile,
                        name: "testfile.tmp"
                    });
                });
        });
    });
});

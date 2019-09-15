const path = require("path");
const fs = require("fs");
const joinPath = require("join-path");
const pify = require("pify");
const rimraf = require("rimraf");
const NodeFSInterface = require("../../source/interfaces/NodeFSInterface.js");

const readFile = pify(fs.readFile);

const targetPath = path.resolve(__dirname, "../NodeFSInterface-resources");
const tmpFile = path.resolve(__dirname, "../NodeFSInterface-resources/testfile.tmp");

describe("NodeFSInterface", function() {
    beforeEach(function() {
        this.interface = new NodeFSInterface({ fs });
    });

    describe("getDirectoryContents", function() {
        it("returns an array of items", function() {
            return this.interface
                .getDirectoryContents({ identifier: targetPath })
                .then(contents => {
                    expect(contents).to.be.an("array");
                    expect(contents).to.have.length.above(0);
                });
        });

        describe("returned items", function() {
            beforeEach(function() {
                return this.interface
                    .getDirectoryContents({ identifier: targetPath })
                    .then(contents => {
                        this.contents = contents;
                    });
            });

            it("correctly sets name & identifier properties", function() {
                const fileItem = this.contents.find(item => item.name === "rootfile.txt");
                expect(fileItem).to.have.property(
                    "identifier",
                    joinPath(targetPath, "rootfile.txt")
                );
            });

            it("correctly identify directories", function() {
                const dirItem = this.contents.find(item => item.name === "somedir");
                expect(dirItem).to.have.property("type", "directory");
            });

            it("correctly identify files", function() {
                const fileItem = this.contents.find(item => item.name === "rootfile.txt");
                expect(fileItem).to.have.property("type", "file");
            });

            it("has correct file size", function() {
                const fileItem = this.contents.find(item => item.name === "rootfile.txt");
                expect(fileItem).to.have.property("size", 14);
            });

            it("has correct directory size (0)", function() {
                const dirItem = this.contents.find(item => item.name === "somedir");
                expect(dirItem).to.have.property("size", 0);
            });
        });
    });

    describe("getFileContents", function() {
        it("returns correct file contents", function() {
            const filename = joinPath(targetPath, "rootfile.txt");
            return this.interface.getFileContents({ identifier: filename }).then(contents => {
                expect(contents.trim()).to.equal("root-file-txt");
            });
        });
    });

    describe("putFileContents", function() {
        afterEach(function() {
            return new Promise((resolve, reject) => {
                rimraf(tmpFile, err => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });

        it("writes correct contents", function() {
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

        it("returns correct identifier", function() {
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

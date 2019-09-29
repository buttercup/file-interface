const path = require("path");
const joinPath = require("join-path");
const GoogleDriveInterface = require("../../source/interfaces/GoogleDriveInterface.js");

const testResponse = require("../GoogleDriveInterface-resources/files-response.json");

describe("GoogleDriveInterface", function() {
    beforeEach(function() {
        this.googleDriveClient = {
            deleteFile: sinon.stub().returns(Promise.resolve()),
            getDirectoryContents: sinon.stub().returns(Promise.resolve(testResponse)),
            getFileContents: sinon.stub().returns(Promise.resolve("my\ntest\nfile")),
            putFileContents: sinon
                .stub()
                .callsFake(info => Promise.resolve(info.identifier || "xxx"))
        };
        this.interface = new GoogleDriveInterface({ googleDriveClient: this.googleDriveClient });
    });

    describe("deleteFile", function() {
        it("passes the file identifier", function() {
            return this.interface
                .deleteFile({ identifier: "1yTlIzvJou28_sFrBTLtrGRzE8I6f72_r" })
                .then(() => {
                    expect(
                        this.googleDriveClient.deleteFile.calledWithExactly(
                            "1yTlIzvJou28_sFrBTLtrGRzE8I6f72_r"
                        )
                    ).to.be.true;
                });
        });
    });

    describe("getDirectoryContents", function() {
        it("calls getDirectoryContents with tree:false", function() {
            return this.interface.getDirectoryContents({ identifier: null }).then(() => {
                expect(
                    this.googleDriveClient.getDirectoryContents.calledWithExactly({ tree: false })
                ).to.be.true;
            });
        });

        it("returns an array of items", function() {
            return this.interface.getDirectoryContents({ identifier: null }).then(contents => {
                expect(contents).to.be.an("array");
                expect(contents).to.have.length.above(0);
            });
        });

        describe("returned items (root)", function() {
            beforeEach(function() {
                return this.interface.getDirectoryContents({ identifier: null }).then(contents => {
                    this.contents = contents;
                });
            });

            it("correctly sets name & identifier properties", function() {
                const fileItem = this.contents.find(item => item.name === "root.bcup");
                expect(fileItem).to.have.property(
                    "identifier",
                    "1yTlIzvJou28_sFrBTLtrGRzE8I6f72_r"
                );
            });

            it("correctly identify directories", function() {
                const dirItem = this.contents.find(item => item.name === "Vaults");
                expect(dirItem).to.have.property("type", "directory");
            });

            it("correctly identify files", function() {
                const fileItem = this.contents.find(item => item.name === "root.bcup");
                expect(fileItem).to.have.property("type", "file");
            });

            it("has correct file size", function() {
                const fileItem = this.contents.find(item => item.name === "root.bcup");
                expect(fileItem).to.have.property("size", 4020);
            });

            it("has correct directory size (0)", function() {
                const dirItem = this.contents.find(item => item.name === "Vaults");
                expect(dirItem).to.have.property("size", 0);
            });
        });

        describe("returned items (sub-dir)", function() {
            beforeEach(function() {
                return this.interface
                    .getDirectoryContents({ identifier: "1ejek2Yf7HebZ0ZFxy4KSU4ERP86rvhvJ3" })
                    .then(contents => {
                        this.contents = contents;
                    });
            });

            it("correctly sets name & identifier properties", function() {
                const fileItem = this.contents.find(item => item.name === "sub.bcup");
                expect(fileItem).to.have.property(
                    "identifier",
                    "1Dp-ZTQNnvfFRh0DU2Bh-IgB3SFKvoNul"
                );
            });

            it("has correct file size", function() {
                const fileItem = this.contents.find(item => item.name === "sub.bcup");
                expect(fileItem).to.have.property("size", 948);
            });

            it("has correct mime", function() {
                const fileItem = this.contents.find(item => item.name === "sub.bcup");
                expect(fileItem).to.have.property("mime", "text/plain");
            });
        });
    });

    describe("getFileContents", function() {
        it("returns correct file contents", function() {
            return this.interface
                .getFileContents({ identifier: "1yTlIzvJou28_sFrBTLtrGRzE8I6f72_r" })
                .then(contents => {
                    expect(contents).to.equal("my\ntest\nfile");
                });
        });

        it("requests using the correct ID", function() {
            return this.interface
                .getFileContents({ identifier: "1yTlIzvJou28_sFrBTLtrGRzE8I6f72_r" })
                .then(contents => {
                    expect(
                        this.googleDriveClient.getFileContents.calledWithExactly(
                            "1yTlIzvJou28_sFrBTLtrGRzE8I6f72_r"
                        )
                    ).to.be.true;
                });
        });
    });

    describe("putFileContents", function() {
        it("writes new files", function() {
            return this.interface
                .putFileContents(
                    { identifier: null },
                    { identifier: null, name: "testfile.tmp" },
                    "my\ndata"
                )
                .then(() => {
                    expect(
                        this.googleDriveClient.putFileContents.calledWithExactly({
                            id: null,
                            parent: null,
                            name: "testfile.tmp",
                            contents: "my\ndata"
                        })
                    );
                });
        });

        it("returns correct identifier", function() {
            return this.interface
                .putFileContents(
                    { identifier: null },
                    { identifier: null, name: "testfile.tmp" },
                    "my\ndata"
                )
                .then(identifier => {
                    expect(identifier).to.deep.equal({
                        identifier: "xxx",
                        name: "testfile.tmp"
                    });
                });
        });
    });
});

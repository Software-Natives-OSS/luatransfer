"use strict";

const assert = require('assert');
const transferLua = require("../src/transferlua");

const indelTestTarget = 'TransferLuaTest';

describe('Test TransferLua open/close', () => {

    before(() => {
        // Ensure the target is in an "openable state"
        const transfer = new transferLua.LuaTransfer(indelTestTarget, { force: true });
        transfer.close()
    });

    beforeEach(() => {
        this.transfer = null;
    });

    afterEach(() => {
        if (this.transfer) {
            // ensure connection is closed
            this.transfer.close();
            this.transfer = null;
        }
    });

    it('Should successfully open a transfer', () => {
        this.transfer = new transferLua.LuaTransfer(indelTestTarget);
        assert.strictEqual(this.transfer.opened(), true, "Expect opening a transfer succeeds")
        this.transfer.close()
    });

    it('Should successfully close an opened transfer', () => {
        this.transfer = new transferLua.LuaTransfer(indelTestTarget);
        this.transfer.close()
        assert.strictEqual(this.transfer.opened(), false, "Expect closing an opened transfer succeeds")
    });

    it('Should not be able to open a transfer with an invalid target name', () => {
        assert.throws(() => {
            this.transfer = new transferLua.LuaTransfer("invalid target name");
        });
    });

    it('Should not be able to open a transfer if already opened by someone else', () => {
        this.transfer = new transferLua.LuaTransfer(indelTestTarget);
        assert.throws(() => {
            // will anyway not be assigned:
            this.transfer = new transferLua.LuaTransfer(indelTestTarget);
        });
    });

    it('Should be able to connect with the `force` flag set even if someone else already connected', () => {
        this.transfer = new transferLua.LuaTransfer(indelTestTarget);
        this.transfer = new transferLua.LuaTransfer(indelTestTarget, { force: true });
        assert.strictEqual(this.transfer.opened(), true, "Expect to be opened");
    });

});


const getFileLocation = function (filename) {
    return __dirname + '/' + filename;
}

describe('Test TransferLua SendFile', () => {

    beforeEach(() => {
        this.transfer = new transferLua.LuaTransfer(indelTestTarget, { force: true });
        this.stateName = 'Machine';
    });

    afterEach(() => {
        this.transfer.close();
        this.transfer = null;
    });

    it('SendFile and execute', () => {
        const options = transferLua.combineOptions(transferLua.OPTION_EXECUTE);
        this.transfer.sendFile(getFileLocation('helloworld.lua'), this.stateName, { options: options });
    });

    it('SendFile compile before sending and then execute', () => {
        const options = transferLua.combineOptions(
            transferLua.OPTION_EXECUTE, 
            transferLua.OPTION_COMPILE_BEFORE);
        this.transfer.sendFile(getFileLocation('helloworld.lua'), this.stateName, { options: options });
    });

});
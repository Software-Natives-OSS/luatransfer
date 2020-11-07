const assert = require('assert');
const ref = require('ref-napi')

const indelTestTarget = 'TransferLuaTest';
const luaEndpoint = 'Default';

function loadWrapper() {
    return require("../index");
}
describe('require module', () => {

    beforeEach(() => {
        this.outHandle = ref.alloc('size_t');
    });

    afterEach(() => {
        var handle = this.outHandle.deref();
        if (handle > 0) {
            loadWrapper().close(handle)
        }
    });

    it('Should find the dynamic library', () => {
        loadWrapper()
       });

       it('Can open a transfer to the test target', () => {
        var err = loadWrapper().open(indelTestTarget, luaEndpoint, this.outHandle, null)
        assert.strictEqual(err, 0, "Expected success");
    });

    it('Can force open a transfer to the test target', () => {
        var err = loadWrapper().forceOpen(indelTestTarget, luaEndpoint, this.outHandle, null)
        assert.strictEqual(err, 0, "Expected success");
    });

    it('Consecutive call to open failes', () => {
        var err = loadWrapper().open(indelTestTarget, luaEndpoint, this.outHandle, null)
        assert.strictEqual(err, 0, "Expected success");
        var err = loadWrapper().open(indelTestTarget, luaEndpoint, this.outHandle, null)
        assert.strictEqual(err, 0x100080004, "Expected failure ('already opened')");
    });

});
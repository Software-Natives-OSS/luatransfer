const assert = require('assert');

const indel_test_target = 'TransferLuaTest';

function loadWrapper() {
    return require("../index");
}
describe('require module', () => {
    it('Should find the dynamic library', () => {
        loadWrapper()
       });

    // it('Can open a transfer to the test target', () => {
    //     loadWrapper.open()
    // });
});
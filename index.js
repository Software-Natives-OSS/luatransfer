const ffi = require("ffi-napi");

const transferlua = ffi.Library('libtransferlua', {

});

module.exports = transferlua
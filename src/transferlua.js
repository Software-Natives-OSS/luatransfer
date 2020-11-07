"use strict";

const wrapper = require("./wrapper");
const ref = require("ref-napi");


const LuaTransfer = function (targetName, options = {}) {
    const endpoint = options.endpoint || 'Default';
    const force = options.force || false;

    this._targetName = targetName;
    this._endpoint = endpoint;
    this._handle = null;

    this.opened = function () {
        return this._handle != null
    }

    this.close = function () {
        if (this.opened()) {
            const err = wrapper.close(this._handle)
            this._handleErr(err, 'LuaTransfer.close()')
            this._handle = null;
        }
    }

    this._handleErr = function (err, operation) {
        if (err) {
            throw new Error(`LuaTransfer error in '${operation}': ${err.toString(16)}`)
        }
    }

    this._open = function (force) {
        const openFct = force ? wrapper.forceOpen : wrapper.open;
        const handleRef = ref.alloc('size_t', -1/*initial value*/)
        const err = openFct(this._targetName, this._endpoint, handleRef, null)
        this._handleErr(err, 'LuaTransfer._open()')
        this._handle = handleRef.deref();
    }

    this._open(force)
}



module.exports = {
    LuaTransfer: LuaTransfer
}
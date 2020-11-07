"use strict";

const wrapper = require("./wrapper");
const ref = require("ref-napi");


const TransferLua = function (targetName, options = {}) {
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
            this._handleErr(err, 'TransferLua.close()')
            this._handle = null;
        }
    }

    this.sendFile = function (fileLocation, stateName, options = {}) {
        const taskName = options.taskName || null;
        const dataOrModuleName = options.dataOrModuleName || null;
        const sendOptions = options.options || "";
        const err = wrapper.sendFile(this._handle, fileLocation, stateName, taskName, dataOrModuleName, sendOptions, null);
        this._handleErr(err);
    }

    this.sendChunk = function (scriptName, stateName, luaChunk, options = {}) {
        const taskName = options.taskName || null;
        const dataOrModuleName = options.dataOrModuleName || null;
        const sendOptions = options.options || "";
        const err = wrapper.sendChunk(
            this._handle, scriptName, stateName, taskName, dataOrModuleName, 
            luaChunk, luaChunk.length, sendOptions, null);
        this._handleErr(err);
    }

    this._handleErr = function (err, operation) {
        if (err) {
            throw new Error(`TransferLua error in '${operation}': ${err.toString(16)}`)
        }
    }

    this._open = function (force) {
        const openFct = force ? wrapper.forceOpen : wrapper.open;
        const handleRef = ref.alloc('size_t', -1/*initial value*/)
        const err = openFct(this._targetName, this._endpoint, handleRef, null)
        this._handleErr(err, 'TransferLua._open()')
        this._handle = handleRef.deref();
    }

    this._open(force)
}

/** The 'options' are a concatenation of 'option characters', such as 'c' 
 (compile before download), 'x' (execute after download), etc. This is a
 helper function to concat these options by using the pre-defined constants
 exposed by this module, see OPTION_EXECUTE, OPTION_COMPILE_BEFORE, etc. */
const combineOptions = function (...options) {
    var result = ''
    for (const option of options) {
        result += option;
    }
    return result;
}

module.exports = {
    TransferLua: TransferLua,

    combineOptions: combineOptions,
    OPTION_EXECUTE: "x",
    OPTION_COMPILE_BEFORE: "c"
}
# Node wrapper for Indel's TransferLua C-Library

[Indel AG's](https://indel.ch) TransferLua is a dynamic library (`.dll`, `.so`) with a C-API that allows downloading Lua scripts to it's real-time contolling systems. This project is a wrapper around that C-API for Node.

## State

I took the "lean approach": The basic functionality is in place, but less commonly used features may not yet be. Extending it should be farely easy and everyone's invited to do so.

## Motivation

The main motivation for this project was to have Node wrapper suitable to be used by VSCode extensions.

## Installation

```sh
npm i @softwarenatives/transferlua
```

## Basic usage

Assuming there is a `helloworld.js` in the current working dir, create something like this:

```js
const transferLua = require("@softwarenatives/transferlua");
 
const indelTargetName = 'IndelTargetName'; // E.g. "Net251"
const luaStateName = 'Machine';
const options = transferLua.combineOptions(
    transferLua.OPTION_EXECUTE);
 
const transfer = new transferLua.LuaTransfer(indelTargetName, { force: true });
transfer.sendFile('./helloworld.lua', luaStateName, { options: options });
transfer.close()
```

## Supported platforms

This wrapper should support all platforms on which Indel's library is available. At the time of this writing, these are

- Windows
- Linux

## TODO

As mentioned, only the "thus far required" functionality is in place. Namely, the following is missing:

- "Error writer" callback not yet implemented (thus, the ability to get 'good error reporting' not given yet)
- Convertion from error codes (uint64) into human readable text is yet missing
- Test coverage for various options of `sendFile` and `sendChunk` not yet given (and also not manually tested yet)
- TS types could be improved for the various optional arguments

## Why not in TS?

This module is so small that I felt to write it in JavaScript rather than TypeScript, although I like the latter more. I feel like the overhead is smaller for JS, since no transpiling, etc. is required.

Note that if someone would convert it to TS, such a contribution would be welcome.

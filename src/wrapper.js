"use strict";

const ffi = require("ffi-napi");
const ref = require("ref-napi")

const stringBuffer = 'string'
const luaChannelDescriptor = ref.types.size_t;
const luaChannelDescriptorPtr = ref.refType(luaChannelDescriptor);
// typedef void (*TransferLua_WriterFunction) (const char* p, void* ud);
const writerPtr = 'pointer';


const transferlua = ffi.Library('libtransferlua', {
    // TRANSFERLUA_EXPORT  uint64 WINAPI TransferLuaOpen		(const char* TargetPath, const char* Endpoint, tTransferLuaChannelDescriptor* ChannelDescriptor, TransferLua_Writer* ErrorWriter);
    'TransferLuaOpen': ['uint64', [stringBuffer, stringBuffer, luaChannelDescriptorPtr, writerPtr]],
    // TRANSFERLUA_EXPORT  uint64 WINAPI TransferLuaForceOpen		(const char* TargetPath, const char* Endpoint, tTransferLuaChannelDescriptor* ChannelDescriptor, TransferLua_Writer* ErrorWriter);
    'TransferLuaForceOpen': ['uint64', [stringBuffer, stringBuffer, luaChannelDescriptorPtr, writerPtr]],
    // TRANSFERLUA_EXPORT  void WINAPI TransferLuaClose		(tTransferLuaChannelDescriptor ChannelDescriptor);
    'TransferLuaClose': ['uint64', [luaChannelDescriptor]],
    // TRANSFERLUA_EXPORT  uint64 WINAPI TransferLuaSendChunk	 (
    //    tTransferLuaChannelDescriptor ChannelDescriptor, const char* ScriptName, const char* StateName, const char* TaskName, 
    //    const char* DataOrModuleName, const char* Chunk, uint32 ChunkSize, const char* Options, TransferLua_Writer* ErrorWriter);
    'TransferLuaSendChunk': ['uint64', [luaChannelDescriptor, 'string', 'string', 'string', 'string', 'string', 'uint32', 'string', writerPtr]],
    // TRANSFERLUA_EXPORT  uint64 WINAPI TransferLuaSendFile	 (tTransferLuaChannelDescriptor ChannelDescriptor, const char* FileName, 
    //    const char* StateName, const char* TaskName, const char* DataOrModuleName, const char* Options, TransferLua_Writer* ErrorWriter);
    'TransferLuaSendFile': ['uint64', [luaChannelDescriptor, 'string', 'string', 'string', 'string', 'string', writerPtr]]
});

module.exports = {
    open: transferlua.TransferLuaOpen,
    forceOpen: transferlua.TransferLuaForceOpen,
    close: transferlua.TransferLuaClose,
    sendChunk: transferlua.TransferLuaSendChunk,
    sendFile: transferlua.TransferLuaSendFile
}

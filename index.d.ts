declare module "transferlua";

export class TransferLua {
    constructor(indelTargetName: string, options: any);
    opened(): boolean;
    close(): void;
    sendFile(fileLocation: string, stateName: string, options: any): void;
    sendChunk(scriptName: string, stateName: string, luaChunk: string, options: any): void;
};

export function combineOptions(...args: string): string;
export const OPTION_EXECUTE: string;
export const OPTION_COMPILE_BEFORE: string;

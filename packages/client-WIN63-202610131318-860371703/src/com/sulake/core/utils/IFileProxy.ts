import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export interface IFileProxy {
    clearCache(): void;
    localFilePath(param1: string): string;
    cacheFilePath(param1: string): string;
    loadLocalBitmapData(param1: string, param2: (...args: any[]) => any): void;
    cacheFileExists(param1: string): boolean;
    localFileExists(param1: string): boolean;
    readCache(param1: string): ByteArray;
    readCacheAsync(param1: string, param2: (...args: any[]) => any): void;
    writeCache(param1: string, param2: ByteArray): void;
    writeCacheAsync(param1: string, param2: ByteArray): void;
    deleteCacheDirectory(param1: string): void;
    swapObjectToDisk(param1: any): number;
    swapObjectFromDisk(param1: number): any;
}

import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFileProxy } from '@/com/sulake/core/utils/IFileProxy';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { ErrorEvent } from '@habbo-pixi/runtime/events/ErrorEvent';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { File } from '@habbo-pixi/runtime/filesystem/File';
import { FileStream } from '@habbo-pixi/runtime/filesystem/FileStream';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Logger } from '@/com/sulake/habbo/Logger';

export class FileProxy implements IFileProxy {
    static { registerClassName(this, 'com.sulake.air::FileProxy'); }

    private static readonly LOCAL_FILE_PATH: string = "local_include/";
    private static readonly CACHE_PATH: string = "com.sulake.habbo/";
    private static readonly SWAP_FILE_PATH: string = "com.sulake.habbo/swap/swap_";
    private static _SafeStr_6086: number = 0;

    declare private _SafeStr_3154: Map<any, any>;

    constructor() {
    }

    private static resolveFileFromLocalPath(param1: string): string {
        if (!param1) {
            return null;
        }
        let _loc2_: number = param1.indexOf("local_include/");
        if (_loc2_ != -1) {
            return param1.substr(_loc2_ + "local_include/".length);
        }
        return param1;
    }

    public dispose(): void {
        this._SafeStr_3154 = null;
    }

    public clearCache(): void {
        this.deleteCacheDirectory("");
    }

    public localFilePath(param1: string): string {
        let _loc2_: File = File.applicationDirectory.resolvePath("local_include/" + param1);
        return _loc2_.url;
    }

    public cacheFilePath(param1: string): string {
        let _loc2_: File = File.cacheDirectory.resolvePath("com.sulake.habbo/" + param1);
        return _loc2_.url;
    }

    public loadLocalBitmapData(param1: string, param2: (...args: any[]) => any): void {
        this.addCallback(param1, param2);
        let _loc3_: Loader = new Loader();
        _loc3_.contentLoaderInfo.addEventListener("complete", this.onLocalFileComplete);
        _loc3_.contentLoaderInfo.addEventListener("error", this.onLocalFileError);
        _loc3_.contentLoaderInfo.addEventListener("ioError", this.onLocalFileError);
        _loc3_.load(new URLRequest(this.localFilePath(param1)));
    }

    public cacheFileExists(param1: string): boolean {
        let _loc2_: File = null;
        try {
            if (!File.cacheDirectory) {
                return false;
            }
            _loc2_ = File.cacheDirectory.resolvePath("com.sulake.habbo/" + param1);
            if (_loc2_ && _loc2_.exists) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    public localFileExists(param1: string): boolean {
        let _loc2_: File = null;
        try {
            _loc2_ = File.applicationDirectory.resolvePath("local_include/" + param1);
            if (_loc2_ && _loc2_.exists) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    public readCache(param1: string): ByteArray {
        let _loc2_: File = null;
        let _loc4_: ByteArray = null;
        let _loc3_: FileStream = null;
        try {
            if (!File.cacheDirectory) {
                return null;
            }
            _loc2_ = File.cacheDirectory.resolvePath("com.sulake.habbo/" + param1);
            if (!_loc2_ || !_loc2_.exists) {
                return null;
            }
            Logger.log("[FileProxy] Read file " + _loc2_.nativePath);
            _loc4_ = new ByteArray();
            _loc3_ = new FileStream();
            _loc3_.open(_loc2_, "read");
            _loc3_.readBytes(_loc4_);
            _loc3_.close();
            return _loc4_;
        } catch (e) {
            Logger.log("[FileProxy] File reading error: " + e);
        }
        return null;
    }

    public readCacheAsync(param1: string, param2: (...args: any[]) => any): void {
        let file: File;
        let stream: FileStream;
        let path: string = param1;
        let callback: (...args: any[]) => any = param2;
        try {
            if (!File.cacheDirectory) {
                callback(null);
                return;
            }
            file = File.cacheDirectory.resolvePath("com.sulake.habbo/" + path);
            if (!file || !file.exists) {
                callback(null);
                return;
            }
            Logger.log("[FileProxy] Read file " + file.nativePath);
            stream = new FileStream();
            stream.openAsync(file, "read");
            stream.addEventListener("complete", (param1: Event): void => {
                let _loc2_: ByteArray = new ByteArray();
                stream.readBytes(_loc2_);
                callback(_loc2_);
                stream.close();
            });
        } catch (e) {
            Logger.log("[FileProxy] File reading error: " + e);
            callback(null);
        }
    }

    public writeCache(param1: string, param2: ByteArray): void {
        let _loc3_: File = null;
        let _loc4_: FileStream = null;
        try {
            if (!File.cacheDirectory) {
                return;
            }
            _loc3_ = File.cacheDirectory.resolvePath("com.sulake.habbo/" + param1);
            _loc4_ = new FileStream();
            _loc4_.open(_loc3_, "write");
            _loc4_.writeBytes(param2);
            _loc4_.close();
            Logger.log("[FileProxy] Wrote file " + _loc3_.nativePath);
        } catch (e) {
            Logger.log("[FileProxy] File writing error: " + e);
        }
    }

    public writeCacheAsync(param1: string, param2: ByteArray): void {
        let _loc3_: File = null;
        let _loc4_: FileStream = null;
        try {
            if (!File.cacheDirectory) {
                return;
            }
            _loc3_ = File.cacheDirectory.resolvePath("com.sulake.habbo/" + param1);
            _loc4_ = new FileStream();
            _loc4_.openAsync(_loc3_, "write");
            _loc4_.writeBytes(param2);
            _loc4_.close();
            Logger.log("[FileProxy] Wrote file " + _loc3_.nativePath);
        } catch (e) {
            Logger.log("[FileProxy] File writing error: " + e);
        }
    }

    public deleteCacheDirectory(param1: string): void {
        let _loc2_: File = null;
        try {
            if (!File.cacheDirectory) {
                return;
            }
            _loc2_ = File.cacheDirectory.resolvePath("com.sulake.habbo/" + param1);
            if (_loc2_.exists && Boolean(_loc2_.isDirectory)) {
                _loc2_.deleteDirectory(true);
                Logger.log("[FileProxy] Deleted directory " + _loc2_.nativePath);
            }
        } catch (e) {
            Logger.log("[FileProxy] File deleting error: " + e);
        }
    }

    private onLocalFileComplete = (param1: Event): void => {
        let _loc2_: string = FileProxy.resolveFileFromLocalPath(stringOrNull(param1.target.url));
        let _loc3_: BitmapData = (asInstanceOf(param1.target.content, Bitmap)).bitmapData;
        this.doCallbacks(_loc2_, _loc3_);
    };

    private onLocalFileError = (param1: Event): void => {
        let _loc3_: string = null;
        let _loc2_: string = FileProxy.resolveFileFromLocalPath(stringOrNull(param1.target.url));
        if (param1.type == "ioError") {
            _loc3_ = "IOError: " + (param1 instanceof IOErrorEvent ? param1 : null).text;
        } else if (param1 instanceof ErrorEvent) {
            _loc3_ = "Error: " + (param1 instanceof ErrorEvent ? param1 : null).errorID + "(" + _loc2_ + ")";
        } else {
            _loc3_ = param1.toString();
        }
        Logger.log("[FileProxy] Error when accessing local file! " + _loc3_);
        this.doCallbacks(_loc2_, null);
    };

    private addCallback(param1: string, param2: (...args: any[]) => any): void {
        if (!this._SafeStr_3154) {
            this._SafeStr_3154 = new Dictionary();
        }
        let _loc3_: any[] = this._SafeStr_3154.get(param1);
        if (!_loc3_) {
            _loc3_ = [];
            this._SafeStr_3154.set(param1, _loc3_);
        }
        _loc3_.push(param2);
    }

    private doCallbacks(param1: string, param2: BitmapData): void {
        if (!this._SafeStr_3154) {
            return;
        }
        let _loc4_: any[] = this._SafeStr_3154.get(param1);
        if (!_loc4_) {
            return;
        }
        for (const _loc3_ of _loc4_ ?? []) {
            if (_loc3_ != null) {
                if (param2) {
                    _loc3_(param2.clone());
                } else {
                    _loc3_(null);
                }
            }
        }
        if (param2) {
            param2.dispose();
        }
        this._SafeStr_3154.delete(param1);
    }

    public swapObjectToDisk(param1: any): number {
        let _loc2_: File = null;
        let _loc3_: FileStream = null;
        let _loc4_: number = -1;
        try {
            if (File.cacheDirectory) {
                _loc4_ = ++FileProxy._SafeStr_6086;
                _loc2_ = File.cacheDirectory.resolvePath("com.sulake.habbo/swap/swap_" + _loc4_);
                _loc3_ = new FileStream();
                _loc3_.open(_loc2_, "write");
                _loc3_.writeObject(param1);
                _loc3_.close();
            }
        } catch (e) {
            Logger.log("[FileProxy] Swap in error: " + e);
            _loc4_ = -1;
        }
        return _loc4_;
    }

    public swapObjectFromDisk(param1: number): any {
        let _loc2_: string = null;
        let _loc3_: File = null;
        let _loc4_: FileStream = null;
        let _loc5_: any = null;
        try {
            if (!File.cacheDirectory) {
                return null;
            }
            _loc2_ = "com.sulake.habbo/swap/swap_" + param1;
            _loc3_ = File.cacheDirectory.resolvePath(_loc2_);
            if (!_loc3_ || !_loc3_.exists) {
                return null;
            }
            _loc4_ = new FileStream();
            _loc4_.open(_loc3_, "read");
            _loc5_ = _loc4_.readObject();
            _loc4_.close();
            _loc3_.deleteFileAsync();
            return _loc5_;
        } catch (e) {
            Logger.log("[FileProxy] Swap out error: " + e);
        }
        return null;
    }
}

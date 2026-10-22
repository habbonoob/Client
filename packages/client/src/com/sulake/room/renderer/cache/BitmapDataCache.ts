import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ExtendedBitmapData } from '@/com/sulake/room/renderer/utils/ExtendedBitmapData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { BitmapDataCacheItem } from '@/com/sulake/room/renderer/cache/BitmapDataCacheItem';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class BitmapDataCache {
    static { registerClassName(this, 'com.sulake.room.renderer.cache::BitmapDataCache'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        BitmapDataCache.#initStatics();
        return BitmapDataCache._log;
    }

    constructor(param1: number, param2: number, param3: number = 1) {
        this._SafeStr_2709 = new UtilsMap();
        this._memLimit = param1 * 1024 * 1024;
        this._SafeStr_5741 = param2 * 1024 * 1024;
        this._SafeStr_4614 = param3 * 1024 * 1024;
        if (this._SafeStr_4614 < 0) {
            this._SafeStr_4614 = 0;
        }
    }

    declare private _SafeStr_2709: UtilsMap;

    private _memUsage: number = 0;
    private _SafeStr_5741: number = 0;
    private _SafeStr_4614: number = 0;
    private _memLimit: number = 0;

    public get memLimit(): number {
        return this._memLimit;
    }

    public get memUsage(): number {
        return this._memUsage;
    }

    public dispose(): void {
        let _loc1_: any[] = null;
        if (this._SafeStr_2709 != null) {
            _loc1_ = this._SafeStr_2709.getKeys();
            for (const _loc2_ of _loc1_ ?? []) {
                if (!this.removeItem(stringOrNull(_loc2_))) {
                    BitmapDataCache._log.warn("Failed to remove item " + _loc2_ + " from room canvas bitmap cache!");
                }
            }
            this._SafeStr_2709.dispose();
            this._SafeStr_2709 = null;
        }
    }

    public compress(): void {
        let _loc1_: any[] = null;
        let _loc2_: BitmapDataCacheItem = null;
        let _loc3_: number = 0;
        if (this.memUsage > this.memLimit) {
            _loc1_ = this._SafeStr_2709.getValues();
            _loc1_.sort((a, b) => a.useCount - b.useCount);
            _loc1_.reverse();
            _loc3_ = _loc1_.length - 1;
            while (_loc3_ >= 0) {
                _loc2_ = asInstanceOf(_loc1_[_loc3_], BitmapDataCacheItem);
                if (_loc2_.useCount > 1) {
                    break;
                }
                this.removeItem(_loc2_.name);
                _loc3_--;
            }
            this.increaseMemoryLimit();
        }
    }

    public getBitmapData(param1: string): ExtendedBitmapData {
        let _loc2_: BitmapDataCacheItem = asInstanceOf(this._SafeStr_2709.getValue(param1), BitmapDataCacheItem);
        if (_loc2_ == null) {
            return null;
        }
        let _loc3_: ExtendedBitmapData = _loc2_.bitmapData;
        if (_loc3_ != null && _loc3_.disposed) {
            this._SafeStr_2709.remove(_loc2_.name);
            this._memUsage -= _loc2_.memUsage;
            _loc2_.dispose();
            return null;
        }
        return _loc3_;
    }

    public addBitmapData(param1: string, param2: ExtendedBitmapData): void {
        let _loc4_: BitmapData = null;
        if (param2 == null || param2.width <= 0 || param2.height <= 0) {
            return;
        }
        if (param2.disposed) {
            return;
        }
        let _loc3_: BitmapDataCacheItem = asInstanceOf(this._SafeStr_2709.getValue(param1), BitmapDataCacheItem);
        if (_loc3_ != null) {
            if (_loc3_.bitmapData == param2) {
                return;
            }
            _loc4_ = _loc3_.bitmapData;
            if (_loc4_ != null) {
                this._memUsage -= _loc4_.width * _loc4_.height * 4;
            }
            _loc3_.bitmapData = param2;
        } else {
            _loc3_ = new BitmapDataCacheItem(param2, param1);
            this._SafeStr_2709.add(param1, _loc3_);
        }
        this._memUsage += param2.width * param2.height * 4;
    }

    private increaseMemoryLimit(): void {
        this._memLimit += this._SafeStr_4614;
        if (this._memLimit > this._SafeStr_5741) {
            this._memLimit = this._SafeStr_5741;
        }
    }

    private removeItem(param1: string): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc2_: BitmapDataCacheItem = asInstanceOf(this._SafeStr_2709.getValue(param1), BitmapDataCacheItem);
        if (_loc2_ != null) {
            if (_loc2_.useCount <= 1) {
                this._SafeStr_2709.remove(_loc2_.name);
                this._memUsage -= _loc2_.memUsage;
                _loc2_.dispose();
                return true;
            }
            return false;
        }
        return false;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BitmapDataCache.#staticsReady) return;
        BitmapDataCache.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BitmapDataCache, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.room.renderer.cache.BitmapDataCache"));
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ExtendedBitmapData } from '@/com/sulake/room/renderer/utils/ExtendedBitmapData';

export class BitmapDataCacheItem {
    static { registerClassName(this, 'com.sulake.room.renderer.cache::BitmapDataCacheItem'); }

    constructor(param1: ExtendedBitmapData, param2: string) {
        this._bitmapData = param1;
        this._name = param2;
        if (param1 != null) {
            param1.addReference();
            this._memUsage = this._bitmapData.width * this._bitmapData.height * 4;
        }
    }

    private _memUsage: number = 0;
    private _bitmapData: ExtendedBitmapData = null;

    public get bitmapData(): ExtendedBitmapData {
        return this._bitmapData;
    }

    public set bitmapData(param1: ExtendedBitmapData) {
        if (this._bitmapData == param1) {
            return;
        }
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
        }
        this._bitmapData = param1;
        if (this._bitmapData != null) {
            this._bitmapData.addReference();
            this._memUsage = this._bitmapData.width * this._bitmapData.height * 4;
        } else {
            this._memUsage = 0;
        }
    }

    private _name: string = "";

    public get name(): string {
        return this._name;
    }

    public get memUsage(): number {
        return this._memUsage;
    }

    public get useCount(): number {
        if (this._bitmapData == null) {
            return 0;
        }
        return this._bitmapData.referenceCount;
    }

    public dispose(): void {
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
        this._memUsage = 0;
    }
}

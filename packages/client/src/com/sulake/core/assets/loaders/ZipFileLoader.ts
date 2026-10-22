import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { URLStream } from '@habbo-pixi/runtime/net/URLStream';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { IAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import { AssetLoader } from '@/com/sulake/core/runtime/Component.group';

export class ZipFileLoader extends AssetLoader implements IAssetLoader {
    static { registerClassName(this, 'com.sulake.core.assets.loaders::ZipFileLoader'); }

    constructor(param1: string, param2: URLRequest = null, param3: number = -1) {
        super();
        this._SafeStr_2991 = param2 != null ? param2.url : null;
        this._type = param1;
        this._SafeStr_2324 = new URLStream();
        this._SafeStr_2324.addEventListener("complete", this.loadEventHandler);
        this._SafeStr_2324.addEventListener("httpStatus", this.loadEventHandler);
        this._SafeStr_2324.addEventListener("ioError", this.loadEventHandler);
        this._SafeStr_2324.addEventListener("open", this.loadEventHandler);
        this._SafeStr_2324.addEventListener("progress", this.loadEventHandler);
        this._SafeStr_2324.addEventListener("securityError", this.loadEventHandler);
        this._id = param3;
        if (param2 != null) {
            this.load(param2);
        }
    }

    declare protected _SafeStr_2991: string;

    declare protected _type: string;

    declare protected _SafeStr_2324: URLStream;

    declare protected _data: ByteArray;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get content(): any {
        return this._data ? this._data : this._SafeStr_2324;
    }

    public get bytes(): ByteArray {
        if (this._data) {
            return this._data;
        }
        let _loc1_: ByteArray = new ByteArray();
        this._SafeStr_2324.readBytes(_loc1_);
        return _loc1_;
    }

    public get mimeType(): string {
        return this._type;
    }

    public get bytesLoaded(): number {
        return this._SafeStr_2324.bytesAvailable;
    }

    public get bytesTotal(): number {
        return this._SafeStr_2324.bytesAvailable;
    }

    public get id(): number {
        return this._id;
    }

    public override dispose(): void {
        if (!this._disposed) {
            super.dispose();
            this._SafeStr_2324.removeEventListener("complete", this.loadEventHandler);
            this._SafeStr_2324.removeEventListener("httpStatus", this.loadEventHandler);
            this._SafeStr_2324.removeEventListener("ioError", this.loadEventHandler);
            this._SafeStr_2324.removeEventListener("open", this.loadEventHandler);
            this._SafeStr_2324.removeEventListener("progress", this.loadEventHandler);
            this._SafeStr_2324.removeEventListener("securityError", this.loadEventHandler);
            this._SafeStr_2324.close();
            this._SafeStr_2324 = null;
            this._type = null;
            this._SafeStr_2991 = null;
        }
    }

    public load(param1: URLRequest): void {
        this._SafeStr_2991 = param1.url;
        this._SafeStr_2324.load(param1);
    }

    get [IAssetLoader](): true {
        return true;
    }
}

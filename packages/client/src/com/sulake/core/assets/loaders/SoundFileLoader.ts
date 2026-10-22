import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Sound } from '@habbo-pixi/runtime/media/Sound';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { IAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import { AssetLoader } from '@/com/sulake/core/runtime/Component.group';

export class SoundFileLoader extends AssetLoader implements IAssetLoader {
    static { registerClassName(this, 'com.sulake.core.assets.loaders::SoundFileLoader'); }

    constructor(param1: string, param2: URLRequest = null, param3: number = -1) {
        super();
        this._SafeStr_2991 = param2 != null ? param2.url : null;
        this._type = param1;
        this._SafeStr_2312 = new Sound(null, null);
        this._SafeStr_2312.addEventListener("id3", this.loadEventHandler);
        this._SafeStr_2312.addEventListener("open", this.loadEventHandler);
        this._SafeStr_2312.addEventListener("complete", this.loadEventHandler);
        this._SafeStr_2312.addEventListener("ioError", this.loadEventHandler);
        this._SafeStr_2312.addEventListener("progress", this.loadEventHandler);
        this._id = param3;
        if (param2 != null) {
            this.load(param2);
        }
    }

    declare protected _SafeStr_2991: string;

    declare protected _type: string;

    declare protected _SafeStr_2312: Sound;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get content(): any {
        return this._SafeStr_2312;
    }

    public get bytes(): ByteArray {
        let _loc1_: ByteArray = new ByteArray();
        this._SafeStr_2312.extract(_loc1_, this._SafeStr_2312.length);
        return _loc1_;
    }

    public get mimeType(): string {
        return this._type;
    }

    public get bytesLoaded(): number {
        return (this._SafeStr_2312 ? this._SafeStr_2312.bytesLoaded : 0) >>> 0;
    }

    public get bytesTotal(): number {
        return (this._SafeStr_2312 ? this._SafeStr_2312.bytesTotal : 0) >>> 0;
    }

    public get id(): number {
        return this._id;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this._SafeStr_2312.removeEventListener("id3", this.loadEventHandler);
            this._SafeStr_2312.removeEventListener("open", this.loadEventHandler);
            this._SafeStr_2312.removeEventListener("complete", this.loadEventHandler);
            this._SafeStr_2312.removeEventListener("ioError", this.loadEventHandler);
            this._SafeStr_2312.removeEventListener("progress", this.loadEventHandler);
            this._SafeStr_2312 = null;
            this._type = null;
            this._SafeStr_2991 = null;
            super.dispose();
        }
    }

    public load(param1: URLRequest): void {
        this._SafeStr_2991 = param1.url;
        this._SafeStr_2312.load(param1, null);
    }

    get [IAssetLoader](): true {
        return true;
    }
}

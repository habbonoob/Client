import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';

export class CachedAssetLoader extends EventDispatcherWrapper implements IAssetLoader {
    static { registerClassName(this, 'com.sulake.core.assets.loaders::CachedAssetLoader'); }

    declare private _SafeStr_2991: string;

    declare private _content: any;

    declare private _mimeType: string;

    declare private _bytes: ByteArray;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    constructor(param1: string, param2: string, param3: any, param4: ByteArray = null, param5: number = -1) {
        super();
        this._SafeStr_2991 = param1;
        this._mimeType = param2;
        this._content = param3;
        this._id = param5;
        this._bytes = param4 ?? this.buildBytes(param3);
        if (this._bytes != null) {
            this._bytes.position = 0;
        }
    }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get content(): any {
        return this._content;
    }

    public get bytes(): ByteArray {
        return this._bytes;
    }

    public get mimeType(): string {
        return this._mimeType;
    }

    public get bytesLoaded(): number {
        return (this._bytes ? this._bytes.length : 0) >>> 0;
    }

    public get bytesTotal(): number {
        return (this._bytes ? this._bytes.length : 0) >>> 0;
    }

    public get errorCode(): number {
        return 0;
    }

    public get id(): number {
        return this._id;
    }

    public load(param1: URLRequest): void {
        if (param1 != null) {
            this._SafeStr_2991 = param1.url;
        }
    }

    public override dispose(): void {
        if (!this.disposed) {
            this._content = null;
            this._bytes = null;
            super.dispose();
        }
    }

    private buildBytes(param1: any): ByteArray {
        if (param1 instanceof ByteArray) {
            return param1 instanceof ByteArray ? param1 : null;
        }
        let _loc2_: ByteArray = new ByteArray();
        if (param1 instanceof XML) {
            _loc2_.writeUTFBytes(XML.from(param1).toXMLString());
        } else if (param1 != null) {
            _loc2_.writeUTFBytes(String(param1));
        }
        return _loc2_;
    }

    get [IAssetLoader](): true {
        return true;
    }
}

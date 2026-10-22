import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import type { ILazyAsset } from '@/com/sulake/core/assets/ILazyAsset';
import { System } from '@habbo-pixi/runtime/system/System';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class XmlAsset implements ILazyAsset {
    static { registerClassName(this, 'com.sulake.core.assets::XmlAsset'); }

    constructor(param1: AssetTypeDeclaration, param2: string = null) {
        this._decl = param1;
        this._SafeStr_2991 = param2;
    }

    declare private _SafeStr_2181: any;

    declare private _decl: AssetTypeDeclaration;

    declare private _SafeStr_2991: string;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _content: XML;

    public get content(): any {
        if (!this._content) {
            this.prepareLazyContent();
        }
        return this._content;
    }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get declaration(): AssetTypeDeclaration {
        return this._decl;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
            System.disposeXML(this._content);
            this._content = null;
            this._SafeStr_2181 = null;
            this._decl = null;
            this._SafeStr_2991 = null;
        }
    }

    public setUnknownContent(param1: any): void {
        this._content = null;
        this._SafeStr_2181 = param1;
    }

    public prepareLazyContent(): void {
        let _loc1_: ByteArray = null;
        if (typeof this._SafeStr_2181 === "function") {
            _loc1_ = asInstanceOf(new (typeof this._SafeStr_2181 === "function" ? this._SafeStr_2181 : null)(), ByteArray);
            this._content = new XML(_loc1_.readUTFBytes(_loc1_.length));
            return;
        }
        if (this._SafeStr_2181 instanceof ByteArray) {
            _loc1_ = this._SafeStr_2181 instanceof ByteArray ? this._SafeStr_2181 : null;
            this._content = new XML(_loc1_.readUTFBytes(_loc1_.length));
            return;
        }
        if (typeof this._SafeStr_2181 === "string") {
            this._content = new XML(typeof this._SafeStr_2181 === "string" ? this._SafeStr_2181 : null);
            return;
        }
        if (this._SafeStr_2181 instanceof XML) {
            this._content = this._SafeStr_2181 instanceof XML ? this._SafeStr_2181 : null;
            return;
        }
        if (this._SafeStr_2181 instanceof XmlAsset) {
            this._content = castTo(this._SafeStr_2181, XmlAsset)._content;
        }
    }

    public setFromOtherAsset(param1: IAsset): void {
        if (param1 instanceof XmlAsset) {
            this._content = castTo(param1, XmlAsset)._content;
            return;
        }
        throw Error("Provided asset is not of type XmlAsset!");
    }

    public setParamsDesc(param1: XMLList): void {
    }

    public toString(): string {
        let _loc1_: string = "XmlAsset";
        _loc1_ += " _url:" + this._SafeStr_2991;
        _loc1_ += " _content:" + this._content;
        return _loc1_ + (" _unknown:" + this._SafeStr_2181);
    }

    get [IAsset](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}

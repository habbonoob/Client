import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class TextAsset implements IAsset {
    static { registerClassName(this, 'com.sulake.core.assets::TextAsset'); }

    constructor(param1: AssetTypeDeclaration, param2: string = null) {
        this._decl = param1;
        this._SafeStr_2991 = param2;
    }

    declare private _decl: AssetTypeDeclaration;

    declare private _SafeStr_2991: string;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private _content: string = "";

    public get content(): any {
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
            this._content = null;
            this._decl = null;
            this._SafeStr_2991 = null;
        }
    }

    public setUnknownContent(param1: any): void {
        let _loc2_: ByteArray = null;
        if (typeof param1 === "string") {
            this._content = typeof param1 === "string" ? param1 : null;
            return;
        }
        if (typeof param1 === "function") {
            _loc2_ = asInstanceOf(new (typeof param1 === "function" ? param1 : null)(), ByteArray);
            this._content = _loc2_.readUTFBytes(_loc2_.length);
            return;
        }
        if (param1 instanceof ByteArray) {
            _loc2_ = param1 instanceof ByteArray ? param1 : null;
            this._content = _loc2_.readUTFBytes(_loc2_.length);
            return;
        }
        if (param1 instanceof TextAsset) {
            this._content = castTo(param1, TextAsset)._content;
            return;
        }
        this._content = stringOrNull(param1 ? param1.toString() : "");
    }

    public setFromOtherAsset(param1: IAsset): void {
        if (param1 instanceof TextAsset) {
            this._content = castTo(param1, TextAsset)._content;
            return;
        }
        throw Error("Provided asset is not of type TextAsset!");
    }

    public setParamsDesc(param1: XMLList): void {
    }

    get [IAsset](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}

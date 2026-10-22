import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class DisplayAsset implements IAsset {
    static { registerClassName(this, 'com.sulake.core.assets::DisplayAsset'); }

    declare protected _SafeStr_2991: string;

    declare protected _content: DisplayObject;

    protected _disposed: boolean = false;

    declare protected _declaration: AssetTypeDeclaration;

    constructor(param1: AssetTypeDeclaration, param2: string = null) {
        this._declaration = param1;
        this._SafeStr_2991 = param2;
    }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get content(): any {
        return this._content;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get declaration(): AssetTypeDeclaration {
        return this._declaration;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._content.loaderInfo != null) {
                if (this._content.loaderInfo.loader != null) {
                    this._content.loaderInfo.loader.unload();
                }
            }
            this._content = null;
            this._declaration = null;
            this._disposed = true;
            this._SafeStr_2991 = null;
        }
    }

    public setUnknownContent(param1: any): void {
        if (param1 instanceof DisplayObject) {
            this._content = param1 instanceof DisplayObject ? param1 : null;
            if (this._content != null) {
                return;
            }
            throw new Error("Failed to convert DisplayObject to DisplayAsset!");
        }
        if (param1 instanceof DisplayAsset) {
            this._content = castTo(param1, DisplayAsset)._content;
            this._declaration = castTo(param1, DisplayAsset)._declaration;
            if (this._content == null) {
                throw new Error("Failed to read content from DisplayAsset!");
            }
        }
    }

    public setFromOtherAsset(param1: IAsset): void {
        if (param1 instanceof DisplayAsset) {
            this._content = castTo(param1, DisplayAsset)._content;
            this._declaration = castTo(param1, DisplayAsset)._declaration;
            return;
        }
        throw new Error("Provided asset should be of type DisplayAsset!");
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

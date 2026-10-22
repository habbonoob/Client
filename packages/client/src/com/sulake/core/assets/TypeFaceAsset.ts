import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import type { Font } from '@habbo-pixi/runtime/text/Font';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FontEnum } from '@/com/sulake/core/utils/FontEnum';

export class TypeFaceAsset implements IAsset {
    static { registerClassName(this, 'com.sulake.core.assets::TypeFaceAsset'); }

    constructor(param1: AssetTypeDeclaration, param2: string = null) {
        this._decl = param1;
    }

    declare protected _decl: AssetTypeDeclaration;

    declare protected _content: Font;

    public get content(): any {
        return this._content;
    }

    protected _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get url(): string {
        return null;
    }

    public get declaration(): AssetTypeDeclaration {
        return this._decl;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._decl = null;
            this._content = null;
            this._disposed = true;
        }
    }

    public setUnknownContent(param1: any): void {
        try {
            if (typeof param1 === "function") {
                this._content = FontEnum.registerFont(typeof param1 === "function" ? param1 : null);
            }
        } catch (e) {
            throw new Error("Failed to register font from resource: " + param1);
        }
    }

    public setFromOtherAsset(param1: IAsset): void {
        if (param1 instanceof TypeFaceAsset) {
            this._content = castTo(param1, TypeFaceAsset)._content;
            return;
        }
        throw new Error("Provided asset should be of type FontAsset!");
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

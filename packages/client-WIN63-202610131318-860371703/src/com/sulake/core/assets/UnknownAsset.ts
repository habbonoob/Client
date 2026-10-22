import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class UnknownAsset implements IAsset {
    static { registerClassName(this, 'com.sulake.core.assets::UnknownAsset'); }

    private _disposed: boolean = false;
    private _content: any = null;

    declare private _decl: AssetTypeDeclaration;

    declare private _SafeStr_2991: string;

    constructor(param1: AssetTypeDeclaration, param2: string = null) {
        this._decl = param1;
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
        this._content = param1;
    }

    public setFromOtherAsset(param1: IAsset): void {
        this._content = param1.content;
    }

    public setParamsDesc(param1: XMLList): void {
    }

    public toString(): string {
        return getQualifiedClassName(this) + ": " + this._content;
    }

    get [IAsset](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}

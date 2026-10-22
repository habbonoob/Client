import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import { Sound } from '@habbo-pixi/runtime/media/Sound';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class SoundAsset implements IAsset {
    static { registerClassName(this, 'com.sulake.core.assets::SoundAsset'); }

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

    private _content: Sound = null;

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
        if (param1 instanceof Sound) {
            if (this._content) {
                this._content.close();
            }
            this._content = param1 instanceof Sound ? param1 : null;
            return;
        }
        if (param1 instanceof ByteArray) {
        }
        if (typeof param1 === "function") {
            if (this._content) {
                this._content.close();
            }
            this._content = asInstanceOf(new (typeof param1 === "function" ? param1 : null)(), Sound);
            return;
        }
        if (param1 instanceof SoundAsset) {
            if (this._content) {
                this._content.close();
            }
            this._content = castTo(param1, SoundAsset)._content;
        }
    }

    public setFromOtherAsset(param1: IAsset): void {
        if (param1 instanceof SoundAsset) {
            this._content = castTo(param1, SoundAsset)._content;
        }
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

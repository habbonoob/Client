import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AssetTypeDeclaration {
    static { registerClassName(this, 'com.sulake.core.assets::AssetTypeDeclaration'); }

    declare private _mimeType: string;

    declare private _SafeStr_5973: any;

    declare private _SafeStr_6744: any;

    declare private _fileTypes: any[];

    constructor(param1: string, param2: any, param3: any = null, ...rest: any[]) {
        this._mimeType = param1;
        this._SafeStr_5973 = param2;
        this._SafeStr_6744 = param3;
        if (rest == null) {
            this._fileTypes = [];
        } else {
            this._fileTypes = rest;
        }
    }

    public get mimeType(): string {
        return this._mimeType;
    }

    public get assetClass(): any {
        return this._SafeStr_5973;
    }

    public get loaderClass(): any {
        return this._SafeStr_6744;
    }

    public get fileTypes(): any[] {
        return this._fileTypes;
    }
}

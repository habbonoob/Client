import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AssetTypeDeclaration {
    static { registerClassName(this, 'com.sulake.core.assets::AssetTypeDeclaration'); }

    constructor(param1: string, param2: any, param3: any = null, ...rest: any[]) {
        this._mimeType = param1;
        this._assetClass = param2;
        this._loaderClass = param3;
        if (rest == null) {
            this._fileTypes = [];
        } else {
            this._fileTypes = rest;
        }
    }

    declare private _mimeType: string;

    declare private _assetClass: any;

    declare private _loaderClass: any;

    declare private _fileTypes: any[];

    public get fileTypes(): any[] {
        return this._fileTypes;
    }

    public get mimeType(): string {
        return this._mimeType;
    }

    public get assetClass(): any {
        return this._assetClass;
    }

    public get loaderClass(): any {
        return this._loaderClass;
    }
}

import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGameDataResources } from '@/com/sulake/core/localization/IGameDataResources';

export class GameDataResources implements IGameDataResources {
    static { registerClassName(this, 'com.sulake.core.localization::GameDataResources'); }

    public static parse(param1: string): GameDataResources {
        let _loc2_: any = JSON.parse(param1);
        let _loc4_: GameDataResources = new GameDataResources();
        for (const _loc3_ of valuesOf(_loc2_.hashes)) {
            if (_loc3_.name == "external_texts") {
                _loc4_._SafeStr_6893 = stringOrNull(_loc3_.url);
                _loc4_._externalTextsHash = stringOrNull(_loc3_.hash);
            } else if (_loc3_.name == "external_variables") {
                _loc4_._externalVariablesUrl = stringOrNull(_loc3_.url);
                _loc4_._externalVariablesHash = stringOrNull(_loc3_.hash);
            } else if (_loc3_.name == "furnidata") {
                _loc4_._SafeStr_6071 = stringOrNull(_loc3_.url);
                _loc4_._furniDataHash = stringOrNull(_loc3_.hash);
            } else if (_loc3_.name == "productdata") {
                _loc4_._SafeStr_6526 = stringOrNull(_loc3_.url);
                _loc4_._productDataHash = stringOrNull(_loc3_.hash);
            }
        }
        return _loc4_;
    }

    constructor() {
    }

    declare private _SafeStr_6893: string;

    declare private _externalTextsHash: string;

    declare private _externalVariablesUrl: string;

    declare private _externalVariablesHash: string;

    declare private _SafeStr_6071: string;

    declare private _furniDataHash: string;

    declare private _SafeStr_6526: string;

    declare private _productDataHash: string;

    public isValid(): boolean {
        return !!(this._SafeStr_6893 && this._externalTextsHash && this._externalVariablesUrl && this._externalVariablesHash && this._SafeStr_6071 && this._furniDataHash && this._SafeStr_6526 && this._productDataHash);
    }

    public getExternalTextsUrl(): string {
        return this._SafeStr_6893;
    }

    public getExternalTextsHash(): string {
        return this._externalTextsHash;
    }

    public getExternalVariablesUrl(): string {
        return this._externalVariablesUrl;
    }

    public getExternalVariablesHash(): string {
        return this._externalVariablesHash;
    }

    public getFurniDataUrl(): string {
        return this._SafeStr_6071;
    }

    public getFurniDataHash(): string {
        return this._furniDataHash;
    }

    public getProductDataUrl(): string {
        return this._SafeStr_6526;
    }

    public getProductDataHash(): string {
        return this._productDataHash;
    }
}

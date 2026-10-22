import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ILocalizationDefinition } from '@/com/sulake/core/localization/ILocalizationDefinition';

export class LocalizationDefinition implements ILocalizationDefinition {
    static { registerClassName(this, 'com.sulake.core.localization::LocalizationDefinition'); }

    constructor(param1: string, param2: string, param3: string) {
        let _loc4_: any[] = param1.split("_");
        this._languageCode = stringOrNull(_loc4_[0]);
        let _loc5_: any[] = String(_loc4_[1]).split(".");
        this._countryCode = stringOrNull(_loc5_[0]);
        this._encoding = stringOrNull(_loc5_[1]);
        this._name = param2;
        this._SafeStr_2991 = param3;
    }

    declare private _encoding: string;

    declare private _SafeStr_2991: string;

    declare private _languageCode: string;

    public get languageCode(): string {
        return this._languageCode;
    }

    declare private _countryCode: string;

    public get countryCode(): string {
        return this._countryCode;
    }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get id(): string {
        return this._languageCode + "_" + this._countryCode + "." + this._encoding;
    }

    public get encoding(): string {
        return this._encoding;
    }

    public get url(): string {
        return this._SafeStr_2991;
    }

    get [ILocalizationDefinition](): true {
        return true;
    }
}

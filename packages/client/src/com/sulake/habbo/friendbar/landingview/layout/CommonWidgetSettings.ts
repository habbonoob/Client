import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';

export class CommonWidgetSettings {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout::CommonWidgetSettings'); }

    private static readonly TEXTCOLOR_DEFAULT: number = 4278190080;
    private static readonly ETCHINGCOLOR_DEFAULT: number = 4294967295;
    private static readonly ETCHINGPOSITION_DEFAULT: string = "bottom";
    private static readonly _SafeStr_7796: string = "landing.view.common.textcolor";
    private static readonly ETCHINGCOLOR_CONFIGURATION_KEY: string = "landing.view.common.etchingcolor";
    private static readonly ETCHINGPOSITION_CONFIGURATION_KEY: string = "landing.view.common.etchingposition";

    constructor(param1: ICoreConfiguration) {
        if (param1.getProperty("landing.view.common.textcolor") != "") {
            this._textColor = parseInt(param1.getProperty("landing.view.common.textcolor"), 16) >>> 0;
        }
        if (param1.getProperty("landing.view.common.etchingcolor") != "") {
            this._etchingColor = parseInt(param1.getProperty("landing.view.common.etchingcolor"), 16) >>> 0;
        }
        if (param1.getProperty("landing.view.common.etchingposition") != "") {
            this._etchingPosition = param1.getProperty("landing.view.common.etchingposition");
        }
    }

    private _etchingPosition: string = "bottom";
    private _textColor: number = 4278190080;

    public get textColor(): number {
        return this._textColor;
    }

    private _etchingColor: number = 4294967295;

    public get etchingColor(): number {
        return this._etchingColor;
    }

    public get isTextColorSet(): boolean {
        return this._textColor != 4278190080;
    }

    public get isEtchingColorSet(): boolean {
        return this._etchingColor != 4294967295;
    }

    public get isEtchingPositionSet(): boolean {
        return this._etchingPosition != "bottom";
    }

    public get etchingPosition(): string {
        return this._etchingPosition;
    }
}

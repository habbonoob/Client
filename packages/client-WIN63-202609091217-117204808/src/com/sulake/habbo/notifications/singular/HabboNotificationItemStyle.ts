import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class HabboNotificationItemStyle {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::HabboNotificationItemStyle'); }

    declare private _icon: BitmapData;

    declare private _SafeStr_5113: boolean;
    static { (this.prototype as any)._SafeStr_5113 = false; }

    declare private _iconSrc: string;

    declare private _internalLink: string;

    declare private _iconAssetUri: string;

    declare private _customLayout: string;

    declare private _customView: string;

    declare private _extraData: any;

    declare private _styleName: string;

    constructor(param1: UtilsMap, param2: BitmapData, param3: string, param4: boolean, param5: string, param6: any, param7: string) {
        this._iconAssetUri = param3;
        if (param1 != null && param3 == null) {
            this._icon = param1["icon"];
            this._internalLink = stringOrNull(param1["internallink"]);
            this._customLayout = stringOrNull(param1["customlayout"]);
            this._customView = stringOrNull(param1["customview"]);
        }
        if (param2 != null) {
            this._icon = param2;
            this._SafeStr_5113 = param4;
        } else {
            this._SafeStr_5113 = false;
        }
        this._iconSrc = param5;
        this._extraData = param6;
        this._styleName = param7;
    }

    public dispose(): void {
        if (this._SafeStr_5113 && this._icon != null) {
            this._icon.dispose();
            this._icon = null;
        }
    }

    public get icon(): BitmapData {
        return this._icon;
    }

    public get internalLink(): string {
        return this._internalLink;
    }

    public set internalLink(param1: string) {
        this._internalLink = param1;
    }

    public get iconSrc(): string {
        return this._iconSrc;
    }

    public get iconAssetUri(): string {
        return this._iconAssetUri;
    }

    public get customLayout(): string {
        return this._customLayout;
    }

    public get customView(): string {
        return this._customView;
    }

    public get extraData(): any {
        return this._extraData;
    }

    public get styleName(): string {
        return this._styleName;
    }
}

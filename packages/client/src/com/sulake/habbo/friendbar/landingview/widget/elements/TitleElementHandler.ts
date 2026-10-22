import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { IFloatingElement } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IFloatingElement';

export class TitleElementHandler implements IElementHandler, IFloatingElement {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::TitleElementHandler'); }

    constructor() {
    }

    private _SafeStr_6394: boolean = false;

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        let _loc5_: IWindowContainer = castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc6_: string = stringOrNull(param3[1]);
        this._SafeStr_6394 = param3.length > 2 ? param3[2] == "true" : false;
        _loc5_.findChildByName("title_txt").caption = "${" + _loc6_ + "}";
        HabboLandingView.positionAfterAndStretch(_loc5_, "title_txt", "hdr_line");
    }

    public isFloating(param1: boolean): boolean {
        return param1 || this._SafeStr_6394;
    }

    public refresh(): void {
    }

    get [IElementHandler](): true {
        return true;
    }

    get [IFloatingElement](): true {
        return true;
    }
}

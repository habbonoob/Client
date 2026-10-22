import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { AlertView } from '@/com/sulake/habbo/navigator/AlertView';

export class SimpleAlertView extends AlertView {
    static { registerClassName(this, 'com.sulake.habbo.navigator::SimpleAlertView'); }

    declare private _text: string;

    constructor(param1: IHabboTransitionalNavigator, param2: string, param3: string) {
        super(param1, "nav_simple_alert", param2);
        this._text = param3;
    }

    public override setupAlertWindow(param1: IFrameWindow): void {
        let _loc3_: IWindowContainer = param1.content;
        castGuarded(_loc3_.findChildByName("body_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = this._text;
        let _loc2_: IWindow = _loc3_.findChildByName("ok");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onOk);
        }
        param1.tags.push("SimpleAlertView");
    }

    private onOk = (param1: WindowMouseEvent): void => {
        this.dispose();
    };
}

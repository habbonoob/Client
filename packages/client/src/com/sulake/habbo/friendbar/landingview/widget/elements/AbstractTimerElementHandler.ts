import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import type { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { IFloatingElement } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IFloatingElement';
import { ILayoutNameProvider } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/ILayoutNameProvider';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';

export class AbstractTimerElementHandler implements IElementHandler, IDisposable, IFloatingElement, ILayoutNameProvider {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::AbstractTimerElementHandler'); }

    constructor() {
    }

    declare private _window: IWindowContainer;

    declare private _SafeStr_5529: boolean;
    static { (this.prototype as any)._SafeStr_5529 = false; }

    declare private _timeRemainingKey: string;

    declare private _expiredKey: string;

    declare private _landingView: HabboLandingView;

    public get landingView(): HabboLandingView {
        return this._landingView;
    }

    public get layoutName(): string {
        return "element_timer";
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public isFloating(param1: boolean): boolean {
        return this._SafeStr_5529;
    }

    public dispose(): void {
        this._landingView = null;
        this._window = null;
    }

    public refresh(): void {
    }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        this._landingView = param1;
        this._window = castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_5529 = param3[1] == "true";
        this._timeRemainingKey = stringOrNull(param3[4]);
        this._expiredKey = stringOrNull(param3[5]);
        this.setCaption(null);
        if (this._SafeStr_5529) {
            this._window.x = param3[2] | 0;
            this._window.y = param3[3] | 0;
        }
    }

    protected setTimer(param1: number): void {
        let _loc2_: IWidgetWindow = castGuarded(this._window.findChildByName("countdown_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        _loc2_.visible = param1 > 0;
        let _loc3_: ICountdownWidget = castGuarded(_loc2_.widget, isICountdownWidget, "com.sulake.habbo.window.widgets.ICountdownWidget");
        _loc3_.seconds = param1;
        this.setCaption(param1 > 0 ? this._timeRemainingKey : this._expiredKey);
    }

    private setCaption(param1: string): void {
        let _loc3_: IWindow = this._window.findChildByName("timer_caption_txt");
        let _loc2_: boolean = param1 != null && param1 != "";
        _loc3_.visible = _loc2_;
        if (_loc2_) {
            _loc3_.caption = "${" + param1 + "}";
        }
    }

    get [IElementHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IFloatingElement](): true {
        return true;
    }

    get [ILayoutNameProvider](): true {
        return true;
    }
}

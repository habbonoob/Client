import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { ILayoutNameProvider } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/ILayoutNameProvider';

export class AbstractButtonElementHandler implements IElementHandler, IDisposable, ILayoutNameProvider {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::AbstractButtonElementHandler'); }

    declare private _landingView: HabboLandingView;

    declare private _window: IWindow;

    constructor() {
    }

    public get layoutName(): string {
        return "element_button";
    }

    public dispose(): void {
        this._landingView = null;
        this._window = null;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        this._landingView = param1;
        this._window = param2;
        let _loc5_: string = stringOrNull(param3[1]);
        param2.procedure = this.onButton;
        param2.caption = "${" + _loc5_ + "}";
    }

    private onButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.onClick();
        }
    };

    protected onClick(): void {
    }

    public refresh(): void {
    }

    public get landingView(): HabboLandingView {
        return this._landingView;
    }

    public get window(): IWindow {
        return this._window;
    }

    get [IElementHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [ILayoutNameProvider](): true {
        return true;
    }
}

import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class SafetyQuizPromoWidget implements ILandingViewWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::SafetyQuizPromoWidget'); }

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("safety_quiz_promo"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._container.procedure = this.widgetProcedure;
        this.refresh();
    }

    private widgetProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && param2.name == "safety_quiz_button") {
            this._landingView.habboHelp.showSafetyBooklet();
        }
    };

    public refresh(): void {
        if (this._container != null && !this._container.disposed) {
            castGuarded(castGuarded(this._container.findChildByName("avatar"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = this._landingView.sessionDataManager.figure;
        }
    }

    public get container(): IWindow {
        return this._container;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._container != null) {
                this._container.dispose();
                this._container = null;
            }
            this._landingView = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}

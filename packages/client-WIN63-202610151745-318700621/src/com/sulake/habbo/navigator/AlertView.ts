import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class AlertView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator::AlertView'); }

    private static _SafeStr_3599: Map<any, any> = new Dictionary();

    declare private _navigator: IHabboTransitionalNavigator;

    declare protected _SafeStr_2594: IFrameWindow;

    declare protected _xmlFileName: string;

    declare protected _title: string;

    declare protected _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IHabboTransitionalNavigator, param2: string, param3: string = null) {
        this._navigator = param1;
        this._xmlFileName = param2;
        this._title = param3;
    }

    public static findAlertView(param1: IWindow): AlertView {
        if (AlertView._SafeStr_3599 != null) {
            for (const _loc2_ of AlertView._SafeStr_3599?.values() ?? []) {
                if (_loc2_._SafeStr_2594 == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public show(): void {
        let _loc2_: AlertView = asInstanceOf(AlertView._SafeStr_3599.get(this._xmlFileName), AlertView);
        if (_loc2_ != null) {
            _loc2_.dispose();
        }
        this._SafeStr_2594 = this.getAlertWindow();
        if (this._title != null) {
            this._SafeStr_2594.caption = this._title;
        }
        this.setupAlertWindow(this._SafeStr_2594);
        let _loc1_: Rectangle = Util.getLocationRelativeTo(this._SafeStr_2594.desktop, this._SafeStr_2594.width, this._SafeStr_2594.height);
        this._SafeStr_2594.x = _loc1_.x | 0;
        this._SafeStr_2594.y = _loc1_.y | 0;
        AlertView._SafeStr_3599.set(this._xmlFileName, this);
        this._SafeStr_2594.activate();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (AlertView._SafeStr_3599.get(this._xmlFileName) == this) {
            AlertView._SafeStr_3599.set(this._xmlFileName, null);
        }
        this._disposed = true;
        if (this._SafeStr_2594 != null) {
            this._SafeStr_2594.destroy();
            this._SafeStr_2594 = null;
        }
        this._navigator = null;
    }

    public setupAlertWindow(param1: IFrameWindow): void {
    }

    public onClose = (param1: WindowMouseEvent): void => {
        this.dispose();
    };

    private getAlertWindow(): IFrameWindow {
        let _loc2_: IFrameWindow = asGuarded(this._navigator.getXmlWindow(this._xmlFileName, 2), isIFrameWindow);
        let _loc1_: IWindow = _loc2_.findChildByTag("close");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.onClose);
        }
        return _loc2_;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get navigator(): IHabboTransitionalNavigator {
        return this._navigator;
    }

    get [IDisposable](): true {
        return true;
    }
}

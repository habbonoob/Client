import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BadgesModel } from '@/com/sulake/habbo/inventory/badges/BadgesModel';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class Badge {
    static { registerClassName(this, 'com.sulake.habbo.inventory.badges::Badge'); }

    private static readonly THUMB_COLOR_NORMAL: number = 13421772;
    private static readonly THUMB_COLOR_UNSEEN: number = 10275685;
    public static _SafeStr_4265: IWindowContainer;

    constructor(param1: BadgesModel, param2: string, param3: string, param4: string, param5: boolean) {
        this._SafeStr_2134 = param1;
        this._badgeId = param2;
        this._name = param3;
        this._desc = param4;
        this._isUnseen = param5;
        this.isSelected = false;
    }

    private _isInitialized: boolean = false;

    declare private _badgeId: string;

    declare private _isInUse: boolean;
    static { (this.prototype as any)._isInUse = false; }

    declare private _isSelected: boolean;
    static { (this.prototype as any)._isSelected = false; }

    declare private _SafeStr_3024: IWindow;

    declare private _name: string;

    declare private _desc: string;

    declare private _SafeStr_2134: BadgesModel;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        if (!this._isInitialized) {
            this.initWindow();
        }
        return this._window;
    }

    declare private _isUnseen: boolean;
    static { (this.prototype as any)._isUnseen = false; }

    public set isUnseen(param1: boolean) {
        if (this._isUnseen != param1) {
            this._isUnseen = param1;
            this.isSelected = this._isSelected;
        }
    }

    public get badgeId(): string {
        return this._badgeId;
    }

    public get badgeName(): string {
        return this._name;
    }

    public get badgeDescription(): string {
        return this._desc;
    }

    public get isInUse(): boolean {
        return this._isInUse;
    }

    public set isInUse(param1: boolean) {
        this._isInUse = param1;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(param1: boolean) {
        this._isSelected = param1;
        if (this._SafeStr_3024 == null || this._window == null) {
            return;
        }
        this._SafeStr_3024.color = (this._isUnseen ? 10275685 : 13421772) >>> 0;
        this._window.findChildByName("outline").visible = param1;
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private initWindow(): void {
        this._window = asGuarded(Badge._SafeStr_4265.clone(), isIWindowContainer);
        castGuarded(castGuarded(this._window.findChildByName("badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = this.badgeId;
        this._window.findChildByName("badge").visible = true;
        this._SafeStr_3024 = this._window.findChildByTag("BG_COLOR");
        this._isInitialized = true;
        this._window.procedure = this.itemEventProc;
    }

    private itemEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: any = param1.type;
        if ("WME_CLICK" === _loc3_) {
            this._SafeStr_2134.setBadgeSelected(this.badgeId);
        }
    };
}

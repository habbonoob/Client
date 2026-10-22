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

    public static _SafeStr_4265: IWindowContainer;
    private static readonly THUMB_COLOR_NORMAL: number = 13421772;
    private static readonly THUMB_COLOR_UNSEEN: number = 10275685;
    private _isInitialized: boolean = false;

    declare private _badgeId: string;

    declare private _SafeStr_4883: boolean;
    static { (this.prototype as any)._SafeStr_4883 = false; }

    declare private _isSelected: boolean;
    static { (this.prototype as any)._isSelected = false; }

    declare private _window: IWindowContainer;

    declare private _SafeStr_3024: IWindow;

    declare private _isUnseen: boolean;
    static { (this.prototype as any)._isUnseen = false; }

    declare private _name: string;

    declare private _desc: string;

    declare private _SafeStr_2134: BadgesModel;

    declare private _SafeStr_2331: number;
    static { (this.prototype as any)._SafeStr_2331 = 0; }

    declare private _SafeStr_14281: number;
    static { (this.prototype as any)._SafeStr_14281 = 0; }

    constructor(param1: BadgesModel, param2: string, param3: string, param4: string, param5: boolean, param6: number, param7: number) {
        this._SafeStr_2134 = param1;
        this._badgeId = param2;
        this._name = param3;
        this._desc = param4;
        this._isUnseen = param5;
        this._SafeStr_2331 = param6;
        this._SafeStr_14281 = param7;
        this.isSelected = false;
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
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

    public get ownerCount(): number {
        return this._SafeStr_2331;
    }

    public get badgeRarityId(): number {
        return this._SafeStr_14281;
    }

    public get isInUse(): boolean {
        return this._SafeStr_4883;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public get window(): IWindowContainer {
        if (!this._isInitialized) {
            this.initWindow();
        }
        return this._window;
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
        let _loc3_: string = param1.type;
        if ("WME_CLICK" === _loc3_) {
            this._SafeStr_2134.setBadgeSelected(this.badgeId);
        }
    };

    public set isInUse(param1: boolean) {
        this._SafeStr_4883 = param1;
    }

    public set isSelected(param1: boolean) {
        this._isSelected = param1;
        if (this._SafeStr_3024 == null || this._window == null) {
            return;
        }
        this._SafeStr_3024.color = (this._isUnseen ? 10275685 : 13421772) >>> 0;
        this._window.findChildByName("outline").visible = param1;
    }

    public set isUnseen(param1: boolean) {
        if (this._isUnseen != param1) {
            this._isUnseen = param1;
            this.isSelected = this._isSelected;
        }
    }

    public updateMetadata(param1: number, param2: number): void {
        this._SafeStr_2331 = param1;
        this._SafeStr_14281 = param2;
    }
}

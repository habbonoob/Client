import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomToolsWidgetHandler } from '@/com/sulake/habbo/ui/handler/RoomToolsWidgetHandler';
import type { RoomToolsWidget } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';

export class RoomToolsCtrlBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomtools::RoomToolsCtrlBase'); }

    protected static readonly DISTANCE_FROM_BOTTOM: number = 55;
    protected static readonly TOOLBAR_X: number = -5;
    protected static readonly _SafeStr_8686: number = 100;

    declare protected _window: IWindowContainer;

    declare protected _widget: RoomToolsWidget;

    declare protected _windowManager: IHabboWindowManager;

    declare protected _assets: IAssetLibrary;

    protected _isCollapsed: boolean = true;

    declare protected _SafeStr_2795: Timer;

    declare protected _SafeStr_3874: boolean;
    static { (this.prototype as any)._SafeStr_3874 = false; }

    declare protected _SafeStr_6639: number;
    static { (this.prototype as any)._SafeStr_6639 = 0; }

    constructor(param1: RoomToolsWidget, param2: IHabboWindowManager, param3: IAssetLibrary) {
        this._widget = param1;
        this._windowManager = param2;
        this._assets = param3;
        this._SafeStr_6639 = this.handler.container.config.getInteger("room.enter.info.collapse.delay", 5000);
    }

    public dispose(): void {
        if (this._window) {
            this._window.procedure = null;
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2795) {
            this._SafeStr_2795.reset();
            this._SafeStr_2795 = null;
            this._SafeStr_3874 = false;
        }
        this._widget = null;
    }

    public setElementVisible(param1: string, param2: boolean): void {
        if (!this._window || !this._window.findChildByName(param1)) {
            return;
        }
        this._window.findChildByName(param1).visible = param2;
    }

    protected collapseAfterDelay(): void {
        this.clearCollapseTimer();
        this._SafeStr_2795 = new Timer(this._SafeStr_6639, 1);
        this._SafeStr_2795.addEventListener("timer", this.collapseTimerEventHandler);
        this._SafeStr_2795.start();
    }

    protected collapseIfPending(): void {
        if (this._SafeStr_3874) {
            this.collapseAfterDelay();
        }
    }

    protected clearCollapseTimer(): void {
        if (this._SafeStr_2795 != null) {
            this._SafeStr_2795.reset();
            this._SafeStr_2795 = null;
        }
        this._SafeStr_3874 = false;
    }

    private collapseTimerEventHandler = (param1: TimerEvent): void => {
        this.clearCollapseTimer();
        this.setCollapsed(true);
    };

    protected cancelWindowCollapse(): void {
        if (this._SafeStr_2795 != null) {
            this.clearCollapseTimer();
            this._SafeStr_3874 = true;
        }
    }

    public setCollapsed(param1: boolean): void {
    }

    public get isCollapsed(): boolean {
        return this._isCollapsed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get handler(): RoomToolsWidgetHandler {
        return this._widget ? this._widget.handler : null;
    }

    public set visible(param1: boolean) {
        this._window.visible = param1;
    }
}

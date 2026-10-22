import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Motion } from '@/com/sulake/core/window/motion/Motion';
import type { RoomToolsWidget } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Callback } from '@/com/sulake/core/window/motion/Callback';
import { EaseOut } from '@/com/sulake/core/window/motion/EaseOut';
import { Motions } from '@/com/sulake/core/window/motion/Motions';
import { MoveTo } from '@/com/sulake/core/window/motion/MoveTo';
import { Queue } from '@/com/sulake/core/window/motion/Queue';
import { RoomToolsCtrlBase } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsCtrlBase';

export class RoomToolsInfoCtrl extends RoomToolsCtrlBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomtools::RoomToolsInfoCtrl'); }

    private static readonly MARGIN: number = 12;
    private static readonly TAG_COLOR: number = 1800619;
    private static readonly TAG_COLOR_HOVER: number = 4696294;

    constructor(param1: RoomToolsWidget, param2: IHabboWindowManager, param3: IAssetLibrary) {
        super(param1, param2, param3);
        this._SafeStr_3806 = [];
    }

    declare private _SafeStr_3806: any[];

    declare private _SafeStr_2637: Motion;

    public get right(): number {
        return this._window ? this._window.width + this._window.x : 0;
    }

    public override setCollapsed(param1: boolean): void {
        if (this._isCollapsed == param1) {
            return;
        }
        this._isCollapsed = param1;
        if (!this._isCollapsed) {
            this.collapseAfterDelay();
        }
        if (!this._window) {
            return;
        }
        this._window.visible = true;
        let _loc2_: number = (this._isCollapsed ? -this._window.width : 0) + this._widget.getRoomToolbarRight() + 12;
        this.cancelCurrentMotion();
        if (this._isCollapsed) {
            this._SafeStr_2637 = new Queue(new EaseOut(new MoveTo(this._window, 100, _loc2_, this._window.y), 1), new Callback(this.motionComplete));
        } else {
            this._SafeStr_2637 = new Queue(new EaseOut(new MoveTo(this._window, 100, _loc2_, this._window.y), 1), new Callback(this.motionComplete));
        }
        Motions.runMotion(this._SafeStr_2637);
    }

    public showRoomInfo(param1: boolean, param2: string, param3: string, param4: any[]): void {
        if (!this._window) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName("room_tools_info_xml").content, XML)), isIWindowContainer);
            this._window.procedure = this.onWindowEvent;
            this._window.addEventListener("WME_OVER", this.onWindowEvent);
            this._window.addEventListener("WME_OUT", this.onWindowEvent);
        }
        this.updatePosition();
        this._window.findChildByName("room_name").caption = param2;
        this._window.findChildByName("room_owner").caption = param3;
        if (param4 == null) {
            return;
        }
        this._SafeStr_3806 = param4;
        this._window.findChildByName("tag1_border").visible = param4.length >= 1;
        this._window.findChildByName("tag2_border").visible = param4.length >= 2;
        if (param4.length >= 1) {
            this._window.findChildByName("tag1").caption = "#" + this.trimTag(stringOrNull(param4[0]));
        }
        if (param4.length >= 2) {
            this._window.findChildByName("tag2").caption = "#" + this.trimTag(stringOrNull(param4[1]));
        }
        this.setCollapsed(false);
    }

    public updatePosition(): void {
        if (!this._window) {
            return;
        }
        let _loc2_: number = (this._isCollapsed ? -this._window.width : 0) + this._widget.getRoomToolbarRight() + 12;
        let _loc1_: number = this._window.desktop.height - 55 - this._window.height;
        let _loc3_: number = this._widget.getChatInputY();
        if (_loc3_ < _loc1_ + this._window.height) {
            _loc1_ = _loc3_ - this._window.height - 12;
        }
        this._window.position = new Point(_loc2_, _loc1_);
    }

    public hide(): void {
        this.cancelCurrentMotion();
        this._isCollapsed = true;
        this.updatePosition();
        if (this._window && this._window.visible) {
            this._window.visible = false;
        }
    }

    public setToolbarCollapsed(param1: boolean): void {
        if (!this._window) {
            return;
        }
        this.setCollapsed(param1);
        this.cancelCurrentMotion();
        this._SafeStr_2637 = new EaseOut(new MoveTo(this._window, 100, this._widget.getRoomToolbarRight() + 12, this._window.y), 1);
        Motions.runMotion(this._SafeStr_2637);
    }

    private cancelCurrentMotion(): void {
        if (this._SafeStr_2637 != null) {
            Motions.removeMotion(this._SafeStr_2637);
            this._SafeStr_2637 = null;
        }
    }

    private motionComplete = (param1: Motion): void => {
        this._SafeStr_2637 = null;
        if (this._isCollapsed && this._window) {
            this._window.visible = false;
        }
    };

    private trimTag(param1: string): string {
        let _loc2_: any = param1;
        if (_loc2_.length > 16) {
            _loc2_ = _loc2_.substr(0, 16) + "...";
        }
        return stringOrNull(_loc2_);
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: ITextWindow = null;
        let _loc3_: string = null;
        if (param1.type == "WE_PARENT_RESIZED") {
            return this.updatePosition();
        }
        switch (param1.type) {
            case "WME_CLICK":
                this.setCollapsed(true);
                break;
            case "WME_OVER":
                this.cancelWindowCollapse();
                break;
            case "WME_OUT":
                this.collapseIfPending();
        }
        if ((param1 instanceof WindowMouseEvent ? param1 : null) == null) {
            return;
        }
        if (param2.name == "tag1_region") {
            _loc4_ = asGuarded(this._window.findChildByName("tag1"), isITextWindow);
            _loc3_ = stringOrNull(this._SafeStr_3806[0] == null ? "" : this._SafeStr_3806[0]);
        }
        if (param2.name == "tag2_region") {
            _loc4_ = asGuarded(this._window.findChildByName("tag2"), isITextWindow);
            _loc3_ = stringOrNull(this._SafeStr_3806[1] == null ? "" : this._SafeStr_3806[1]);
        }
        if (_loc4_ != null) {
            switch (param1.type) {
                case "WME_HOVERING":
                case "WME_OVER":
                    _loc4_.textColor = 4696294;
                    break;
                case "WME_OUT":
                    _loc4_.textColor = 1800619;
                    break;
                case "WME_CLICK":
                    this.handler.navigator.performTagSearch(_loc3_);
            }
        }
    };
}

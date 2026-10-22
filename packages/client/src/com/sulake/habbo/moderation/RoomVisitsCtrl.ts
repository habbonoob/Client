import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomVisitData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomVisitData';
import type { RoomVisitsData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomVisitsData';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetRoomVisitsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/GetRoomVisitsMessageComposer';
import { OpenRoomTool } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';
import { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';
import { OpenRoomInSpectatorMode } from '@/com/sulake/habbo/moderation/OpenRoomInSpectatorMode';

export class RoomVisitsCtrl implements IDisposable, ITrackedWindow {
    static { registerClassName(this, 'com.sulake.habbo.moderation::RoomVisitsCtrl'); }

    private static ROOM_ROW_POOL_MAX_SIZE: number = 200;
    private static ROOM_ROW_POOL: any[] = [];

    public static getFormattedTime(param1: number, param2: number): string {
        return RoomVisitsCtrl.padToTwoDigits(param1) + ":" + RoomVisitsCtrl.padToTwoDigits(param2);
    }

    public static padToTwoDigits(param1: number): string {
        return param1 < 10 ? "0" + param1 : "" + param1;
    }

    constructor(param1: ModerationManager, param2: number) {
        this._main = param1;
        this._userId = param2;
    }

    declare private _main: ModerationManager;

    declare private _frame: IFrameWindow;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _rooms: any[];

    declare private _SafeStr_3375: IWindowContainer;

    declare private _SafeStr_2990: Timer;

    private _SafeStr_4456: any[] = [];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public show(): void {
        this._SafeStr_2990 = new Timer(300, 1);
        this._SafeStr_2990.addEventListener("timer", this.onResizeTimer);
        this._main.messageHandler.addRoomVisitsListener(this);
        this._main.connection.send(new GetRoomVisitsMessageComposer(this._userId));
        this._frame = castGuarded(this._main.getXmlWindow("roomvisits_frame"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._SafeStr_2221 = castGuarded(this._frame.findChildByName("visits_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_3375 = asGuarded(this._SafeStr_2221.getListItemAt(0), isIWindowContainer);
        this._SafeStr_2221.removeListItems();
        this._frame.procedure = this.onWindow;
        let _loc1_: IWindow = this._frame.findChildByTag("close");
        _loc1_.procedure = this.onClose;
    }

    public onRoomVisits(param1: RoomVisitsData): void {
        if (param1.userId != this._userId) {
            return;
        }
        if (this._disposed) {
            return;
        }
        this._rooms = param1.rooms;
        this._frame.caption = "Room visits: " + param1.userName;
        this.populate();
        this.onResizeTimer(null);
        this._frame.visible = true;
        this._main.messageHandler.removeRoomVisitsListener(this);
    }

    public getType(): number {
        return 6;
    }

    public getId(): string {
        return "" + this._userId;
    }

    public getFrame(): IFrameWindow {
        return this._frame;
    }

    public dispose(): void {
        let _loc1_: any = null;
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_2221 != null) {
            this._SafeStr_2221.removeListItems();
            this._SafeStr_2221.dispose();
            this._SafeStr_2221 = null;
        }
        if (this._frame != null) {
            this._frame.destroy();
            this._frame = null;
        }
        this._main = null;
        if (this._SafeStr_2990 != null) {
            this._SafeStr_2990.stop();
            this._SafeStr_2990.removeEventListener("timer", this.onResizeTimer);
            this._SafeStr_2990 = null;
        }
        for (_loc1_ of this._SafeStr_4456 ?? []) {
            this.storeRoomRowWindow(_loc1_);
        }
        if (this._SafeStr_3375 != null) {
            this._SafeStr_3375.dispose();
            this._SafeStr_3375 = null;
        }
        this._SafeStr_4456 = [];
    }

    private populate(): void {
        let _loc2_: any = null;
        let _loc1_: any = true;
        for (_loc2_ of this._rooms ?? []) {
            this.populateRoomRow(_loc2_, _loc1_);
            _loc1_ = !_loc1_;
        }
    }

    private populateRoomRow(param1: RoomVisitData, param2: boolean): void {
        let _loc4_: IWindowContainer = this.getRoomRowWindow();
        let _loc3_: number = param2 ? 4288861930 : 4294967295;
        _loc4_.color = _loc3_;
        let _loc7_: IWindow = _loc4_.findChildByName("room_name_txt");
        _loc7_.caption = param1.roomName;
        new OpenRoomTool(this._frame, this._main, _loc7_, param1.roomId);
        _loc7_.color = _loc3_;
        let _loc5_: ITextWindow = castGuarded(_loc4_.findChildByName("time_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc5_.text = RoomVisitsCtrl.getFormattedTime(param1.enterHour, param1.enterMinute);
        let _loc6_: ITextWindow = castGuarded(_loc4_.findChildByName("view_room_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        new OpenRoomInSpectatorMode(this._main, _loc6_, param1.roomId);
        _loc6_.color = _loc3_;
        this.addRoomRowToList(_loc4_, this._SafeStr_2221);
    }

    private addRoomRowToList(param1: IWindowContainer, param2: IItemListWindow): void {
        param2.addListItem(param1);
        this._SafeStr_4456.push(param1);
    }

    private getRoomRowWindow(): IWindowContainer {
        if (RoomVisitsCtrl.ROOM_ROW_POOL.length > 0) {
            return asGuarded(RoomVisitsCtrl.ROOM_ROW_POOL.pop(), isIWindowContainer);
        }
        return castGuarded(this._SafeStr_3375.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private storeRoomRowWindow(param1: IWindowContainer): void {
        let _loc3_: IWindow = null;
        let _loc2_: IWindow = null;
        if (RoomVisitsCtrl.ROOM_ROW_POOL.length < RoomVisitsCtrl.ROOM_ROW_POOL_MAX_SIZE) {
            _loc3_ = param1.findChildByName("room_name_txt");
            _loc3_.procedure = null;
            _loc2_ = param1.findChildByName("view_room_txt");
            _loc2_.procedure = null;
            param1.width = this._SafeStr_3375.width;
            param1.height = this._SafeStr_3375.height;
            RoomVisitsCtrl.ROOM_ROW_POOL.push(param1);
        } else {
            param1.dispose();
        }
    }

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.dispose();
    };

    private onWindow = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_RESIZED" || param2 != this._frame) {
            return;
        }
        if (!this._SafeStr_2990.running) {
            this._SafeStr_2990.reset();
            this._SafeStr_2990.start();
        }
    };

    private onResizeTimer = (param1: TimerEvent): void => {
        let _loc3_: IWindowContainer = castGuarded(this._SafeStr_2221.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc5_: IWindow = asGuarded(_loc3_.getChildByName("scroller"), isIWindow);
        let _loc4_: any = this._SafeStr_2221.scrollableRegion.height > this._SafeStr_2221.height;
        let _loc2_: number = 17;
        if (_loc5_.visible) {
            if (!_loc4_) {
                _loc5_.visible = false;
                this._SafeStr_2221.width += _loc2_;
            }
        } else if (_loc4_) {
            _loc5_.visible = true;
            this._SafeStr_2221.width -= _loc2_;
        }
    };

    get [IDisposable](): true {
        return true;
    }

    get [ITrackedWindow](): true {
        return true;
    }
}

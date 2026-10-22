import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomUI } from '@/com/sulake/habbo/ui/RoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { RoomToolsWidgetHandler } from '@/com/sulake/habbo/ui/handler/RoomToolsWidgetHandler';
import { RoomChatInputWidget } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputWidget.group';
import { RoomToolsInfoCtrl } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsInfoCtrl';
import { RoomToolsToolbarCtrl } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsToolbarCtrl';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';

export class RoomToolsWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomtools::RoomToolsWidget'); }

    private static readonly ROOM_HISTORY_MAX_LENGTH: number = 10;
    private static _currentRoomIndex: number = 0;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: RoomUI) {
        super(param1, param2, param3, param4.localization);
        this.handler.widget = this;
        this._desktop = param4.desktop;
        this._SafeStr_3792 = param4.freeFlowChat;
        this._SafeStr_2839 = new RoomToolsInfoCtrl(this, param2, param3);
        this._toolbarView = new RoomToolsToolbarCtrl(this, param2, param3);
        this._toolbarView.updateRoomHistoryButtons();
        this._toolbarView.setChatHistoryButton(!this._SafeStr_3792 || !this._SafeStr_3792.isDisabledInPreferences);
        let _loc5_: string = param4.getProperty("camera.launch.ui.position");
        this._toolbarView.setCameraButton(this.handler.container.sessionDataManager.isPerkAllowed("CAMERA") && (StringUtil.isBlank(_loc5_) || _loc5_ == "room-menu"));
        this._toolbarView.setLikeButton(this.handler.canRate);
        this._toolbarView.setCollapsed(this.handler.sessionDataManager.isNoob || !(this.handler.sessionDataManager.uiFlags & 2));
    }

    declare private _toolbarView: RoomToolsToolbarCtrl;

    declare private _SafeStr_2839: RoomToolsInfoCtrl;

    declare private _desktop: IRoomDesktop;

    declare private _SafeStr_3792: IHabboFreeFlowChat;

    declare private _SafeStr_3242: Timer;

    private static _visitedRooms: GuestRoomData[] = [];

    public get visitedRooms(): GuestRoomData[] {
        return RoomToolsWidget._visitedRooms;
    }

    private _currentRoomName: string = "";

    public get currentRoomName(): string {
        return this._currentRoomName;
    }

    public get handler(): RoomToolsWidgetHandler {
        return this._SafeStr_2143 instanceof RoomToolsWidgetHandler ? this._SafeStr_2143 : null;
    }

    public get freeFlowChat(): IHabboFreeFlowChat {
        return this._SafeStr_3792;
    }

    public get currentRoomIndex(): number {
        return RoomToolsWidget._currentRoomIndex;
    }

    public override dispose(): void {
        if (this._SafeStr_3242) {
            this._SafeStr_3242.stop();
            this._SafeStr_3242 = null;
        }
        if (this._toolbarView) {
            this._toolbarView.dispose();
            this._toolbarView = null;
        }
        if (this._SafeStr_2839) {
            this._SafeStr_2839.dispose();
            this._SafeStr_2839 = null;
        }
        this._SafeStr_3792 = null;
        this._desktop = null;
        super.dispose();
    }

    public override release(): void {
        this._toolbarView.release();
        this._toolbarView.visible = false;
        this._SafeStr_2839.hide();
        this._SafeStr_3792.visible = false;
        super.release();
    }

    public override reuse(param1: IRoomDesktop): void {
        super.reuse(param1);
        this._desktop = param1;
        this._toolbarView.visible = true;
    }

    public updateRoomData(param1: GuestRoomData): void {
        for (const _loc2_ of RoomToolsWidget._visitedRooms ?? []) {
            if (_loc2_.flatId == param1.flatId) {
                _loc2_.roomName = param1.roomName;
            }
        }
    }

    public storeRoomData(param1: GuestRoomData): void {
        for (const _loc2_ of RoomToolsWidget._visitedRooms ?? []) {
            if (_loc2_.flatId == param1.flatId) {
                return;
            }
        }
        RoomToolsWidget._visitedRooms.push(param1);
        if (RoomToolsWidget._visitedRooms.length > 10) {
            RoomToolsWidget._visitedRooms.shift();
        }
        RoomToolsWidget._currentRoomIndex = RoomToolsWidget._visitedRooms.length - 1;
        if (this._toolbarView) {
            this._toolbarView.setLikeButton(this.handler.canRate);
        }
    }

    public showRoomInfo(param1: boolean, param2: string, param3: string, param4: any[]): void {
        if (!this._SafeStr_2839) {
            return;
        }
        this._currentRoomName = param2;
        this._SafeStr_2839.showRoomInfo(param1, param2, param3, param4);
    }

    public enterNewRoom(param1: number): void {
        if (!this._toolbarView || !this._SafeStr_2839) {
            return;
        }
        let _loc3_: number = 0;
        for (const _loc2_ of RoomToolsWidget._visitedRooms ?? []) {
            if (_loc2_.flatId == param1) {
                RoomToolsWidget._currentRoomIndex = _loc3_;
            }
            _loc3_++;
        }
        this._toolbarView.disableRoomHistoryButtons();
        if (this._SafeStr_3242 != null) {
            this._SafeStr_3242.stop();
        }
        this._SafeStr_3242 = new Timer(2000, 1);
        this._SafeStr_3242.addEventListener("timer", this.roomButtonTimerEventHandler);
        this._SafeStr_3242.start();
        this._SafeStr_2839.setElementVisible("tags", true);
    }

    public setCollapsed(param1: boolean): void {
        if (this._toolbarView) {
            this._toolbarView.setCollapsed(param1);
        }
        if (this._SafeStr_2839) {
            this._SafeStr_2839.setToolbarCollapsed(param1);
        }
    }

    public getIconLocation(param1: string): IWindow {
        return this._toolbarView.window.findChildByName(param1);
    }

    public getWidgetAreaWidth(): number {
        return this._toolbarView ? this._toolbarView.right : 0;
    }

    public getChatInputY(): number {
        if (!this._desktop) {
            return 0;
        }
        let _loc1_: RoomChatInputWidget = asInstanceOf(this._desktop.getWidget("RWE_CHAT_INPUT_WIDGET"), RoomChatInputWidget);
        if (!_loc1_) {
            return 0;
        }
        return _loc1_.getChatInputY();
    }

    public getRoomToolbarRight(): number {
        return this._toolbarView ? this._toolbarView.right : 0;
    }

    public goToNextRoom(): void {
        let _loc1_: any = RoomToolsWidget._currentRoomIndex + 1;
        let _loc2_: number = RoomToolsWidget._visitedRooms.length | 0;
        if (_loc1_ > _loc2_) {
            _loc1_ = _loc2_;
        }
        this.handler.goToPrivateRoom(RoomToolsWidget._visitedRooms[_loc1_].flatId);
        this._toolbarView.disableRoomHistoryButtons();
    }

    public goToPreviousRoom(): void {
        let _loc1_: number = RoomToolsWidget._currentRoomIndex - 1;
        if (_loc1_ < 0) {
            _loc1_ = 0;
        }
        this.handler.goToPrivateRoom(RoomToolsWidget._visitedRooms[_loc1_].flatId);
        this._toolbarView.disableRoomHistoryButtons();
    }

    private roomButtonTimerEventHandler = (param1: TimerEvent): void => {
        let _loc2_: Timer = asInstanceOf(param1.target, Timer);
        if (_loc2_) {
            _loc2_.stop();
            _loc2_.removeEventListener("timer", this.roomButtonTimerEventHandler);
        }
        if (this._toolbarView) {
            this._toolbarView.updateRoomHistoryButtons();
        }
    };
}

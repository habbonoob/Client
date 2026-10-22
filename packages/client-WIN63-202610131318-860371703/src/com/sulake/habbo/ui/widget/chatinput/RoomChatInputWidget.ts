import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomUI } from '@/com/sulake/habbo/ui/RoomUI';
import type { RoomWidgetChatInputContentUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChatInputContentUpdateEvent';
import type { RoomWidgetFloodControlEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFloodControlEvent';
import type { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import type { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ChatInputWidgetHandler } from '@/com/sulake/habbo/ui/handler/ChatInputWidgetHandler';
import { RoomChatInputView } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputView';
import { RoomToolsWidget } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputWidget.group';
import { RoomWidgetChatMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChatMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class RoomChatInputWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput::RoomChatInputWidget'); }

    private static readonly MIN_PASTE_INTERVAL_MS: number = 0;

    declare private _visualization: RoomChatInputView;

    private _selectedUserName: string = "";
    private _floodBlocked: boolean = false;
    private _SafeStr_2590: Timer = null;

    declare private _lastPasteTime: number;
    static { (this.prototype as any)._lastPasteTime = 0; }

    declare private _roomUi: RoomUI;

    declare private _desktop: IRoomDesktop;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: RoomUI, param6: IRoomDesktop) {
        super(param1, param2, param3, param4);
        this._roomUi = param5;
        this._desktop = param6;
        this._visualization = new RoomChatInputView(this);
        (param1 instanceof ChatInputWidgetHandler ? param1 : null).widget = this;
    }

    public get floodBlocked(): boolean {
        return this._floodBlocked;
    }

    public get roomUi(): RoomUI {
        return this._roomUi;
    }

    public get handler(): ChatInputWidgetHandler {
        return this._SafeStr_2143 instanceof ChatInputWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override dispose(): void {
        if (this._visualization != null) {
            this._visualization.dispose();
            this._visualization = null;
        }
        if (this._SafeStr_2590 != null) {
            this._SafeStr_2590.stop();
            this._SafeStr_2590 = null;
        }
        this._roomUi = null;
        super.dispose();
    }

    public get allowPaste(): boolean {
        return getTimer() - this._lastPasteTime > 0;
    }

    public setLastPasteTime(): void {
        this._lastPasteTime = getTimer();
    }

    public sendChat(param1: string, param2: number, param3: string = "", param4: number = 0): void {
        if (this._floodBlocked) {
            return;
        }
        let _loc5_: RoomWidgetChatMessage = new RoomWidgetChatMessage("RWCM_MESSAGE_CHAT", param1, param2, param3, param4);
        if (this.messageListener != null) {
            this.messageListener.processWidgetMessage(_loc5_);
        }
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWROUE_OBJECT_DESELECTED", this.onRoomObjectDeselected);
        param1.addEventListener("RWWCIDE_CHAT_INPUT_CONTENT", this.onChatInputUpdate);
        param1.addEventListener("RWUIUE_PEER", this.onUserInfo);
        param1.addEventListener("RWFCE_FLOOD_CONTROL", this.onFloodControl);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWROUE_OBJECT_DESELECTED", this.onRoomObjectDeselected);
        param1.removeEventListener("RWWCIDE_CHAT_INPUT_CONTENT", this.onChatInputUpdate);
        param1.removeEventListener("RWUIUE_PEER", this.onUserInfo);
        param1.removeEventListener("RWFCE_FLOOD_CONTROL", this.onFloodControl);
    }

    private onRoomObjectDeselected = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        this._selectedUserName = "";
    };

    private onUserInfo = (param1: RoomWidgetUserInfoUpdateEvent): void => {
        this._selectedUserName = param1.name;
    };

    private onChatInputUpdate = (param1: RoomWidgetChatInputContentUpdateEvent): void => {
        let _loc2_: string = "";
        switch (param1.messageType) {
            case "whisper":
                _loc2_ = this.localizations.getLocalization("widgets.chatinput.mode.whisper", ":tell");
                this._visualization.displaySpecialChatMessage(_loc2_, param1.userName);
                break;
            case "shout":
        }
    };

    public refreshChatStyles(): void {
        this._visualization.createOrUpdateChatStylesView();
    }

    private onReleaseTimerComplete = (param1: TimerEvent): void => {
        Logger.log("Releasing flood blocking");
        this._floodBlocked = false;
        if (this._visualization != null) {
            this._visualization.hideFloodBlocking();
        }
        this._SafeStr_2590 = null;
    };

    private onReleaseTimerTick = (param1: TimerEvent): void => {
        if (this._visualization != null) {
            this._visualization.updateBlockText(this._SafeStr_2590.repeatCount - this._SafeStr_2590.currentCount);
        }
    };

    public checkChatInputPosition(): void {
        this._visualization.updatePosition(null);
    }

    public getFriendBarWidth(): number {
        if (!this._roomUi.friendBarView) {
            return 1000;
        }
        return this._roomUi.friendBarView.friendBarWidth;
    }

    public getToolBarWidth(): number {
        if (!this._roomUi.toolbar) {
            return 1000;
        }
        return this._roomUi.toolbar.toolBarAreaWidth;
    }

    public getRoomToolsWidth(): number {
        let _loc1_: RoomToolsWidget = asInstanceOf(this._desktop.getWidget("RWE_ROOM_TOOLS"), RoomToolsWidget);
        if (!_loc1_) {
            return 0;
        }
        return _loc1_.getWidgetAreaWidth();
    }

    public get selectedUserName(): string {
        return this._selectedUserName;
    }

    public onFloodControl = (param1: RoomWidgetFloodControlEvent): void => {
        this._floodBlocked = true;
        Logger.log("Enabling flood blocking for " + param1.seconds + " seconds");
        if (this._SafeStr_2590) {
            this._SafeStr_2590.reset();
        } else {
            this._SafeStr_2590 = new Timer(1000, param1.seconds);
            this._SafeStr_2590.addEventListener("timer", this.onReleaseTimerTick);
            this._SafeStr_2590.addEventListener("timerComplete", this.onReleaseTimerComplete);
        }
        this._SafeStr_2590.start();
        if (this._visualization != null) {
            this._visualization.updateBlockText(param1.seconds);
            this._visualization.showFloodBlocking();
        }
    };

    public override get mainWindow(): IWindow {
        return this._visualization.window;
    }

    public hide(): void {
        if (this.mainWindow) {
            this.mainWindow.visible = false;
        }
    }

    private show(): void {
        if (this.mainWindow) {
            this.mainWindow.visible = true;
        }
    }

    public getChatInputY(): number {
        return this._visualization ? this._visualization.getChatInputY() : 0;
    }

    public getChatInputElements(): any[] {
        let _loc1_: any[] = null;
        if (this._visualization) {
            _loc1_ = this._visualization.getChatWindowElements();
        }
        return _loc1_;
    }

    public hideTransientSelectors(): void {
        if (this._visualization != null) {
            this._visualization.hideTransientSelectors();
        }
    }

    public override release(): void {
        if (this._visualization != null) {
            this._visualization.release();
        }
        this.hide();
        this._desktop = null;
        super.release();
    }

    public override reuse(param1: IRoomDesktop): void {
        super.reuse(param1);
        this._desktop = param1;
        this.show();
    }
}

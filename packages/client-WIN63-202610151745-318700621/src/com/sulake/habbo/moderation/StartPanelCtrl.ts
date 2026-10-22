import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetRoomChatlogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/GetRoomChatlogMessageComposer';
import { ChatlogCtrl, RoomToolCtrl, UserInfoFrameCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';

export class StartPanelCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.moderation::StartPanelCtrl'); }

    declare private _main: ModerationManager;

    declare private _frame: IFrameWindow;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _isGuestRoom: boolean;
    static { (this.prototype as any)._isGuestRoom = false; }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    private _disposed: boolean = false;

    constructor(param1: ModerationManager) {
        this._main = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._main = null;
            if (this._frame) {
                this._frame.dispose();
                this._frame = null;
            }
        }
    }

    public userSelected(param1: number, param2: string): void {
        if (this._frame == null) {
            return;
        }
        this._userId = param1;
        this._frame.findChildByName("userinfo_but").enable();
        (asGuarded(castGuarded(this._frame.findChildByName("userinfo_but"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("offence_name"), isILabelWindow)).textColor = 0;
        castGuarded(this._frame.findChildByName("userinfo_but"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("offence_name").caption = "User info: " + param2;
    }

    public guestRoomEntered(param1: RoomEntryInfoMessageParser): void {
        if (this._frame == null || param1 == null) {
            return;
        }
        this._frame.findChildByName("room_tool_but").enable();
        (asGuarded(castGuarded(this._frame.findChildByName("room_tool_but"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("offence_name"), isILabelWindow)).textColor = 0;
        this.enableChatlogButton();
        this._isGuestRoom = true;
        this._roomId = param1.guestRoomId;
    }

    public roomExited(): void {
        if (this._frame == null) {
            return;
        }
        this._frame.findChildByName("room_tool_but").disable();
        this._frame.findChildByName("chatlog_but").disable();
    }

    public show(): void {
        if (this._frame == null) {
            this._frame = castGuarded(this._main.getXmlWindow("start_panel"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
            this._frame.findChildByName("room_tool_but").addEventListener("WME_CLICK", this.onRoomToolButton);
            this._frame.findChildByName("chatlog_but").addEventListener("WME_CLICK", this.onChatlogButton);
            this._frame.findChildByName("ticket_queue_but").addEventListener("WME_CLICK", this.onTicketQueueButton);
            this._frame.findChildByName("userinfo_but").addEventListener("WME_CLICK", this.onUserinfoButton);
            this._frame.findChildByName("room_tool_but").addEventListener("WME_OVER", this.onMouseOver);
            this._frame.findChildByName("chatlog_but").addEventListener("WME_OVER", this.onMouseOver);
            this._frame.findChildByName("ticket_queue_but").addEventListener("WME_OVER", this.onMouseOver);
            this._frame.findChildByName("userinfo_but").addEventListener("WME_OVER", this.onMouseOver);
            this._frame.findChildByName("room_tool_but").addEventListener("WME_OUT", this.onMouseOut);
            this._frame.findChildByName("chatlog_but").addEventListener("WME_OUT", this.onMouseOut);
            this._frame.findChildByName("ticket_queue_but").addEventListener("WME_OUT", this.onMouseOut);
            this._frame.findChildByName("userinfo_but").addEventListener("WME_OUT", this.onMouseOut);
            this._frame.findChildByName("userinfo_but").disable();
            this._frame.findChildByName("room_tool_but").disable();
            this._frame.findChildByName("chatlog_but").disable();
            this._main.initMsg.cfhPermission ? null : this._frame.findChildByName("ticket_queue_but").disable();
            this._main.initMsg.chatlogsPermission ? null : this._frame.findChildByName("chatlog_but").disable();
            (asGuarded(castGuarded(this._frame.findChildByName("userinfo_but"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("offence_name"), isILabelWindow)).textColor = 6710886;
            (asGuarded(castGuarded(this._frame.findChildByName("room_tool_but"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("offence_name"), isILabelWindow)).textColor = 6710886;
            (asGuarded(castGuarded(this._frame.findChildByName("chatlog_but"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("offence_name"), isILabelWindow)).textColor = 6710886;
        }
        this._frame.visible = true;
    }

    private enableChatlogButton(): void {
        if (this._main.initMsg.chatlogsPermission) {
            this._frame.findChildByName("chatlog_but").enable();
            (asGuarded(castGuarded(this._frame.findChildByName("chatlog_but"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("offence_name"), isILabelWindow)).textColor = 0;
        }
    }

    private onMouseOver = (param1: WindowEvent): void => {
        if (!param1.window.isEnabled()) {
            return;
        }
        (asGuarded(param1.window, isIWindowContainer)).findChildByName("mouseover").visible = true;
    };

    private onMouseOut = (param1: WindowEvent): void => {
        (asGuarded(param1.window, isIWindowContainer)).findChildByName("mouseover").visible = false;
    };

    private onRoomToolButton = (param1: WindowEvent): void => {
        this._main.windowTracker.show(new RoomToolCtrl(this._main, this._roomId), this._frame, false, false, true);
    };

    private onChatlogButton = (param1: WindowEvent): void => {
        this._main.windowTracker.show(new ChatlogCtrl(new GetRoomChatlogMessageComposer(this._isGuestRoom ? 0 : 1, this._roomId), this._main, 4, this._roomId), this._frame, false, false, true);
    };

    private onUserinfoButton = (param1: WindowEvent): void => {
        this._main.windowTracker.show(new UserInfoFrameCtrl(this._main, this._userId), this._frame, false, false, true);
    };

    private onTicketQueueButton = (param1: WindowEvent): void => {
        this._main.issueManager.init();
    };

    get [IDisposable](): true {
        return true;
    }
}

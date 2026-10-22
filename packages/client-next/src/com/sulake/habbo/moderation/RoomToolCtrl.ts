import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { RoomData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomData';
import type { RoomModerationData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomModerationData';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetModeratorRoomInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/GetModeratorRoomInfoMessageComposer';
import { GetRoomChatlogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/GetRoomChatlogMessageComposer';
import { ModerateRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModerateRoomMessageComposer';
import { ModeratorActionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModeratorActionMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ChatlogCtrl, UserInfoFrameCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';
import { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';

export class RoomToolCtrl implements IDisposable, ITrackedWindow {
    static { registerClassName(this, 'com.sulake.habbo.moderation::RoomToolCtrl'); }

    declare private _main: ModerationManager;

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _data: RoomModerationData;

    declare private _frame: IFrameWindow;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _msgSelect: IDropMenuWindow;

    declare private _SafeStr_2861: ITextFieldWindow;

    private _includeInfo: boolean = true;

    declare private _SafeStr_3598: ICheckBoxWindow;

    declare private _SafeStr_4372: ICheckBoxWindow;

    declare private _SafeStr_4403: ICheckBoxWindow;

    declare private _SafeStr_5589: IWindowContainer;

    constructor(param1: ModerationManager, param2: number) {
        this._main = param1;
        this._flatId = param2;
    }

    public static getLowestPoint(param1: IWindowContainer): number {
        let _loc2_: number = 0;
        let _loc4_: IWindow = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc4_ = param1.getChildAt(_loc2_);
            if (_loc4_.visible) {
                _loc3_ = Math.max(_loc3_, _loc4_.y + _loc4_.height) | 0;
            }
            _loc2_++;
        }
        return _loc3_;
    }

    public static moveChildrenToColumn(param1: IWindowContainer, param2: number, param3: number): void {
        let _loc4_: number = 0;
        let _loc5_: IWindow = null;
        _loc4_ = 0;
        while (_loc4_ < param1.numChildren) {
            _loc5_ = param1.getChildAt(_loc4_);
            if (_loc5_ != null && _loc5_.visible && _loc5_.height > 0) {
                _loc5_.y = param2;
                param2 += _loc5_.height + param3;
            }
            _loc4_++;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public show(): void {
        this._frame = castGuarded(this._main.getXmlWindow("roomtool_frame"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        let _loc1_: IItemListWindow = asGuarded(this._frame.findChildByName("list_cont"), isIItemListWindow);
        let _loc2_: IWindowContainer = asGuarded(_loc1_.getListItemByName("room_cont"), isIWindowContainer);
        this._SafeStr_5589 = asGuarded(_loc2_.findChildByName("room_data"), isIWindowContainer);
        _loc2_.removeChild(this._SafeStr_5589);
        this._main.messageHandler.addRoomInfoListener(this);
        this._main.connection.send(new GetModeratorRoomInfoMessageComposer(this._flatId));
        Logger.log("BEGINNING TO SHOW: " + this._flatId);
    }

    public getType(): number {
        return 9;
    }

    public getId(): string {
        return "" + this._flatId;
    }

    public getFrame(): IFrameWindow {
        return this._frame;
    }

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.dispose();
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._main.messageHandler.removeRoomEnterListener(this);
        if (this._frame != null) {
            this._frame.destroy();
            this._frame = null;
        }
        if (this._data != null) {
            this._data.dispose();
            this._data = null;
        }
        this._main = null;
        this._SafeStr_2221 = null;
        this._msgSelect = null;
        this._SafeStr_2861 = null;
        this._SafeStr_3598 = null;
        this._SafeStr_4372 = null;
        this._SafeStr_4403 = null;
    }

    public onRoomChange(): void {
        this.setSendButtonState("send_caution_but");
        this.setSendButtonState("send_message_but");
    }

    private setSendButtonState(param1: string): void {
        let _loc3_: boolean = this._data != null && this._data.flatId == this._main.currentFlatId;
        let _loc2_: IButtonWindow = castGuarded(this._frame.findChildByName(param1), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        if (_loc3_ && this._main.initMsg.roomAlertPermission) {
            _loc2_.enable();
        } else {
            _loc2_.disable();
        }
    }

    public onRoomInfo(param1: RoomModerationData): void {
        if (this._disposed) {
            return;
        }
        Logger.log("GOT ROOM INFO: " + param1.flatId + ", " + this._flatId);
        if (param1.flatId != this._flatId) {
            Logger.log("NOT THE SAME FLAT: " + param1.flatId + ", " + this._flatId);
            return;
        }
        this._data = param1;
        this.populate();
        this._main.messageHandler.removeRoomInfoListener(this);
        this._frame.visible = true;
        this._main.messageHandler.addRoomEnterListener(this);
    }

    public populate(): void {
        this._SafeStr_2221 = castGuarded(this._frame.findChildByName("list_cont"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc1_: IWindow = this._frame.findChildByTag("close");
        _loc1_.procedure = this.onClose;
        this._SafeStr_2861 = castGuarded(this._frame.findChildByName("message_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        this._SafeStr_2861.procedure = this.onInputClick;
        this._msgSelect = castGuarded(this._frame.findChildByName("msgTemplatesSelect"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        this.prepareMsgSelect(this._msgSelect);
        this._msgSelect.procedure = this.onSelectTemplate;
        this._SafeStr_3598 = castGuarded(this._frame.findChildByName("kick_check"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._SafeStr_4372 = castGuarded(this._frame.findChildByName("lock_check"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this._SafeStr_4403 = castGuarded(this._frame.findChildByName("changename_check"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this.refreshRoomData(this._data.room, "room_cont");
        this.setTxt("owner_name_txt", this._data.ownerName);
        this.setTxt("owner_in_room_txt", this._data.ownerInRoom ? "Yes" : "No");
        this.setTxt("user_count_txt", "" + this._data.userCount);
        this._frame.findChildByName("enter_room_but").procedure = this.onEnterRoom;
        this._frame.findChildByName("chatlog_but").procedure = this.onChatlog;
        this._frame.findChildByName("edit_in_hk_but").procedure = this.onEditInHk;
        this._frame.findChildByName("send_caution_but").procedure = this.onSendCaution;
        this._frame.findChildByName("send_message_but").procedure = this.onSendMessage;
        this._main.initMsg.chatlogsPermission ? null : this._frame.findChildByName("chatlog_but").disable();
        if (!this._main.initMsg.roomKickPermission) {
            this._SafeStr_3598.disable();
        }
        this._frame.findChildByName("owner_name_txt").procedure = this.onOwnerName;
        this.onRoomChange();
    }

    private disposeItemFromList(param1: IItemListWindow, param2: IWindow): void {
        let _loc3_: IWindow = param1.removeListItem(param2);
        if (_loc3_ != null) {
            _loc3_.dispose();
        }
    }

    private refreshRoomData(param1: RoomData, param2: string): void {
        let _loc6_: IWindowContainer = castGuarded(this._SafeStr_2221.getListItemByName(param2), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc7_: IWindowContainer = castGuarded(_loc6_.findChildByName("room_data"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc7_ == null) {
            _loc7_ = asGuarded(_loc6_.addChild(this._SafeStr_5589.clone()), isIWindowContainer);
        }
        if (!param1.exists) {
            this.disposeItemFromList(this._SafeStr_2221, _loc6_);
            this.disposeItemFromList(this._SafeStr_2221, this._SafeStr_2221.getListItemByName("event_spacing"));
            return;
        }
        let _loc4_: ITextWindow = castGuarded(_loc7_.findChildByName("name"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc4_.caption = param1.name;
        _loc4_.height = _loc4_.textHeight + 5 | 0;
        let _loc3_: ITextWindow = castGuarded(_loc7_.findChildByName("desc"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc3_.caption = param1.desc;
        _loc3_.height = _loc3_.textHeight + 5 | 0;
        let _loc5_: IWindowContainer = castGuarded(_loc7_.findChildByName("tags_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc8_: ITextWindow = castGuarded(_loc5_.findChildByName("tags_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc8_.caption = this.getTagsAsString(param1.tags);
        _loc8_.height = _loc8_.textHeight + 5 | 0;
        _loc5_.height = _loc8_.height;
        if (param1.tags.length < 1) {
            _loc7_.removeChild(_loc5_);
        }
        RoomToolCtrl.moveChildrenToColumn(_loc7_, _loc4_.y, 0);
        _loc7_.height = RoomToolCtrl.getLowestPoint(_loc7_);
        _loc6_.height = _loc7_.height + 2 * _loc7_.y;
        Logger.log("XXXX: " + _loc6_.height + ", " + _loc7_.height + ", " + _loc4_.height + ", " + _loc3_.height + ", " + _loc5_.height + ", " + _loc8_.height);
    }

    private getTagsAsString(param1: any[]): string {
        let _loc3_: any = null;
        let _loc2_: string = "";
        for (_loc3_ of param1 ?? []) {
            if (_loc2_ == "") {
                _loc2_ = stringOrNull(_loc3_);
            } else {
                _loc2_ = _loc2_ + ", " + _loc3_;
            }
        }
        return _loc2_;
    }

    private setTxt(param1: string, param2: string): void {
        let _loc3_: ITextWindow = castGuarded(this._frame.findChildByName(param1), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc3_.text = param2;
    }

    private onOwnerName = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._main.windowTracker.show(new UserInfoFrameCtrl(this._main, this._data.ownerId), this._frame, false, false, true);
    };

    private onEnterRoom = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Enter room clicked");
        this._main.goToRoom(this._data.flatId);
    };

    private onChatlog = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._main.windowTracker.show(new ChatlogCtrl(new GetRoomChatlogMessageComposer(0, this._data.flatId), this._main, 4, this._data.flatId), this._frame, false, false, true);
    };

    private onEditInHk = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Edit in hk clicked");
        this._main.openHkPage("roomadmin.url", "" + this._data.flatId);
    };

    private onSendCaution = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Sending caution...");
        this.act(true);
    };

    private onSendMessage = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Sending message...");
        this.act(false);
    };

    private act(param1: boolean): void {
        if (this._includeInfo || this._SafeStr_2861.text == "") {
            this._main.windowManager.alert("Alert", "You must input a message to the user", 0, this.onAlertClose);
            return;
        }
        let _loc2_: number = this.determineAction(param1, this._SafeStr_3598.isSelected);
        this._main.connection.send(new ModeratorActionMessageComposer(_loc2_, this._SafeStr_2861.text, ""));
        if (this._SafeStr_4372.isSelected || Boolean(this._SafeStr_4403.isSelected) || Boolean(this._SafeStr_3598.isSelected)) {
            this._main.connection.send(new ModerateRoomMessageComposer(this._data.flatId, this._SafeStr_4372.isSelected, this._SafeStr_4403.isSelected, this._SafeStr_3598.isSelected));
        }
        this.dispose();
    }

    private determineAction(param1: boolean, param2: boolean): number {
        if (param2) {
            return param1 ? 1 : 4;
        }
        return param1 ? 0 : 3;
    }

    private onInputClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_FOCUSED") {
            return;
        }
        if (!this._includeInfo) {
            return;
        }
        this._SafeStr_2861.text = "";
        this._includeInfo = false;
    };

    private onAlertClose = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    private prepareMsgSelect(param1: IDropMenuWindow): void {
        Logger.log("MSG TEMPLATES: " + this._main.initMsg.roomMessageTemplates.length);
        param1.populate(this._main.initMsg.roomMessageTemplates);
    }

    private onSelectTemplate = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_SELECTED") {
            return;
        }
        let _loc3_: string = stringOrNull(this._main.initMsg.roomMessageTemplates[this._msgSelect.selection]);
        if (_loc3_ != null) {
            this._includeInfo = false;
            this._SafeStr_2861.text = _loc3_;
        }
    };

    get [IDisposable](): true {
        return true;
    }

    get [ITrackedWindow](): true {
        return true;
    }
}

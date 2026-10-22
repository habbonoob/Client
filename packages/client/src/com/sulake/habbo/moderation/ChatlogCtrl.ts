import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ChatlineData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ChatlineData';
import type { ChatRecordData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ChatRecordData';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { IChatLogListener } from '@/com/sulake/habbo/moderation/IChatLogListener';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { OpenRoomTool, UserInfoFrameCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';
import { HideDiscussionMessage } from '@/com/sulake/habbo/moderation/HideDiscussionMessage';
import { HideDiscussionThread } from '@/com/sulake/habbo/moderation/HideDiscussionThread';
import { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';
import { OpenDiscussionMessage } from '@/com/sulake/habbo/moderation/OpenDiscussionMessage';
import { OpenDiscussionThread } from '@/com/sulake/habbo/moderation/OpenDiscussionThread';
import { OpenExternalLink } from '@/com/sulake/habbo/moderation/OpenExternalLink';
import { OpenRoomInSpectatorMode } from '@/com/sulake/habbo/moderation/OpenRoomInSpectatorMode';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';

export class ChatlogCtrl implements IDisposable, ITrackedWindow, IChatLogListener {
    static { registerClassName(this, 'com.sulake.habbo.moderation::ChatlogCtrl'); }

    private static readonly CHAT_REPORTED_USER_COLOUR: number = 4293973667;
    private static readonly CHAT_REPORTEE_COLOUR: number = 4288921072;
    private static CHAT_LINE_POOL_MAX_SIZE: number = 1000;
    private static CHAT_LINE_POOL: any[] = [];

    constructor(param1: IMessageComposer, param2: ModerationManager, param3: number, param4: number, param5: IssueMessageData = null, param6: IWindowContainer = null, param7: IItemListWindow = null, param8: boolean = false) {
        this._main = param2;
        this._type = param3;
        this._id = param4;
        this._msg = param1;
        this._SafeStr_5080 = new UtilsMap();
        this._SafeStr_4861 = param5;
        this._frame = param6;
        this._SafeStr_2221 = param7;
        this._embedded = param8;
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _msg: IMessageComposer;

    declare private _main: ModerationManager;

    declare private _frame: IWindowContainer;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _rooms: any[];

    declare private _embedded: boolean;
    static { (this.prototype as any)._embedded = false; }

    declare private _SafeStr_3520: IWindowContainer;

    declare private _SafeStr_4246: IWindowContainer;

    declare private _hilitedUserIds: Map<any, any>;

    declare private _SafeStr_2990: Timer;

    declare private _SafeStr_5080: UtilsMap;

    declare private _SafeStr_4861: IssueMessageData;

    private _contentLines: any[] = [];
    private _headers: any[] = [];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public show(): void {
        let _loc2_: IWindow = null;
        let _loc1_: IFrameWindow = castGuarded(this._main.getXmlWindow("evidence_frame"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        _loc1_.visible = false;
        let _loc3_: IItemListWindow = castGuarded(_loc1_.findChildByName("evidence_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_4246 = asGuarded(_loc3_.getListItemAt(0), isIWindowContainer);
        this._SafeStr_3520 = asGuarded(_loc3_.getListItemAt(1), isIWindowContainer);
        _loc3_.removeListItems();
        this._SafeStr_2990 = new Timer(1000, 1);
        this._SafeStr_2990.addEventListener("timer", this.onResizeTimer);
        if (!this._embedded) {
            this._frame = _loc1_;
            this._frame.procedure = this.onWindow;
            this._frame.visible = true;
            _loc2_ = this._frame.findChildByTag("close");
            _loc2_.procedure = this.onClose;
            this._SafeStr_2221 = _loc3_;
        } else {
            _loc1_.dispose();
        }
        this._main.connection.send(this._msg);
        this._main.messageHandler.addChatlogListener(this);
    }

    public hide(): void {
        this.dispose();
    }

    public onChatlog(param1: string, param2: number, param3: number, param4: any[], param5: Map<any, any>): void {
        let _loc6_: any = null;
        if (param2 != this._type || param3 != this._id || this._disposed) {
            return;
        }
        for (_loc6_ of this._contentLines ?? []) {
            this.recycleContentLine(_loc6_);
        }
        for (_loc6_ of this._headers ?? []) {
            _loc6_.dispose();
        }
        this._contentLines = [];
        this._headers = [];
        this._main.messageHandler.removeChatlogListener(this);
        this._rooms = param4;
        this._hilitedUserIds = param5;
        this.populate();
        this.onResizeTimer(null);
        if (!this._embedded) {
            this._frame.caption = param1;
            this._frame.visible = true;
        }
    }

    public getType(): number {
        return this._type;
    }

    public getId(): string {
        return "" + this._id;
    }

    public setId(param1: number): void {
        this._id = param1;
    }

    public getFrame(): IFrameWindow {
        return isIFrameWindow(this._frame) ? this._frame : null;
    }

    public dispose(): void {
        let _loc1_: any = null;
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._main = null;
        this._msg = null;
        this._SafeStr_4861 = null;
        if (this._SafeStr_2221 != null) {
            this._SafeStr_2221.removeListItems();
            this._SafeStr_2221.dispose();
            this._SafeStr_2221 = null;
        }
        if (this._frame != null) {
            this._frame.destroy();
            this._frame = null;
        }
        this._rooms = null;
        this._hilitedUserIds = null;
        if (this._SafeStr_2990 != null) {
            this._SafeStr_2990.stop();
            this._SafeStr_2990.removeEventListener("timer", this.onResizeTimer);
            this._SafeStr_2990 = null;
        }
        if (!this._embedded) {
            for (_loc1_ of this._contentLines ?? []) {
                this.recycleContentLine(_loc1_);
            }
            for (_loc1_ of this._headers ?? []) {
                _loc1_.dispose();
            }
        }
        this._contentLines = [];
        this._headers = [];
        if (this._SafeStr_3520 != null) {
            this._SafeStr_3520.dispose();
            this._SafeStr_3520 = null;
        }
        if (this._SafeStr_4246 != null) {
            this._SafeStr_4246.dispose();
            this._SafeStr_4246 = null;
        }
    }

    private populate(): void {
        let _loc1_: any = null;
        this._SafeStr_2221.autoArrangeItems = false;
        this._SafeStr_2221.removeListItems();
        for (_loc1_ of this._rooms ?? []) {
            this.populateEvidence(_loc1_);
        }
        this._SafeStr_2221.autoArrangeItems = true;
    }

    private populateEvidence(param1: ChatRecordData): void {
        let _loc10_: string = null;
        let _loc7_: number = 0;
        let _loc8_: ChatlineData = null;
        let _loc6_: IWindowContainer = this.createHeaderLine();
        let _loc9_: IWindow = _loc6_.findChildByName("text");
        let _loc2_: IButtonWindow = castGuarded(_loc6_.findChildByName("btnHeaderAction"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        let _loc3_: IButtonWindow = castGuarded(_loc6_.findChildByName("btnHeaderAction2"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        if (_loc3_) {
            _loc3_.visible = false;
        }
        switch (param1.recordType - 1) {
            case 0:
                if (param1.roomId > 0) {
                    _loc2_.caption = "Room tool";
                    if (param1.roomName == null) {
                        _loc9_.caption = "Room #" + param1.roomId;
                    } else {
                        _loc9_.caption = "Room: " + param1.roomName;
                    }
                    _loc3_.visible = true;
                    _loc3_.caption = "View room";
                    new OpenRoomInSpectatorMode(this._main, _loc3_, param1.roomId);
                    if (this._embedded) {
                        new OpenRoomTool(null, this._main, _loc2_, param1.roomId);
                        break;
                    }
                    new OpenRoomTool(isIFrameWindow(this._frame) ? this._frame : null, this._main, _loc2_, param1.roomId);
                }
                break;
            case 1:
                _loc9_.caption = "IM session";
                break;
            case 2:
                _loc9_.caption = "Forum thread";
                _loc3_.visible = true;
                _loc3_.caption = "Open thread";
                new OpenDiscussionThread(this._main, _loc3_, param1.groupId, param1.threadId);
                _loc2_.caption = "Delete";
                new HideDiscussionThread(this._main, this, _loc2_, param1.groupId, param1.threadId);
                break;
            case 3:
                _loc9_.caption = "Forum message";
                _loc3_.visible = true;
                _loc3_.caption = "Open Message";
                new OpenDiscussionMessage(this._main, _loc3_, param1.groupId, param1.threadId, param1.context.get("messageIndex") | 0);
                _loc2_.caption = "Delete";
                new HideDiscussionMessage(this._main, this, _loc2_, param1.groupId, param1.threadId, param1.messageId);
                break;
            case 4:
                _loc9_.caption = "Selfie report";
                _loc3_.visible = true;
                _loc3_.caption = "View selfie";
                new OpenExternalLink(this._main, _loc3_, stringOrNull(param1.context.get("url")));
                _loc2_.visible = true;
                _loc2_.caption = "Room tool";
                if (this._embedded) {
                    new OpenRoomTool(null, this._main, _loc2_, param1.roomId);
                    break;
                }
                new OpenRoomTool(isIFrameWindow(this._frame) ? this._frame : null, this._main, _loc2_, param1.roomId);
                break;
            case 5:
                _loc9_.caption = "Photo report";
                _loc3_.visible = true;
                _loc3_.caption = "Moderate photo";
                _loc10_ = this._main.getProperty("stories.admin.tool.base.url");
                if (StringUtil.isEmpty(_loc10_)) {
                    _loc10_ = "https://theallseeingeye.sulake.com/habbo-stories-admin/#/photos/";
                }
                _loc10_ += param1.context.get("extraDataId");
                new OpenExternalLink(this._main, _loc3_, _loc10_);
                _loc2_.visible = true;
                _loc2_.caption = "Room tool";
                if (this._embedded) {
                    new OpenRoomTool(null, this._main, _loc2_, param1.roomId);
                    break;
                }
                new OpenRoomTool(isIFrameWindow(this._frame) ? this._frame : null, this._main, _loc2_, param1.roomId);
        }
        this.addHeaderLineToList(_loc6_);
        let _loc4_: any = true;
        let _loc5_: any = -1;
        _loc7_ = 0;
        while (_loc7_ < param1.chatlog.length) {
            _loc8_ = param1.chatlog[_loc7_];
            this.populateContentLine(_loc8_, _loc4_);
            _loc4_ = !_loc4_;
            if (_loc8_.hasHighlighting && _loc5_ == -1) {
                _loc5_ = _loc7_;
            }
            _loc7_++;
        }
        if (_loc5_ > -1) {
            this._SafeStr_2221.autoArrangeItems = true;
            if (this._SafeStr_2221.maxScrollV > 0) {
                this._SafeStr_2221.scrollV = this._SafeStr_2221.getListItemAt(_loc5_ >>> 0).y / this._SafeStr_2221.maxScrollV;
            }
        }
    }

    private addContentLineToList(param1: IWindowContainer): void {
        this._SafeStr_2221.addListItem(param1);
        this._contentLines.push(param1);
    }

    private addHeaderLineToList(param1: IWindowContainer): void {
        this._SafeStr_2221.addListItem(param1);
        this._headers.push(param1);
    }

    private createContentLine(): IWindowContainer {
        if (ChatlogCtrl.CHAT_LINE_POOL.length > 0) {
            return asGuarded(ChatlogCtrl.CHAT_LINE_POOL.pop(), isIWindowContainer);
        }
        return castGuarded(this._SafeStr_3520.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private recycleContentLine(param1: IWindowContainer): void {
        let _loc2_: ITextWindow = null;
        if (ChatlogCtrl.CHAT_LINE_POOL.length < ChatlogCtrl.CHAT_LINE_POOL_MAX_SIZE) {
            _loc2_ = castGuarded(param1.findChildByName("chatter_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc2_.removeEventListener("WME_CLICK", this.onUserClick);
            param1.width = this._SafeStr_3520.width;
            param1.height = this._SafeStr_3520.height - 10;
            ChatlogCtrl.CHAT_LINE_POOL.push(param1);
        } else {
            param1.dispose();
        }
    }

    private createHeaderLine(): IWindowContainer {
        return asGuarded(this._SafeStr_4246.clone(), isIWindowContainer);
    }

    private populateContentLine(param1: ChatlineData, param2: boolean): void {
        let _loc5_: TextFormat = null;
        let _loc7_: IWindowContainer = this.createContentLine();
        let _loc8_: IWindow = _loc7_.findChildByName("time_txt");
        let _loc4_: ITextWindow = castGuarded(_loc7_.findChildByName("chatter_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc6_: ITextWindow = asGuarded(_loc7_.findChildByName("msg_txt"), isITextWindow);
        _loc8_.caption = param1.timeStamp;
        let _loc9_: any = this._hilitedUserIds.get(param1.chatterId);
        if (_loc9_ != null) {
            _loc7_.color = (typeof _loc9_ === "number" && (_loc9_ | 0) === _loc9_ ? _loc9_ : null) == 0 ? 4293973667 : 4288921072;
        } else {
            _loc7_.color = param2 ? 4291030266 : 4294967295;
        }
        if (param1.hasHighlighting) {
            _loc5_ = _loc6_.getTextFormat();
            _loc5_.bold = true;
            _loc6_.setTextFormat(_loc5_);
            _loc6_.bold = true;
        }
        if (param1.chatterId > 0) {
            _loc4_.text = param1.chatterName;
            _loc4_.underline = true;
            _loc4_.addEventListener("WME_CLICK", this.onUserClick);
            if (!this._SafeStr_5080.getValue(param1.chatterName)) {
                this._SafeStr_5080.add(param1.chatterName, param1.chatterId);
            }
        } else if (param1.chatterId == 0) {
            _loc4_.text = "Bot / pet";
            _loc4_.underline = false;
        } else {
            _loc4_.text = "-";
            _loc4_.underline = false;
        }
        _loc4_.color = _loc7_.color;
        _loc8_.color = _loc7_.color;
        _loc6_.color = _loc7_.color;
        _loc6_.text = param1.msg;
        let _loc3_: number = Math.max(_loc8_.height, _loc6_.textHeight + 5) | 0;
        _loc6_.height = _loc3_;
        if (_loc6_.getTextFormat()) {
            _loc6_.getTextFormat().align = "left";
            _loc6_.getTextFormat().rightMargin = _loc6_.getTextFormat().rightMargin + 10;
        }
        _loc4_.height = _loc3_;
        _loc8_.height = _loc3_;
        _loc7_.height = _loc3_;
        this.addContentLineToList(_loc7_);
    }

    private onUserClick = (param1: WindowMouseEvent): void => {
        let _loc2_: string = param1.target.caption;
        let _loc3_: number = this._SafeStr_5080.getValue(_loc2_) | 0;
        this._main.windowTracker.show(new UserInfoFrameCtrl(this._main, _loc3_, this._SafeStr_4861), isIFrameWindow(this._frame) ? this._frame : null, false, false, true);
    };

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
        this._SafeStr_2990.reset();
        this._SafeStr_2990.start();
    };

    private refreshListDims(): void {
        let _loc4_: IWindowContainer = null;
        let _loc2_: ITextWindow = null;
        let _loc3_: number = 0;
        this._SafeStr_2221.autoArrangeItems = false;
        let _loc1_: number = this._SafeStr_2221.numListItems;
        _loc3_ = 0;
        while (_loc3_ < _loc1_) {
            _loc4_ = castGuarded(this._SafeStr_2221.getListItemAt(_loc3_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            if (_loc4_.name == "chatline") {
                _loc2_ = castGuarded(_loc4_.findChildByName("msg_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
                _loc2_.width = _loc4_.width - _loc2_.x;
                _loc2_.height = _loc2_.textHeight + 5 | 0;
                _loc4_.height = _loc2_.height;
            }
            _loc3_++;
        }
        this._SafeStr_2221.autoArrangeItems = true;
    }

    private refreshScrollBarVisibility(): boolean {
        let _loc2_: IWindowContainer = castGuarded(this._SafeStr_2221.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc4_: IWindow = asGuarded(_loc2_.getChildByName("scroller"), isIWindow);
        let _loc3_: any = this._SafeStr_2221.scrollableRegion.height > this._SafeStr_2221.height;
        let _loc1_: number = 22;
        if (_loc4_.visible) {
            if (_loc3_) {
                return false;
            }
            _loc4_.visible = false;
            this._SafeStr_2221.width += _loc1_;
            return true;
        }
        if (_loc3_) {
            _loc4_.visible = true;
            this._SafeStr_2221.width -= _loc1_;
            return true;
        }
        return false;
    }

    private onResizeTimer = (param1: TimerEvent): void => {
        this.refreshListDims();
        let _loc2_: boolean = this.refreshScrollBarVisibility();
    };

    get [IDisposable](): true {
        return true;
    }

    get [ITrackedWindow](): true {
        return true;
    }
}

import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ChatRegistryItem } from '@/com/sulake/habbo/help/cfh/registry/chat/ChatRegistryItem';
import type { InstantMessageRegistryItem } from '@/com/sulake/habbo/help/cfh/registry/instantmessage/InstantMessageRegistryItem';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ChatReportController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::ChatReportController'); }

    private static readonly COLOR_ITEM_SELECTED: number = 4282169599;
    private static readonly COLOR_ITEM_NORMAL: number = 4293848814;

    declare private _habboHelp: HabboHelp;

    declare private _window: IWindowContainer;

    declare private _SafeStr_7182: (...args: any[]) => any;

    declare private _reportedRoomId: number;
    static { (this.prototype as any)._reportedRoomId = 0; }

    declare private _reportedUserId: number;
    static { (this.prototype as any)._reportedUserId = 0; }

    private _disposed: boolean = false;

    constructor(param1: HabboHelp, param2: (...args: any[]) => any) {
        this._habboHelp = param1;
        this._SafeStr_7182 = param2;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get reportedRoomId(): number {
        return this._reportedRoomId;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.closeWindow();
            this._habboHelp = null;
            this._disposed = true;
        }
    }

    public show(param1: number, param2: number, param3: number): void {
        this._window = asGuarded(this._habboHelp.getXmlWindow("chat_report"), isIWindowContainer);
        this._window.procedure = this._SafeStr_7182;
        this._window.center();
        this._reportedUserId = param2;
        this._reportedRoomId = -1;
        if (param3 == 3) {
            this.deselectInstantMessageEntries();
            this.populateInstantMessageList(param1, param2);
        } else {
            this.deselectChatEntries();
            this.populateChatMessageList(param1, param2);
        }
    }

    public closeWindow(): void {
        if (this._habboHelp && this._habboHelp.chatRegistry) {
            this._habboHelp.chatRegistry.holdPurges = false;
        }
        if (this._habboHelp && this._habboHelp.instantMessageRegistry) {
            this._habboHelp.instantMessageRegistry.holdPurges = false;
        }
        if (this._window) {
            this._window.dispose();
        }
        this._window = null;
    }

    public collectSelectedEntries(param1: number, param2: number): any[] {
        let _loc6_: number = 0;
        let _loc4_: any = undefined;
        let _loc3_: any[] = [];
        if (param1 == 3) {
            _loc6_ = param2 > 0 ? param2 : this._reportedUserId;
            _loc4_ = this._habboHelp.instantMessageRegistry.getItemsByUser(_loc6_);
            for (const _loc5_ of valuesOf(_loc4_)) {
                if (_loc5_.selected) {
                    if (_loc5_.userId < 0) {
                        _loc3_.push(Number(_loc5_.userName.split(":")[0]));
                        _loc3_.push(_loc5_.text);
                    } else {
                        _loc3_.push(_loc5_.userId);
                        _loc3_.push(_loc5_.text);
                    }
                }
            }
        } else {
            for (const _loc7_ of this._habboHelp.chatRegistry.getItems() ?? []) {
                if (_loc7_.selected) {
                    _loc3_.push(_loc7_.userId);
                    _loc3_.push(_loc7_.text);
                }
            }
        }
        return _loc3_;
    }

    private populateInstantMessageList(param1: number, param2: number): void {
        let _loc4_: IWindowContainer = null;
        let _loc7_: ITextWindow = null;
        let _loc8_: IItemListWindow = asGuarded(this._window.findChildByName("room_items"), isIItemListWindow);
        let _loc3_: IWindowContainer = asGuarded(_loc8_.getListItemAt(0), isIWindowContainer);
        let _loc5_: IWindowContainer = asGuarded(this._habboHelp.getXmlWindow("chat_report_item"), isIWindowContainer);
        _loc8_.removeListItems();
        let _loc6_: IWindowContainer = asGuarded(_loc3_.clone(), isIWindowContainer);
        _loc8_.addListItemAt(_loc6_, 0);
        let _loc10_: IItemListWindow = asGuarded(_loc6_.findChildByName("chat_items"), isIItemListWindow);
        _loc10_.removeListItems();
        this._habboHelp.instantMessageRegistry.holdPurges = true;
        let _loc9_: InstantMessageRegistryItem[] = this._habboHelp.instantMessageRegistry.getItemsByUser(param2);
        for (const _loc11_ of _loc9_ ?? []) {
            _loc4_ = asGuarded(_loc5_.clone(), isIWindowContainer);
            _loc7_ = asGuarded(_loc4_.getChildByName("text"), isITextWindow);
            if (_loc11_.userId < 0) {
                _loc7_.caption = _loc11_.userName.split(":")[1] + ": " + _loc11_.text;
            } else {
                _loc7_.caption = _loc11_.userName + ": " + _loc11_.text;
            }
            _loc4_.id = _loc11_.index;
            _loc4_.procedure = this.onInstantMessageEntryEvent;
            _loc4_.color = 4293848814;
            _loc10_.addListItem(_loc4_);
        }
    }

    private populateChatMessageList(param1: number, param2: number): void {
        let _loc9_: number = 0;
        let _loc6_: IWindowContainer = null;
        let _loc11_: IItemListWindow = null;
        let _loc4_: IWindowContainer = null;
        let _loc7_: ITextWindow = null;
        let _loc8_: IItemListWindow = asGuarded(this._window.findChildByName("room_items"), isIItemListWindow);
        let _loc3_: IWindowContainer = asGuarded(_loc8_.getListItemAt(0), isIWindowContainer);
        let _loc5_: IWindowContainer = asGuarded(this._habboHelp.getXmlWindow("chat_report_item"), isIWindowContainer);
        _loc8_.removeListItems();
        this._habboHelp.chatRegistry.holdPurges = true;
        let _loc10_: ChatRegistryItem[] = param2 > 0 ? this._habboHelp.chatRegistry.getItemsByUser(param2) : this._habboHelp.chatRegistry.getItems();
        for (const _loc12_ of _loc10_ ?? []) {
            if (_loc12_.userId != param1) {
                if (_loc12_.roomId != _loc9_) {
                    _loc9_ = _loc12_.roomId;
                    _loc6_ = asGuarded(_loc3_.clone(), isIWindowContainer);
                    _loc6_.findChildByName("room_name").caption = "Room: " + _loc12_.roomName;
                    _loc8_.addListItemAt(_loc6_, 0);
                    _loc11_ = asGuarded(_loc6_.findChildByName("chat_items"), isIItemListWindow);
                    _loc11_.removeListItems();
                }
                _loc4_ = asGuarded(_loc5_.clone(), isIWindowContainer);
                _loc7_ = asGuarded(_loc4_.getChildByName("text"), isITextWindow);
                _loc7_.caption = _loc12_.userName + ": " + _loc12_.text;
                _loc4_.id = _loc12_.index;
                _loc4_.procedure = this.onChatEntryEvent;
                _loc4_.color = 4293848814;
                _loc11_.addListItem(_loc4_);
            }
        }
    }

    private onChatEntryEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ChatRegistryItem = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._habboHelp.chatRegistry.getItem(param2.id >>> 0);
            if (!_loc3_) {
                return;
            }
            if (!_loc3_.selected && _loc3_.roomId != this._reportedRoomId) {
                this._reportedRoomId = _loc3_.roomId;
                this.deselectChatEntries();
            }
            _loc3_.selected = !_loc3_.selected;
            param2.color = _loc3_.selected ? 4282169599 : 4293848814;
        }
    };

    private onInstantMessageEntryEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: InstantMessageRegistryItem = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._habboHelp.instantMessageRegistry.getItem(this._reportedUserId, param2.id >>> 0);
            if (!_loc3_) {
                return;
            }
            _loc3_.selected = !_loc3_.selected;
            param2.color = _loc3_.selected ? 4282169599 : 4293848814;
        }
    };

    private deselectInstantMessageEntries(): void {
        this.deselectAllEntries();
        this.refreshInstantMessageEntries();
    }

    private deselectChatEntries(): void {
        this.deselectAllEntries();
        this.refreshChatEntries();
    }

    private deselectAllEntries(): void {
        let _loc3_: any;
        for (const _loc2_ of valuesOf(this._habboHelp.instantMessageRegistry.getItems())) {
            for (_loc3_ of valuesOf(_loc2_)) {
                _loc3_.selected = false;
            }
        }
        for (const _loc1_ of this._habboHelp.chatRegistry.getItems() ?? []) {
            _loc1_.selected = false;
        }
    }

    private refreshChatEntries(): void {
        let _loc3_: number = 0;
        let _loc2_: IWindowContainer = null;
        let _loc6_: IItemListWindow = null;
        let _loc4_: number = 0;
        let _loc1_: IWindow = null;
        let _loc7_: ChatRegistryItem = null;
        let _loc5_: IItemListWindow = asGuarded(this._window.findChildByName("room_items"), isIItemListWindow);
        _loc3_ = 0;
        while (_loc3_ < _loc5_.numListItems) {
            _loc2_ = asGuarded(_loc5_.getListItemAt(_loc3_ >>> 0), isIWindowContainer);
            _loc6_ = asGuarded(_loc2_.findChildByName("chat_items"), isIItemListWindow);
            _loc4_ = 0;
            while (_loc4_ < _loc6_.numListItems) {
                _loc1_ = asGuarded(_loc6_.getListItemAt(_loc4_ >>> 0), isIWindow);
                _loc7_ = this._habboHelp.chatRegistry.getItem(_loc1_.id >>> 0);
                if (_loc7_) {
                    _loc1_.color = _loc7_.selected ? 4282169599 : 4293848814;
                }
                _loc4_++;
            }
            _loc3_++;
        }
    }

    public refreshInstantMessageEntries(): void {
        let _loc3_: number = 0;
        let _loc2_: IWindowContainer = null;
        let _loc6_: IItemListWindow = null;
        let _loc4_: number = 0;
        let _loc1_: IWindow = null;
        let _loc7_: InstantMessageRegistryItem = null;
        let _loc5_: IItemListWindow = asGuarded(this._window.findChildByName("room_items"), isIItemListWindow);
        _loc3_ = 0;
        while (_loc3_ < _loc5_.numListItems) {
            _loc2_ = asGuarded(_loc5_.getListItemAt(_loc3_ >>> 0), isIWindowContainer);
            _loc6_ = asGuarded(_loc2_.findChildByName("chat_items"), isIItemListWindow);
            _loc4_ = 0;
            while (_loc4_ < _loc6_.numListItems) {
                _loc1_ = asGuarded(_loc6_.getListItemAt(_loc4_ >>> 0), isIWindow);
                _loc7_ = this._habboHelp.instantMessageRegistry.getItem(this._reportedUserId, _loc1_.id >>> 0);
                if (_loc7_) {
                    _loc1_.color = _loc7_.selected ? 4282169599 : 4293848814;
                }
                _loc4_++;
            }
            _loc3_++;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}

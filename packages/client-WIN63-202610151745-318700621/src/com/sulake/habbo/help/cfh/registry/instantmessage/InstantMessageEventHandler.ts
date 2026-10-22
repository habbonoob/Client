import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ConsoleMessageHistoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/ConsoleMessageHistoryMessageParser';
import type { NewConsoleMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/NewConsoleMessageMessageParser';
import type { RoomInviteMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/RoomInviteMessageParser';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ConsoleMessageHistoryEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/ConsoleMessageHistoryEvent';
import { NewConsoleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/NewConsoleMessageEvent';
import { RoomInviteEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/RoomInviteEvent';

export class InstantMessageEventHandler implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.instantmessage::InstantMessageEventHandler'); }

    declare private _component: HabboHelp;

    constructor(param1: HabboHelp) {
        this._component = param1;
        this._component.addMessageEvent(new ConsoleMessageHistoryEvent(this.onConsoleHistory));
        this._component.addMessageEvent(new NewConsoleMessageEvent(this.onInstantMessage));
        this._component.addMessageEvent(new RoomInviteEvent(this.onRoomInvite));
    }

    private onConsoleHistory = (param1: ConsoleMessageHistoryEvent): void => {
        let _loc2_: ConsoleMessageHistoryMessageParser = param1.getParser();
        for (const _loc3_ of _loc2_.historyFragment ?? []) {
            if (_loc3_.senderId == _loc2_.chatId) {
                this._component.instantMessageRegistry.addItem(_loc2_.chatId, stringOrNull(_loc3_.senderName), stringOrNull(_loc3_.message));
            }
        }
    };

    public onInstantMessage = (param1: NewConsoleMessageEvent): void => {
        let _loc2_: NewConsoleMessageMessageParser = param1.getParser();
        if (_loc2_.chatId < 0) {
            this._component.instantMessageRegistry.addItem(_loc2_.chatId | 0, _loc2_.senderName, _loc2_.messageText);
        } else {
            this._component.instantMessageRegistry.addItem(_loc2_.chatId | 0, _loc2_.senderName, _loc2_.messageText);
        }
    };

    public onRoomInvite = (param1: RoomInviteEvent): void => {
        let _loc2_: RoomInviteMessageParser = param1.getParser();
        this._component.instantMessageRegistry.addItem(_loc2_.senderId, "", _loc2_.messageText);
    };

    public dispose(): void {
        if (!this.disposed) {
            if (this._component) {
                this._component = null;
            }
        }
    }

    public get disposed(): boolean {
        return this._component == null;
    }

    get [IDisposable](): true {
        return true;
    }
}

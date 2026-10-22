import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { ChatItem } from '@/com/sulake/habbo/freeflowchat/data/ChatItem';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { IChatHistoryEntryBitmap } from '@/com/sulake/habbo/freeflowchat/history/visualization/entry/IChatHistoryEntryBitmap';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ChatHistoryBuffer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history::ChatHistoryBuffer'); }

    private readonly MAX_CHAT_ITEMS: number = 1000;

    constructor(param1: HabboFreeFlowChat) {
        this._component = param1;
    }

    declare private _component: HabboFreeFlowChat;

    private _entries: IChatHistoryEntryBitmap[] = new Array<IChatHistoryEntryBitmap>(0).fill(null);

    public get entries(): IChatHistoryEntryBitmap[] {
        return this._entries;
    }

    public get disposed(): boolean {
        return this._component == null;
    }

    public get totalHeight(): number {
        let _loc2_: number = 0;
        for (const _loc1_ of this._entries ?? []) {
            _loc2_ = _loc2_ + (_loc1_.bitmap.height - _loc1_.overlap.y - 8) | 0;
        }
        return _loc2_;
    }

    public dispose(): void {
        this._entries = null;
        this._component = null;
    }

    public insertChat(param1: ChatItem): void {
        let _loc2_: IChatHistoryEntryBitmap = null;
        try {
            _loc2_ = this._component.chatBubbleFactory.getHistoryLineEntry(param1);
        } catch (e) {
            if ((e.errorID ?? 0) == 2015) {
                return;
            }
            throw e;
        }
        this._entries.push(_loc2_);
        this.checkBufferOverflowAndSpliceTop(_loc2_);
        if (this._component.chatHistoryScrollView.isActive) {
            this._component.chatHistoryScrollView.addHistoryEntry(this._entries[this._entries.length - 1]);
        }
    }

    public insertRoomChange(param1: GuestRoomData): void {
        let _loc2_: IChatHistoryEntryBitmap = this._component.chatBubbleFactory.getHistoryRoomChangeEntry(param1);
        this._entries.push(_loc2_);
        this.checkBufferOverflowAndSpliceTop(_loc2_);
    }

    private checkBufferOverflowAndSpliceTop(param1: IChatHistoryEntryBitmap): void {
        if (this._entries.length > 1000) {
            this._component.chatHistoryScrollView.scrollUpAndSpliceTopItem(param1.bitmap.height - param1.overlap.y - 8 | 0);
            this._entries.splice(0, 1);
        }
    }

    get [IDisposable](): true {
        return true;
    }
}

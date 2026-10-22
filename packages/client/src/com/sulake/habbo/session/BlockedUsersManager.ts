import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { SessionDataManager } from '@/com/sulake/habbo/session/SessionDataManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { BlockListMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/BlockListMessageEvent';
import { BlockUserUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/BlockUserUpdateMessageEvent';
import { BlockUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/BlockUserMessageComposer';
import { GetBlockedUsersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetBlockedUsersMessageComposer';
import { UnblockUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/UnblockUserMessageComposer';

export class BlockedUsersManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.session::BlockedUsersManager'); }

    constructor(param1: SessionDataManager) {
        this._sessionDataManager = param1;
        this._SafeStr_3081 = new Dictionary();
        if (this._sessionDataManager.communication) {
            this._SafeStr_4849 = this._sessionDataManager.communication.addHabboConnectionMessageEvent(new BlockUserUpdateMessageEvent(this.onBlockUpdate));
            this._SafeStr_5470 = this._sessionDataManager.communication.addHabboConnectionMessageEvent(new BlockListMessageEvent(this.onBlockList));
        }
    }

    declare private _sessionDataManager: SessionDataManager;

    declare private _SafeStr_4849: IMessageEvent;

    declare private _SafeStr_5470: IMessageEvent;

    declare private _SafeStr_3081: Map<any, any>;

    public get disposed(): boolean {
        return this._sessionDataManager == null;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._sessionDataManager.communication) {
            this._sessionDataManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_4849);
            this._sessionDataManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_5470);
        }
        this._SafeStr_4849 = null;
        this._SafeStr_5470 = null;
        this._sessionDataManager = null;
        this._SafeStr_3081 = null;
    }

    public initBlockList(): void {
        this._sessionDataManager.send(new GetBlockedUsersMessageComposer());
    }

    public blockUser(param1: number): void {
        this._sessionDataManager.send(new BlockUserMessageComposer(param1));
    }

    public unblockUser(param1: number): void {
        this._sessionDataManager.send(new UnblockUserMessageComposer(param1));
    }

    public isBlocked(param1: number): boolean {
        return !!(this._SafeStr_3081 && this._SafeStr_3081.get(param1));
    }

    private onBlockList = (param1: BlockListMessageEvent): void => {
        this._SafeStr_3081 = new Dictionary();
        let _loc2_: any[] = param1.blockedUserIds;
        for (const _loc3_ of _loc2_ ?? []) {
            this._SafeStr_3081.set(_loc3_, true);
        }
    };

    private onBlockUpdate = (param1: BlockUserUpdateMessageEvent): void => {
        let _loc2_: number = param1.userId;
        switch (param1.result) {
            case 0:
                this.removeUserFromBlockList(_loc2_);
                this._sessionDataManager.notifications.addItem("${notification.unblocked_player}", "info");
                break;
            case 1:
                this.addUserToBlockList(_loc2_);
                this._sessionDataManager.notifications.addItem("${notification.blocked_player}", "info");
        }
    };

    private addUserToBlockList(param1: number): void {
        this._SafeStr_3081.set(param1, true);
    }

    private removeUserFromBlockList(param1: number): void {
        this._SafeStr_3081.delete(param1);
    }

    get [IDisposable](): true {
        return true;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { SessionDataManager } from '@/com/sulake/habbo/session/SessionDataManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IgnoredUsersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/IgnoredUsersMessageEvent';
import { IgnoreResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/IgnoreResultMessageEvent';
import { GetIgnoredUsersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetIgnoredUsersMessageComposer';
import { IgnoreUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/IgnoreUserMessageComposer';
import { UnignoreUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/UnignoreUserMessageComposer';

export class IgnoredUsersManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.session::IgnoredUsersManager'); }

    constructor(param1: SessionDataManager) {
        this._sessionDataManager = param1;
        if (this._sessionDataManager.communication) {
            this._SafeStr_5190 = this._sessionDataManager.communication.addHabboConnectionMessageEvent(new IgnoreResultMessageEvent(this.onIgnoreResult));
            this._SafeStr_5142 = this._sessionDataManager.communication.addHabboConnectionMessageEvent(new IgnoredUsersMessageEvent(this.onIgnoreList));
        }
    }

    declare private _sessionDataManager: SessionDataManager;

    declare private _SafeStr_5190: IMessageEvent;

    declare private _SafeStr_5142: IMessageEvent;

    private _SafeStr_3287: any[] = [];

    public get disposed(): boolean {
        return this._sessionDataManager == null;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._sessionDataManager.communication) {
            this._sessionDataManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_5190);
            this._sessionDataManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_5142);
        }
        this._SafeStr_5190 = null;
        this._SafeStr_5142 = null;
        this._sessionDataManager = null;
    }

    public initIgnoreList(): void {
        this._sessionDataManager.send(new GetIgnoredUsersMessageComposer());
    }

    public ignoreUser(param1: number): void {
        this._sessionDataManager.send(new IgnoreUserMessageComposer(param1));
    }

    public unignoreUser(param1: number): void {
        this._sessionDataManager.send(new UnignoreUserMessageComposer(param1));
    }

    public isIgnored(param1: number): boolean {
        return this._SafeStr_3287.indexOf(param1) >= 0;
    }

    private onIgnoreList = (param1: IgnoredUsersMessageEvent): void => {
        this._SafeStr_3287 = param1.ignoredUserIds;
    };

    private onIgnoreResult = (param1: IgnoreResultMessageEvent): void => {
        let _loc2_: number = param1.userId;
        switch (param1.result) {
            case 1:
                this.addUserToIgnoreList(_loc2_);
                break;
            case 2:
                this.addUserToIgnoreList(_loc2_);
                this._SafeStr_3287.shift();
                break;
            case 3:
                this.removeUserFromIgnoreList(_loc2_);
        }
    };

    private addUserToIgnoreList(param1: number): void {
        if (this._SafeStr_3287.indexOf(param1) < 0) {
            this._SafeStr_3287.push(param1);
        }
    }

    private removeUserFromIgnoreList(param1: number): void {
        let _loc2_: number = this._SafeStr_3287.indexOf(param1);
        if (_loc2_ >= 0) {
            this._SafeStr_3287.splice(_loc2_, 1);
        }
    }

    get [IDisposable](): true {
        return true;
    }
}

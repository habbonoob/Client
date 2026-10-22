import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { SessionDataManager } from '@/com/sulake/habbo/session/SessionDataManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomReadyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/RoomReadyMessageEvent';
import { HabboGroupBadgesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupBadgesMessageEvent';
import { GetHabboGroupBadgesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupBadgesMessageComposer';

export class HabboGroupInfoManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.session::HabboGroupInfoManager'); }

    constructor(param1: SessionDataManager) {
        this._sessionDataManager = param1;
        this._badges = new UtilsMap();
        if (this._sessionDataManager.communication) {
            this._SafeStr_6462 = this._sessionDataManager.communication.addHabboConnectionMessageEvent(new RoomReadyMessageEvent(this.onRoomReady));
            this._SafeStr_3668 = this._sessionDataManager.communication.addHabboConnectionMessageEvent(new HabboGroupBadgesMessageEvent(this.onHabboGroupBadges));
        }
    }

    declare private _sessionDataManager: SessionDataManager;

    declare private _badges: UtilsMap;

    declare private _SafeStr_6462: IMessageEvent;

    declare private _SafeStr_3668: IMessageEvent;

    public get disposed(): boolean {
        return this._sessionDataManager == null;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._sessionDataManager.communication) {
            this._sessionDataManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_6462);
            this._sessionDataManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_3668);
        }
        this._badges = null;
        this._sessionDataManager = null;
    }

    public getBadgeId(param1: number): string {
        return stringOrNull(this._badges.getValue(param1));
    }

    private onRoomReady = (param1: IMessageEvent): void => {
        this._sessionDataManager.send(new GetHabboGroupBadgesMessageComposer());
    };

    private onHabboGroupBadges = (param1: HabboGroupBadgesMessageEvent): void => {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: UtilsMap = param1.badges;
        _loc4_ = 0;
        while (_loc4_ < _loc2_.length) {
            _loc3_ = _loc2_.getKey(_loc4_) | 0;
            this._badges.remove(_loc3_);
            this._badges.add(_loc3_, _loc2_.getWithIndex(_loc4_));
            _loc4_++;
        }
    };

    get [IDisposable](): true {
        return true;
    }
}

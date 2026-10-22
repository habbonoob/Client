import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetFriendsWeeklyCompetitiveLeaderboardComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.game.score::GetFriendsWeeklyCompetitiveLeaderboardComposer'); }

    private _data: any[] = [];

    constructor(param1: number, param2: number) {
        this._data.push(param1);
        this._data.push(param2);
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
        this._data = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

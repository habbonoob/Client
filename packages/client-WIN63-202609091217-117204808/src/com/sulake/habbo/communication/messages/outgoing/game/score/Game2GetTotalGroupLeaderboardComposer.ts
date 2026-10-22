import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class Game2GetTotalGroupLeaderboardComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.game.score::Game2GetTotalGroupLeaderboardComposer'); }

    private _data: any[] = [];

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number) {
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
        this._data.push(param4);
        this._data.push(param5);
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

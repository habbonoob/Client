import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class Game2SetUserMoveTargetMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.game.ingame::Game2SetUserMoveTargetMessageComposer'); }

    private _data: any[] = [];

    constructor(param1: number, param2: number, param3: number, param4: number) {
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
        this._data.push(param4);
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
        this._data = [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class Game2RequestFullStatusUpdateMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.game.ingame::Game2RequestFullStatusUpdateMessageComposer'); }

    constructor(param1: number) {
        this._data.push(param1);
    }

    private _data: any[] = [];

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

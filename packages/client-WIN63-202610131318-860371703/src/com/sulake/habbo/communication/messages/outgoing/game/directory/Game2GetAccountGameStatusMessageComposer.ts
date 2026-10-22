import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class Game2GetAccountGameStatusMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.game.directory::Game2GetAccountGameStatusMessageComposer'); }

    private _data: any[] = [];

    constructor(param1: number) {
        this._data.push(param1);
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class Game2GameChatMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.game.arena::Game2GameChatMessageComposer'); }

    constructor(param1: string) {
        this._SafeStr_5095 = param1;
    }

    declare private _SafeStr_5095: string;

    public getMessageArray(): any[] {
        return [this._SafeStr_5095];
    }

    public dispose(): void {
        this._SafeStr_5095 = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

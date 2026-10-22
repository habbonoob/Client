import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class Game2ExitGameMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.game.arena::Game2ExitGameMessageComposer'); }

    declare private _SafeStr_6882: boolean;
    static { (this.prototype as any)._SafeStr_6882 = false; }

    constructor(param1: boolean = true) {
        this._SafeStr_6882 = param1;
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_6882];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}

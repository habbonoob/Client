import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class CommandBotComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.bots::CommandBotComposer'); }

    declare private _botId: number;
    static { (this.prototype as any)._botId = 0; }

    declare private _SafeStr_6610: number;
    static { (this.prototype as any)._SafeStr_6610 = 0; }

    declare private _SafeStr_6171: string;

    constructor(param1: number, param2: number, param3: string) {
        this._botId = param1;
        this._SafeStr_6610 = param2;
        this._SafeStr_6171 = param3;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._botId, this._SafeStr_6610, this._SafeStr_6171];
    }

    get [IMessageComposer](): true {
        return true;
    }
}

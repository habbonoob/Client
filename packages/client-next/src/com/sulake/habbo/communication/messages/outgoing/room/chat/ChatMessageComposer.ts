import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ChatMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.chat::ChatMessageComposer'); }

    declare private _text: string;

    private _SafeStr_5349: number = 0;
    private _styleId: number = 0;

    constructor(param1: string, param2: number = 0, param3: number = -1) {
        this._text = param1;
        this._styleId = param2;
        this._SafeStr_5349 = param3;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._text, this._styleId, this._SafeStr_5349];
    }

    get [IMessageComposer](): true {
        return true;
    }
}

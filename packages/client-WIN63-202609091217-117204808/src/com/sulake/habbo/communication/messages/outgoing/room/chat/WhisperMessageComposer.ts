import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class WhisperMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.chat::WhisperMessageComposer'); }

    declare private _text: string;

    declare private _recipientName: string;

    private _styleId: number = 0;

    constructor(param1: string, param2: string, param3: number = 0) {
        this._recipientName = param1;
        this._text = param2;
        this._styleId = param3;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._recipientName + " " + this._text, this._styleId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}

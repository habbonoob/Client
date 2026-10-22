import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ShoutMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.chat::ShoutMessageComposer'); }

    constructor(param1: string, param2: number = 0) {
        this._text = param1;
        this._styleId = param2;
    }

    declare private _text: string;

    private _styleId: number = 0;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._text, this._styleId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}

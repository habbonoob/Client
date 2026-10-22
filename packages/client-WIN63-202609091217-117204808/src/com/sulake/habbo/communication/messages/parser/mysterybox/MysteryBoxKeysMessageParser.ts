import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MysteryBoxKeysMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.mysterybox::MysteryBoxKeysMessageParser'); }

    declare private _boxColor: string;

    declare private _keyColor: string;

    constructor() {
    }

    public flush(): boolean {
        this._boxColor = null;
        this._keyColor = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._boxColor = param1.readString();
        this._keyColor = param1.readString();
        return true;
    }

    public get boxColor(): string {
        return this._boxColor;
    }

    public get keyColor(): string {
        return this._keyColor;
    }
}

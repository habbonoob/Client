import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class SpecialRoomEffectMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::SpecialRoomEffectMessageParser'); }

    private _effectId: number = -1;

    constructor() {
    }

    public flush(): boolean {
        this._effectId = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._effectId = param1.readInteger();
        return true;
    }

    public get effectId(): number {
        return this._effectId;
    }
}

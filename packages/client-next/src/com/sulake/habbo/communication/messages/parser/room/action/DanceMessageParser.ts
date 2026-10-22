import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class DanceMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.action::DanceMessageParser'); }

    private _userId: number = 0;
    private _danceStyle: number = 0;

    constructor() {
    }

    public get userId(): number {
        return this._userId;
    }

    public get danceStyle(): number {
        return this._danceStyle;
    }

    public flush(): boolean {
        this._userId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._userId = param1.readInteger();
        this._danceStyle = param1.readInteger();
        return true;
    }
}

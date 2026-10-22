import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MuteAllInRoomParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::MuteAllInRoomParser'); }

    declare private _allMuted: boolean;
    static { (this.prototype as any)._allMuted = false; }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._allMuted = param1.readBoolean();
        return true;
    }

    public get allMuted(): boolean {
        return this._allMuted;
    }

    public flush(): boolean {
        return true;
    }
}

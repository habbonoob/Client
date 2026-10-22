import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NavigatorSettingsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::NavigatorSettingsMessageParser'); }

    declare private _homeRoomId: number;
    static { (this.prototype as any)._homeRoomId = 0; }

    declare private _roomIdToEnter: number;
    static { (this.prototype as any)._roomIdToEnter = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._homeRoomId = param1.readInteger();
        this._roomIdToEnter = param1.readInteger();
        return true;
    }

    public get homeRoomId(): number {
        return this._homeRoomId;
    }

    public get roomIdToEnter(): number {
        return this._roomIdToEnter;
    }
}

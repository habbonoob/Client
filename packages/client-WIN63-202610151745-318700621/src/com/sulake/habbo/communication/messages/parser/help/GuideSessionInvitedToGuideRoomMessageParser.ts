import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideSessionInvitedToGuideRoomMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideSessionInvitedToGuideRoomMessageParser'); }

    private _roomId: number = 0;
    private _roomName: string = "";

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        this._roomName = param1.readString();
        return true;
    }

    public getRoomId(): number {
        return this._roomId;
    }

    public getRoomName(): string {
        return this._roomName;
    }
}

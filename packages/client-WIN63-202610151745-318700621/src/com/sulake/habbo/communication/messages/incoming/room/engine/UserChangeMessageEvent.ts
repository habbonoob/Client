import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserChangeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UserChangeMessageParser';

export class UserChangeMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::UserChangeMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserChangeMessageParser);
    }

    public get id(): number {
        return (this._parser instanceof UserChangeMessageParser ? this._parser : null).id;
    }

    public get figure(): string {
        return (this._parser instanceof UserChangeMessageParser ? this._parser : null).figure;
    }

    public get sex(): string {
        return (this._parser instanceof UserChangeMessageParser ? this._parser : null).sex;
    }

    public get customInfo(): string {
        return (this._parser instanceof UserChangeMessageParser ? this._parser : null).customInfo;
    }

    public get achievementScore(): number {
        return (this._parser instanceof UserChangeMessageParser ? this._parser : null).achievementScore;
    }

    public get badgesRank(): number {
        return (this._parser instanceof UserChangeMessageParser ? this._parser : null).badgesRank;
    }
}

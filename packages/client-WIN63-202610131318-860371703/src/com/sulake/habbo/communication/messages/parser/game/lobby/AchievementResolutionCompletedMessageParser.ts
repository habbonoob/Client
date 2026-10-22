import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AchievementResolutionCompletedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.lobby::AchievementResolutionCompletedMessageParser'); }

    declare private _stuffCode: string;

    declare private _badgeCode: string;

    constructor() {
    }

    public flush(): boolean {
        this._stuffCode = "";
        this._badgeCode = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._stuffCode = param1.readString();
        this._badgeCode = param1.readString();
        return true;
    }

    public get stuffCode(): string {
        return this._stuffCode;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }
}

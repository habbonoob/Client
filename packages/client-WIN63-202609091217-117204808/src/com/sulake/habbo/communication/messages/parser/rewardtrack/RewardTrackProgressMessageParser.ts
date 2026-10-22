import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RewardTrackProgressMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::RewardTrackProgressMessageParser'); }

    declare private _SafeStr_14822: string;

    declare private _taskId: string;

    declare private _SafeStr_14373: number;
    static { (this.prototype as any)._SafeStr_14373 = 0; }

    declare private _SafeStr_5536: number;
    static { (this.prototype as any)._SafeStr_5536 = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14822 = null;
        this._taskId = null;
        this._SafeStr_14373 = 0;
        this._SafeStr_5536 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14822 = param1.readString();
        this._taskId = param1.readString();
        this._SafeStr_14373 = param1.readInteger();
        this._SafeStr_5536 = param1.readInteger();
        return true;
    }

    public get trackId(): string {
        return this._SafeStr_14822;
    }

    public get taskId(): string {
        return this._taskId;
    }

    public get progressCount(): number {
        return this._SafeStr_14373;
    }

    public get points(): number {
        return this._SafeStr_5536;
    }
}

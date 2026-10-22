import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ChatlineData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ChatlineData'); }

    declare private _timeStamp: string;

    declare private _SafeStr_7291: number;
    static { (this.prototype as any)._SafeStr_7291 = 0; }

    declare private _SafeStr_6584: string;

    declare private _msg: string;

    declare private _hasHighlighting: boolean;
    static { (this.prototype as any)._hasHighlighting = false; }

    constructor(param1: IMessageDataWrapper) {
        this._timeStamp = param1.readString();
        this._SafeStr_7291 = param1.readInteger();
        this._SafeStr_6584 = param1.readString();
        this._msg = param1.readString();
        this._hasHighlighting = param1.readBoolean();
    }

    public get timeStamp(): string {
        return this._timeStamp;
    }

    public get chatterId(): number {
        return this._SafeStr_7291;
    }

    public get chatterName(): string {
        return this._SafeStr_6584;
    }

    public get msg(): string {
        return this._msg;
    }

    public get hasHighlighting(): boolean {
        return this._hasHighlighting;
    }
}

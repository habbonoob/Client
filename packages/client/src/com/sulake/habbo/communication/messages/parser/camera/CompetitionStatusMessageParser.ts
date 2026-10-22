import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CompetitionStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.camera::CompetitionStatusMessageParser'); }

    constructor() {
    }

    private _SafeStr_4482: boolean = false;
    private _SafeStr_5388: string = null;

    public isOk(): boolean {
        return this._SafeStr_4482;
    }

    public getErrorReason(): string {
        return this._SafeStr_5388;
    }

    public flush(): boolean {
        this._SafeStr_4482 = false;
        this._SafeStr_5388 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_4482 = param1.readBoolean();
        this._SafeStr_5388 = param1.readString();
        return true;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ThumbnailStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.camera::ThumbnailStatusMessageParser'); }

    private _SafeStr_4482: boolean = true;
    private _SafeStr_4815: boolean = false;

    constructor() {
    }

    public isOk(): boolean {
        return this._SafeStr_4482;
    }

    public isRenderLimitHit(): boolean {
        return this._SafeStr_4815;
    }

    public flush(): boolean {
        this._SafeStr_4482 = true;
        this._SafeStr_4815 = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1.bytesAvailable) {
            this._SafeStr_4482 = param1.readBoolean();
            this._SafeStr_4815 = param1.readBoolean();
        }
        return true;
    }
}

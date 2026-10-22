import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CameraStorageUrlMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.camera::CameraStorageUrlMessageParser'); }

    declare private _SafeStr_2991: string;

    constructor() {
    }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public flush(): boolean {
        this._SafeStr_2991 = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_2991 = param1.readString();
        return true;
    }
}

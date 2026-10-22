import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CameraPublishStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.camera::CameraPublishStatusMessageParser'); }

    private _SafeStr_4482: boolean = false;
    private _SafeStr_5384: number = 0;

    declare private _SafeStr_4914: string;

    constructor() {
    }

    public isOk(): boolean {
        return this._SafeStr_4482;
    }

    public getSecondsToWait(): number {
        return this._SafeStr_5384;
    }

    public getExtraDataId(): string {
        return this._SafeStr_4914;
    }

    public flush(): boolean {
        this._SafeStr_4482 = false;
        this._SafeStr_5384 = 0;
        this._SafeStr_4914 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_4482 = param1.readBoolean();
        this._SafeStr_5384 = param1.readInteger();
        if (this._SafeStr_4482 && param1.bytesAvailable) {
            this._SafeStr_4914 = param1.readString();
        }
        return true;
    }
}

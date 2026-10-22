import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class InitCameraMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.camera::InitCameraMessageParser'); }

    private _creditPrice: number = 0;
    private _ducketPrice: number = 0;
    private _publishDucketPrice: number = 0;

    constructor() {
    }

    public getCreditPrice(): number {
        return this._creditPrice;
    }

    public getDucketPrice(): number {
        return this._ducketPrice;
    }

    public getPublishDucketPrice(): number {
        return this._publishDucketPrice;
    }

    public flush(): boolean {
        this._creditPrice = 0;
        this._ducketPrice = 0;
        this._publishDucketPrice = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._creditPrice = param1.readInteger();
        this._ducketPrice = param1.readInteger();
        if (param1.bytesAvailable > 0) {
            this._publishDucketPrice = param1.readInteger();
        }
        return true;
    }
}

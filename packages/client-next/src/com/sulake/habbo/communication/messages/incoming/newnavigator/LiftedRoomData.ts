import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class LiftedRoomData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::LiftedRoomData'); }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _SafeStr_6551: number;
    static { (this.prototype as any)._SafeStr_6551 = 0; }

    declare private _image: string;

    declare private _caption: string;

    constructor(param1: IMessageDataWrapper) {
        this._flatId = param1.readInteger();
        this._SafeStr_6551 = param1.readInteger();
        this._image = param1.readString();
        this._caption = param1.readString();
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get areaId(): number {
        return this._SafeStr_6551;
    }

    public get image(): string {
        return this._image;
    }

    public get caption(): string {
        return this._caption;
    }
}

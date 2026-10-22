import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class LiftedRoomData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::LiftedRoomData'); }

    constructor(param1: IMessageDataWrapper) {
        this._flatId = param1.readInteger();
        this._areaId = param1.readInteger();
        this._image = param1.readString();
        this._caption = param1.readString();
    }

    declare private _areaId: number;
    static { (this.prototype as any)._areaId = 0; }

    declare private _image: string;

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    public get flatId(): number {
        return this._flatId;
    }

    declare private _caption: string;

    public get caption(): string {
        return this._caption;
    }

    public get areaId(): number {
        return this._areaId;
    }

    public get image(): string {
        return this._image;
    }
}

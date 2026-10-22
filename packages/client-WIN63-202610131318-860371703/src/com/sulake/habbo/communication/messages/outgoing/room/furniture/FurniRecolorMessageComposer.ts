import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class FurniRecolorMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::FurniRecolorMessageComposer'); }

    declare private _data: any[];

    constructor(param1: number, param2: number, param3: number) {
        this._data = [param1, param2, param3 >> 16 & 0xFF, param3 >> 8 & 0xFF, param3 & 0xFF];
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
        this._data = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

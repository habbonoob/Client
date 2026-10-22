import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class UpdateFloorPropertiesMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.layout::UpdateFloorPropertiesMessageComposer'); }

    declare private _array: any[];

    constructor(param1: string, param2: number = -1, param3: number = -1, param4: number = -1, param5: number = -1, param6: number = -1, param7: number = -1) {
        if (param2 == -1 && param3 == -1 && param4 == -1 && param5 == -1 && param6 == -1) {
            this._array = [param1];
        } else if (param7 == -1) {
            this._array = [param1, param2, param3, param4, param5, param6];
        } else {
            this._array = [param1, param2, param3, param4, param5, param6, param7];
        }
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

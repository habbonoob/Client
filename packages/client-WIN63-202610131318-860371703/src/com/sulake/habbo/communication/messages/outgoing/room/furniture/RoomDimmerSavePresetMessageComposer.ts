import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RoomDimmerSavePresetMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::RoomDimmerSavePresetMessageComposer'); }

    declare private _presetNumber: number;
    static { (this.prototype as any)._presetNumber = 0; }

    declare private _effectTypeId: number;
    static { (this.prototype as any)._effectTypeId = 0; }

    declare private _SafeStr_7305: string;

    declare private _SafeStr_6315: number;
    static { (this.prototype as any)._SafeStr_6315 = 0; }

    declare private _SafeStr_7160: boolean;
    static { (this.prototype as any)._SafeStr_7160 = false; }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    constructor(param1: number, param2: number, param3: string, param4: number, param5: boolean, param6: number) {
        this._presetNumber = param1;
        this._effectTypeId = param2;
        this._SafeStr_7305 = param3;
        this._SafeStr_6315 = param4;
        this._SafeStr_7160 = param5;
        this._objectId = param6;
    }

    public getMessageArray(): any[] {
        return [this._presetNumber, this._effectTypeId, this._SafeStr_7305, this._SafeStr_6315, this._SafeStr_7160, false, this._objectId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}

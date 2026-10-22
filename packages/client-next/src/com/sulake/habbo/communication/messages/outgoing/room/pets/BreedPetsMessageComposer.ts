import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class BreedPetsMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.pets::BreedPetsMessageComposer'); }

    public static readonly _SafeStr_7947: number = 0;
    public static readonly _SafeStr_7573: number = 1;
    public static readonly _SafeStr_7459: number = 2;
    private _data: any[] = [];

    constructor(param1: number, param2: number, param3: number) {
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
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

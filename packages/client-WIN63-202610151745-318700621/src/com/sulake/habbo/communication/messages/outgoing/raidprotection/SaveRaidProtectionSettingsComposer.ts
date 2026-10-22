import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class SaveRaidProtectionSettingsComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.raidprotection::SaveRaidProtectionSettingsComposer'); }

    private _array: any[] = [];

    constructor(param1: number, param2: boolean, param3: number, param4: number, param5: number, param6: boolean, param7: number, param8: number, param9: boolean) {
        this._array.push(param1);
        this._array.push(param2);
        this._array.push(param3);
        this._array.push(param4);
        this._array.push(param5);
        this._array.push(param6);
        this._array.push(param7);
        this._array.push(param8);
        this._array.push(param9);
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    public get disposed(): boolean {
        return this._array == null;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}

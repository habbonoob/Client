import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class UpdateSelectorMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.userdefinedroomevents::UpdateSelectorMessageComposer'); }

    constructor(param1: number, param2: any[], param3: any[], param4: string, param5: any[], param6: any[], param7: boolean, param8: boolean, param9: any[], param10: any[]) {
        this._array.push(param1);
        this._array.push(param2.length);
        for (const _loc13_ of param2 ?? []) {
            this._array.push(_loc13_);
        }
        this._array.push(param4);
        this._array.push(param5.length);
        for (const _loc15_ of param5 ?? []) {
            this._array.push(_loc15_);
        }
        this._array.push(param7);
        this._array.push(param8);
        this._array.push(param9.length);
        for (const _loc11_ of param9 ?? []) {
            this._array.push(_loc11_);
        }
        this._array.push(param10.length);
        for (const _loc16_ of param10 ?? []) {
            this._array.push(_loc16_);
        }
        this._array.push(param3.length);
        for (const _loc12_ of param3 ?? []) {
            this._array.push(_loc12_);
        }
        this._array.push(param6.length);
        for (const _loc14_ of param6 ?? []) {
            this._array.push(_loc14_);
        }
    }

    private _array: any[] = [];

    public get disposed(): boolean {
        return false;
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

    get [IDisposable](): true {
        return true;
    }
}

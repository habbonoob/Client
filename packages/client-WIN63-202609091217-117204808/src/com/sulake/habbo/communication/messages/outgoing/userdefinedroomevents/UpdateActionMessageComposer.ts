import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class UpdateActionMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.userdefinedroomevents::UpdateActionMessageComposer'); }

    private _array: any[] = [];

    constructor(param1: number, param2: any[], param3: any[], param4: string, param5: any[], param6: any[], param7: number, param8: any[], param9: any[]) {
        this._array.push(param1);
        this._array.push(param2.length);
        for (const _loc12_ of param2 ?? []) {
            this._array.push(_loc12_);
        }
        this._array.push(param4);
        this._array.push(param5.length);
        for (const _loc14_ of param5 ?? []) {
            this._array.push(_loc14_);
        }
        this._array.push(param7);
        this._array.push(param8.length);
        for (const _loc10_ of param8 ?? []) {
            this._array.push(_loc10_);
        }
        this._array.push(param9.length);
        for (const _loc15_ of param9 ?? []) {
            this._array.push(_loc15_);
        }
        this._array.push(param3.length);
        for (const _loc11_ of param3 ?? []) {
            this._array.push(_loc11_);
        }
        this._array.push(param6.length);
        for (const _loc13_ of param6 ?? []) {
            this._array.push(_loc13_);
        }
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    public get disposed(): boolean {
        return false;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}

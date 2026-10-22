import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PerformanceLogMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.tracking::PerformanceLogMessageComposer'); }

    constructor(param1: number, param2: string, param3: string, param4: string, param5: string, param6: boolean, param7: number, param8: number, param9: number, param10: number, param11: number) {
        this._array = [param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11];
    }

    declare private _array: any[];

    public dispose(): void {
        this._array = null;
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

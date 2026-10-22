import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class GetMarketplaceItemStatsComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.marketplace::GetMarketplaceItemStatsComposer'); }

    public static readonly _SafeStr_8148: number = 1;
    public static readonly _SafeStr_8286: number = 2;
    public static readonly _SafeStr_14039: number = 3;
    private _array: any[] = [];

    constructor(param1: number, param2: number, param3: string = null) {
        this._array.push(param1);
        this._array.push(param2);
        if (param3 != null && param3.length > 0) {
            this._array.push(param3);
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

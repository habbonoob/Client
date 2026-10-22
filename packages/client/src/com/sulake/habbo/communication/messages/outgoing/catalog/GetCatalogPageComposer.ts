import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetCatalogPageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::GetCatalogPageComposer'); }

    constructor(param1: number, param2: number, param3: string) {
        this._data = [param1, param2, param3];
    }

    declare private _data: any[];

    public dispose(): void {
        this._data = null;
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

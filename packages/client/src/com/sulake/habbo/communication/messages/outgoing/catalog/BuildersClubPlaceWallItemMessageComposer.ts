import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class BuildersClubPlaceWallItemMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::BuildersClubPlaceWallItemMessageComposer'); }

    constructor(param1: number, param2: number, param3: string, param4: string, param5: boolean = false) {
        this._data = [param1, param2, param3, param4, param5];
    }

    private _data: any[] = [];

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

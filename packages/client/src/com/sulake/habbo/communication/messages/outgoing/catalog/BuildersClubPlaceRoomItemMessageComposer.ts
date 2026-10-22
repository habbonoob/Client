import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class BuildersClubPlaceRoomItemMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::BuildersClubPlaceRoomItemMessageComposer'); }

    constructor(param1: number, param2: number, param3: string, param4: number, param5: number, param6: number, param7: boolean = false) {
        this._data = [param1, param2, param3, param4, param5, param6, param7];
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

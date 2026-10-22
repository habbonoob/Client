import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetObjectDataMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::SetObjectDataMessageComposer'); }

    private _data: any[] = [];

    constructor(param1: number, param2: UtilsMap) {
        this._data.push(param1);
        this._data.push(param2.length * 2);
        for (const _loc3_ of param2.getKeys() ?? []) {
            this._data.push(_loc3_);
            this._data.push(param2.getValue(_loc3_));
        }
    }

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

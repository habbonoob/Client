import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetHabboGroupDetailsMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::GetHabboGroupDetailsMessageComposer'); }

    private _data: any[] = [];

    constructor(param1: number, param2: boolean) {
        this._data.push(param1);
        this._data.push(param2);
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

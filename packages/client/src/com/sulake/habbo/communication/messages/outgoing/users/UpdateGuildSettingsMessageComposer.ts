import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class UpdateGuildSettingsMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::UpdateGuildSettingsMessageComposer'); }

    constructor(param1: number, param2: number, param3: number) {
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
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

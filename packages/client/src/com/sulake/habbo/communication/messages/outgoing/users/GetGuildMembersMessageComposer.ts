import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetGuildMembersMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::GetGuildMembersMessageComposer'); }

    public static readonly _SafeStr_7868: number = 0;
    public static readonly _SafeStr_7678: number = 1;
    public static readonly _SafeStr_8733: number = 2;

    constructor(param1: number, param2: number, param3: string, param4: number) {
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
        this._data.push(param4);
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

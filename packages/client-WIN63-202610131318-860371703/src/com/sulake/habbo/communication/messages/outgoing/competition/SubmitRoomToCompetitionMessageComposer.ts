import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SubmitRoomToCompetitionMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.competition::SubmitRoomToCompetitionMessageComposer'); }

    public static readonly _SafeStr_8343: number = 0;
    public static readonly _SafeStr_8555: number = 1;
    public static readonly _SafeStr_8235: number = 2;
    public static readonly _SafeStr_7611: number = 3;
    private _data: any[] = [];

    constructor(param1: string, param2: number) {
        this._data.push(param1);
        this._data.push(param2);
    }

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

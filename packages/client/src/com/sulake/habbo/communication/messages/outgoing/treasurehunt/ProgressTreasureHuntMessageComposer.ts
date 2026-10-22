import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ProgressTreasureHuntMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.treasurehunt::ProgressTreasureHuntMessageComposer'); }

    constructor(param1: string, param2: string) {
        this._huntId = param1;
        this._SafeStr_5964 = param2;
    }

    declare private _huntId: string;

    declare private _SafeStr_5964: string;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._huntId, this._SafeStr_5964];
    }

    get [IMessageComposer](): true {
        return true;
    }
}

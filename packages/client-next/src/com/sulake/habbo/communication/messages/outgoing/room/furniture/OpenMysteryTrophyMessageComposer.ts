import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class OpenMysteryTrophyMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::OpenMysteryTrophyMessageComposer'); }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _SafeStr_6172: string;

    constructor(param1: number, param2: string) {
        this._objectId = param1;
        this._SafeStr_6172 = param2;
    }

    public getMessageArray(): any[] {
        return [this._objectId, this._SafeStr_6172];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}

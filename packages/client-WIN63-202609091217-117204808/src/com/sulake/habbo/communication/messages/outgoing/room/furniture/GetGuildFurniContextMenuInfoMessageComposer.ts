import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetGuildFurniContextMenuInfoMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::GetGuildFurniContextMenuInfoMessageComposer'); }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _guildId: number;
    static { (this.prototype as any)._guildId = 0; }

    constructor(param1: number, param2: number) {
        this._objectId = param1;
        this._guildId = param2;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._objectId, this._guildId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ClickFurniMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::ClickFurniMessageComposer'); }

    constructor(param1: number, param2: number = 0) {
        this._objectId = param1;
        this._type = param2;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    private _type: number = 0;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._objectId, this._type];
    }

    get [IMessageComposer](): true {
        return true;
    }
}

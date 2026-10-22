import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetMannequinFigureComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::SetMannequinFigureComposer'); }

    constructor(param1: number) {
        this._furniId = param1;
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    public getMessageArray(): any[] {
        return [this._furniId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}

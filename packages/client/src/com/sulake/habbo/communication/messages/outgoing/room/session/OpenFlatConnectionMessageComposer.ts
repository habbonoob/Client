import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class OpenFlatConnectionMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.session::OpenFlatConnectionMessageComposer'); }

    constructor(param1: number, param2: string = "", param3: number = -1) {
        this._message = [param1, param2, param3];
    }

    declare private _message: any[];

    public dispose(): void {
        this._message = null;
    }

    public getMessageArray(): any[] {
        return this._message;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

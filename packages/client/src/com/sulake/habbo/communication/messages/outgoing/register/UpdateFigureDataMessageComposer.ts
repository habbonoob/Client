import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class UpdateFigureDataMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.register::UpdateFigureDataMessageComposer'); }

    constructor(param1: string, param2: string) {
        this._data.push(param2);
        this._data.push(param1);
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

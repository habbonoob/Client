import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetBadgeInfoComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.badges::GetBadgeInfoComposer'); }

    declare private _data: any[];

    constructor(param1: string) {
        this._data = [param1];
    }

    public dispose(): void {
        this._data = null;
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

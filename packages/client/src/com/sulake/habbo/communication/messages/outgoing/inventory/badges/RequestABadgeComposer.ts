import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RequestABadgeComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.badges::RequestABadgeComposer'); }

    constructor(param1: string) {
        this._requestCode = param1;
    }

    declare private _requestCode: string;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._requestCode);
        return _loc1_;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

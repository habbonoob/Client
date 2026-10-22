import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class NavigatorDeleteSavedSearchComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.newnavigator::NavigatorDeleteSavedSearchComposer'); }

    constructor(param1: number) {
        this._SafeStr_3934.push(param1);
    }

    private _SafeStr_3934: any[] = [];

    public getMessageArray(): any[] {
        return this._SafeStr_3934;
    }

    public dispose(): void {
        this._SafeStr_3934 = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}

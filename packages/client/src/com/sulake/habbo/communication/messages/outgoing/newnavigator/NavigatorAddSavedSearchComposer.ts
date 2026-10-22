import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class NavigatorAddSavedSearchComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.newnavigator::NavigatorAddSavedSearchComposer'); }

    constructor(param1: string, param2: string) {
        this._SafeStr_3934.push(param1);
        this._SafeStr_3934.push(param2);
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

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class NavigatorRemoveCollapsedCategoryMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.newnavigator::NavigatorRemoveCollapsedCategoryMessageComposer'); }

    private _SafeStr_3934: any[] = [];

    constructor(param1: string) {
        this._SafeStr_3934.push(param1);
    }

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

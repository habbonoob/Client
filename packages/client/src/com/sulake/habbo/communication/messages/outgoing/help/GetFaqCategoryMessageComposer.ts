import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetFaqCategoryMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.help::GetFaqCategoryMessageComposer'); }

    constructor(param1: number) {
        this._categoryId = param1;
    }

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    public getMessageArray(): any[] {
        return [this._categoryId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}

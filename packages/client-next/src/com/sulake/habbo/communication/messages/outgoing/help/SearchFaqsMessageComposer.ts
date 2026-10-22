import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SearchFaqsMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.help::SearchFaqsMessageComposer'); }

    declare private _searchString: string;

    constructor(param1: string) {
        this._searchString = param1;
    }

    public getMessageArray(): any[] {
        return [this._searchString];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}

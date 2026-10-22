import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { ISearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/ISearchResultData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PopularTagData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PopularTagData';

export class PopularRoomTagsData implements IDisposable, ISearchResultData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::PopularRoomTagsData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._tags = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._tags.push(new PopularTagData(param1));
            _loc3_++;
        }
    }

    declare private _tags: any[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get tags(): any[] {
        return this._tags;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._tags = null;
    }

    get [IDisposable](): true {
        return true;
    }
}

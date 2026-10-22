import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { ISearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/ISearchResultData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PromotedRoomCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PromotedRoomCategoryData';

export class PromotedRoomsData implements IDisposable, ISearchResultData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::PromotedRoomsData'); }

    declare private _entries: any[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._entries = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._entries.push(new PromotedRoomCategoryData(param1));
            _loc3_++;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._entries != null) {
            for (const _loc1_ of this._entries ?? []) {
                _loc1_.dispose();
            }
        }
        this._entries = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get entries(): any[] {
        return this._entries;
    }

    get [IDisposable](): true {
        return true;
    }
}

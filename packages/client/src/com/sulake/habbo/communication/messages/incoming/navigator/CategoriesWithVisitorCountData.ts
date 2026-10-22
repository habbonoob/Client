import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { ISearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/ISearchResultData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class CategoriesWithVisitorCountData implements IDisposable, ISearchResultData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::CategoriesWithVisitorCountData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        this._categoryToCurrentUserCountMap = new UtilsMap();
        this._categoryToMaxUserCountMap = new UtilsMap();
        let _loc4_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc6_ = param1.readInteger();
            _loc3_ = param1.readInteger();
            _loc2_ = param1.readInteger();
            this._categoryToCurrentUserCountMap.add(_loc6_, _loc3_);
            this._categoryToMaxUserCountMap.add(_loc6_, _loc2_);
            _loc5_++;
        }
    }

    declare private _categoryToCurrentUserCountMap: UtilsMap;

    declare private _categoryToMaxUserCountMap: UtilsMap;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get categoryToCurrentUserCountMap(): UtilsMap {
        return this._categoryToCurrentUserCountMap;
    }

    public get categoryToMaxUserCountMap(): UtilsMap {
        return this._categoryToMaxUserCountMap;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._categoryToCurrentUserCountMap = null;
        this._categoryToMaxUserCountMap = null;
    }

    get [IDisposable](): true {
        return true;
    }
}

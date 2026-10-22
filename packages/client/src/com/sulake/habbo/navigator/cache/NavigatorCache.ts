import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SearchResultContainer } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultContainer';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { NavigatorCacheEntry } from '@/com/sulake/habbo/navigator/cache/NavigatorCacheEntry';

export class NavigatorCache {
    static { registerClassName(this, 'com.sulake.habbo.navigator.cache::NavigatorCache'); }

    private static readonly EXPIRATION_TIME: number = 4000;

    constructor() {
        this._entriesByKey = new Dictionary();
    }

    declare private _entriesByKey: Map<any, any>;

    public put(param1: string, param2: SearchResultContainer): void {
        this.removeExpiredEntries();
        let _loc3_: number = getTimer();
        this._entriesByKey.set(param1, new NavigatorCacheEntry(param1, param2, _loc3_, this.expiresAt(_loc3_)));
    }

    public getEntry(param1: string): SearchResultContainer {
        let _loc2_: NavigatorCacheEntry = this._entriesByKey.get(param1);
        if (_loc2_ != null) {
            if (_loc2_.hasExpired(getTimer())) {
                this._entriesByKey.delete(param1);
                return null;
            }
            return _loc2_.payload;
        }
        return null;
    }

    public removeEntry(param1: string): void {
        this._entriesByKey.delete(param1);
    }

    private removeExpiredEntries(): void {
        let _loc3_: string = null;
        let _loc2_: NavigatorCacheEntry = null;
        for (const _loc1_ of this._entriesByKey?.keys() ?? []) {
            _loc3_ = String(_loc1_);
            _loc2_ = this._entriesByKey.get(_loc3_);
            if (_loc2_ == null || _loc2_.hasExpired(getTimer())) {
                this._entriesByKey.delete(_loc3_);
            }
        }
    }

    private expiresAt(param1: number): number {
        return param1 + 4000;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SearchResultContainer } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultContainer';

export class NavigatorCacheEntry {
    static { registerClassName(this, 'com.sulake.habbo.navigator.cache::NavigatorCacheEntry'); }

    declare private _key: string;

    declare private _SafeStr_7011: SearchResultContainer;

    declare private _createdAt: number;
    static { (this.prototype as any)._createdAt = NaN; }

    declare private _SafeStr_7280: number;
    static { (this.prototype as any)._SafeStr_7280 = NaN; }

    constructor(param1: string, param2: SearchResultContainer, param3: number, param4: number) {
        this._key = param1;
        this._SafeStr_7011 = param2;
        this._createdAt = param3;
        this._SafeStr_7280 = param4;
    }

    public hasExpired(param1: number): boolean {
        return param1 >= this._SafeStr_7280;
    }

    public get key(): string {
        return this._key;
    }

    public get payload(): SearchResultContainer {
        return this._SafeStr_7011;
    }
}

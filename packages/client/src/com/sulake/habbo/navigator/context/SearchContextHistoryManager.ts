import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SearchContext } from '@/com/sulake/habbo/navigator/context/SearchContext';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';

export class SearchContextHistoryManager {
    static { registerClassName(this, 'com.sulake.habbo.navigator.context::SearchContextHistoryManager'); }

    constructor(param1: HabboNewNavigator) {
    }

    private _SafeStr_2738: SearchContext[] = new Array<SearchContext>(0).fill(null);
    private _browsingOffset: number = -1;

    public get hasNext(): boolean {
        return this._browsingOffset + 1 < this._SafeStr_2738.length;
    }

    public get hasPrevious(): boolean {
        return this._browsingOffset > 0 && this._SafeStr_2738.length > 0;
    }

    public addSearchContextAtCurrentOffset(param1: SearchContext): number {
        if (this._SafeStr_2738.length > this._browsingOffset + 1) {
            this._SafeStr_2738.splice(this._browsingOffset + 1, this._SafeStr_2738.length - this._browsingOffset);
        }
        this._SafeStr_2738.push(param1);
        return ++this._browsingOffset;
    }

    public getPreviousSearchContextAndGoBack(): SearchContext {
        if (this.hasPrevious) {
            return this._SafeStr_2738[--this._browsingOffset];
        }
        return null;
    }

    public getNextSearchContextAndMoveForward(): SearchContext {
        if (this.hasNext) {
            return this._SafeStr_2738[++this._browsingOffset];
        }
        return null;
    }

    public toString(): string {
        let _loc1_: number = 0;
        let _loc2_: string = "history: [";
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_2738.length) {
            _loc2_ += this._SafeStr_2738[_loc1_].toString();
            if (_loc1_ < this._SafeStr_2738.length - 1) {
                _loc2_ = _loc2_ += ",";
            }
            _loc1_++;
        }
        return _loc2_ + "] browsing offset: " + this._browsingOffset;
    }
}

import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class SearchFilterEnum {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view.search::SearchFilterEnum'); }

    public static readonly DEFAULT: number = 0;
    public static readonly OWNER: number = 1;
    public static readonly ROOMNAME: number = 2;
    public static readonly TAG: number = 3;
    public static readonly GROUP: number = 4;
    public static readonly ANYTHING: number = 5;
    public static readonly FILTER_PREFIX: any[] = ["", "owner:", "roomname:", "tag:", "group:", ""];

    constructor() {
    }

    public static filterInInput(param1: string): number {
        let _loc2_: number = 0;
        _loc2_ = 1;
        while (_loc2_ < SearchFilterEnum.FILTER_PREFIX.length) {
            if (param1.indexOf(stringOrNull(SearchFilterEnum.FILTER_PREFIX[_loc2_])) == 0) {
                return _loc2_;
            }
            _loc2_++;
        }
        return 0;
    }
}

import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CommandConfiguration {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::CommandConfiguration'); }

    declare private _SafeStr_6224: any[];

    declare private _SafeStr_4496: Map<any, any>;

    constructor(param1: any[], param2: any[]) {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        this._SafeStr_4496 = new Dictionary();
        this._SafeStr_6224 = param1;
        while (_loc3_ < param2.length) {
            _loc4_ = param2[_loc3_] | 0;
            this._SafeStr_4496.set(_loc4_, true);
            _loc3_++;
        }
    }

    public get allCommandIds(): any[] {
        return this._SafeStr_6224;
    }

    public isEnabled(param1: number): boolean {
        return this._SafeStr_4496.get(param1) != null;
    }
}

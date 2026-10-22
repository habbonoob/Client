import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableLeaderboardDisplayNameFormatter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.leaderboard::VariableLeaderboardDisplayNameFormatter'); }

    constructor() {
    }

    public static suggest(param1: string): string {
        let _loc6_: string = null;
        if (param1 == null || param1.length == 0) {
            return "Variable";
        }
        let _loc2_: string = param1.replace(/[_\-]+/g, " ");
        let _loc5_: any[] = _loc2_.split(/\s+/);
        let _loc4_: any[] = [];
        for (const _loc3_ of _loc5_ ?? []) {
            if (_loc3_.length != 0) {
                _loc6_ = stringOrNull(_loc3_.toLowerCase());
                _loc4_.push(_loc6_.charAt(0).toUpperCase() + _loc6_.substr(1));
            }
        }
        return _loc4_.length == 0 ? "Variable" : _loc4_.join(" ");
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';

export class RemainingTimeFormatter {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers.util::RemainingTimeFormatter'); }

    constructor() {
    }

    public static getStringFromSeconds(param1: IHabboLocalizationManager, param2: number): string {
        let _loc3_: number = Math.floor(param2 / 60 / 60) | 0;
        if (_loc3_ > 24) {
            return FriendlyTime.getFriendlyTime(param1, param2, "", 1);
        }
        if (_loc3_ > 0) {
            return FriendlyTime.getLocalization(param1, "friendlytime.hours.short", _loc3_);
        }
        return RemainingTimeFormatter.convertSecondsToTime(param2 | 0);
    }

    public static convertSecondsToTime(param1: number): string {
        let _loc2_: number = Math.floor(param1 / 60 / 60) | 0;
        let _loc4_: number = Math.floor((param1 - _loc2_ * 60 * 60) / 60) | 0;
        let _loc3_: number = param1 - _loc2_ * 60 * 60 - _loc4_ * 60;
        let _loc5_: string = "";
        if (_loc2_ > 0) {
            _loc5_ = _loc2_ + ":";
        }
        _loc5_ = _loc4_ < 10 ? _loc5_ + "0" + _loc4_ : _loc5_ + _loc4_;
        if (_loc2_ == 0) {
            _loc5_ += ":";
            _loc5_ = _loc3_ < 10 ? _loc5_ + "0" + _loc3_ : _loc5_ + _loc3_;
        }
        return _loc5_;
    }
}

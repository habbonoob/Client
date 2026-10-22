import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class BadgeResolver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.clubcenter.util::BadgeResolver'); }

    public static readonly DEFAULT_BADGE: string = "HC1";
    public static readonly CLUB_BADGES: any[] = ["ACH_VipHC1", "ACH_VipHC2", "ACH_VipHC3", "ACH_VipHC4", "ACH_VipHC5", "HC1", "HC2", "HC3", "HC4", "HC5"];

    public static resolveClubBadgeId(param1: any[]): string {
        let _loc3_: any = null;
        for (const _loc2_ of BadgeResolver.CLUB_BADGES ?? []) {
            if (param1.indexOf(_loc2_) > -1) {
                _loc3_ = _loc2_;
            }
        }
        return stringOrNull(_loc3_);
    }

    public static resolveBadgeBitmap(param1: string, param2: (...args: any[]) => any, param3: ISessionDataManager): BitmapData {
        if (param1 == null) {
            return null;
        }
        let _loc4_: BitmapData = param3.requestBadgeImage(param1);
        if (_loc4_ == null) {
            param3.events.addEventListener("BIRE_BADGE_IMAGE_READY", param2);
        }
        return _loc4_;
    }

    constructor() {
    }
}

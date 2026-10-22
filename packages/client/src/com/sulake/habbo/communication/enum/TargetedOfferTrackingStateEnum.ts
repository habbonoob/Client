import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TargetedOfferTrackingStateEnum {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::TargetedOfferTrackingStateEnum'); }

    public static readonly _SafeStr_8167: number = 1;
    public static readonly REJECTED: number = 2;
    public static readonly _SafeStr_8682: number = 3;
    public static readonly _SafeStr_7572: number = 4;
    public static readonly _SafeStr_7530: number = 5;
    public static readonly PREVIEWED: number = 6;
}

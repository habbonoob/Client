import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarAction {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarAction'); }

    public static readonly SIGN: string = "sign";
    public static readonly SLEEP: string = "Sleep";
    public static readonly CARRY_OBJECT: string = "cri";
    public static readonly USE_OBJECT: string = "usei";
    public static readonly _SafeStr_7546: string = "fx";
    public static readonly TALK: string = "talk";
    public static readonly GESTURE: string = "gest";
    public static readonly _SafeStr_7847: string = "expression";
    public static readonly _SafeStr_7996: string = "vote";
    public static readonly _SafeStr_7408: string = "dance";
    public static readonly TYPING: string = "typing";
    public static readonly MUTED: string = "muted";
    public static readonly PLAYING_GAME: string = "playing_game";
    public static readonly GUIDE_STATUS: string = "guide";
    public static readonly _SafeStr_7815: string = "respect";
    public static readonly EXPRESSION_JUMP: string = "dance";
    public static readonly EXPRESSION_WAVE: string = "wave";
    public static readonly EXPRESSION_BLOW_A_KISS: string = "blow";
    public static readonly EXPRESSION_67: string = "67";
    public static readonly EXPRESSION_LAUGH: string = "laugh";
    public static readonly _SafeStr_8032: string = "cry";
    public static readonly _SafeStr_8328: string = "idle";
    public static readonly EXPRESSION_SNOWBOARD_OLLIE: string = "sbollie";
    public static readonly EXPRESSION_SNOWBORD_360: string = "sb360";
    public static readonly EXPRESSION_RIDE_JUMP: string = "ridejump";
    public static readonly GESTURE_SMILE: string = "sml";
    public static readonly GESTURE_AGGRAVATED: string = "agr";
    public static readonly GESTURE_SURPRISED: string = "srp";
    public static readonly GESTURE_SAD: string = "sad";
    public static readonly PET_GESTURE_JOY: string = "joy";
    public static readonly PET_GESTURE_CRAZY: string = "crz";
    public static readonly PET_GESTURE_TONGUE: string = "tng";
    public static readonly PET_GESTURE_BLINK: string = "eyb";
    public static readonly PET_GESTURE_MISERABLE: string = "mis";
    public static readonly PET_GESTURE_PUZZLED: string = "puz";
    public static readonly POSTURE: string = "posture";
    public static readonly POSTURE_STAND: string = "std";
    public static readonly POSTURE_SIT: string = "sit";
    public static readonly POSTURE_WALK: string = "mv";
    public static readonly POSTURE_LAY: string = "lay";
    public static readonly POSTURE_SWIM: string = "swim";
    public static readonly POSTURE_FLOAT: string = "float";
    public static readonly POSTURE_SNOWWAR_RUN: string = "swrun";
    public static readonly POSTURE_SNOWWAR_DIE_FRONT: string = "swdiefront";
    public static readonly POSTURE_SNOWWAR_DIE_BACK: string = "swdieback";
    public static readonly POSTURE_SNOWWAR_PICK: string = "swpick";
    public static readonly POSTURE_SNOWWAR_THROW: string = "swthrow";
    private static readonly GESTURE_MAP: any[] = ["", "sml", "agr", "srp", "sad", "joy", "crz", "tng", "eyb", "mis", "puz"];
    private static readonly _SafeStr_5416: any[] = ["", "wave", "blow", "laugh", "cry", "idle", "dance", "respect", "sbollie", "sb360", "ridejump"];

    constructor() {
    }

    public static getExpressionTime(param1: number): number {
        switch (param1) {
            case 1:
                return 5000;
            case 2:
                return 1400;
            case 67:
                return 990;
            case 3:
                return 2000;
            case 4:
                return 2000;
            case 5:
                return 0;
            case 6:
                return 700;
            case 7:
                return 2000;
            case 8:
                return 1500;
            case 9:
                return 1500;
            case 10:
                return 1500;
            default:
                return 0;
        }
    }

    public static getExpressionId(param1: string): number {
        if (param1 == "67") {
            return 67;
        }
        return AvatarAction._SafeStr_5416.indexOf(param1);
    }

    public static getExpression(param1: number): string {
        if (param1 == 67) {
            return "67";
        }
        if (param1 < AvatarAction._SafeStr_5416.length) {
            return stringOrNull(AvatarAction._SafeStr_5416[param1]);
        }
        return "";
    }

    public static getGestureId(param1: string): number {
        return AvatarAction.GESTURE_MAP.indexOf(param1);
    }

    public static getGesture(param1: number): string {
        if (param1 < AvatarAction.GESTURE_MAP.length) {
            return stringOrNull(AvatarAction.GESTURE_MAP[param1]);
        }
        return "";
    }
}

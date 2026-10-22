import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BalloonArrowPivot {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::BalloonArrowPivot'); }

    public static readonly _SafeStr_8275: string = "up, left";
    public static readonly UP_CENTER: string = "up, center";
    public static readonly UP_RIGHT: string = "up, right";
    public static readonly DOWN_LEFT: string = "down, left";
    public static readonly DOWN_CENTER: string = "down, center";
    public static readonly DOWN_RIGHT: string = "down, right";
    public static readonly _SafeStr_7767: string = "left, top";
    public static readonly _SafeStr_8677: string = "left, middle";
    public static readonly LEFT_BOTTOM: string = "left, bottom";
    public static readonly _SafeStr_7859: string = "right, top";
    public static readonly _SafeStr_8656: string = "right, middle";
    public static readonly RIGHT_BOTTOM: string = "right, bottom";
    public static readonly _SafeStr_7416: string = "up";
    public static readonly DOWN: string = "down";
    public static readonly _SafeStr_6016: string = "left";
    public static readonly RIGHT: string = "right";
    public static readonly _SafeStr_8643: string = "minimum";
    public static readonly _SafeStr_8019: string = "middle";
    public static readonly MAXIMUM: string = "maximum";
    public static readonly ALL: any[] = ["up, left", "up, center", "up, right", "down, left", "down, center", "down, right", "left, top", "left, middle", "left, bottom", "right, top", "right, middle", "right, bottom"];

    constructor() {
    }

    public static directionFromPivot(param1: string): string {
        return param1.substr(0, param1.indexOf(","));
    }

    public static positionFromPivot(param1: string): string {
        switch (param1) {
            case "up, left":
            case "down, left":
            case "left, top":
            case "right, top":
                break;
            case "up, right":
            case "down, right":
            case "left, bottom":
            case "right, bottom":
                return "maximum";
            default:
                return "middle";
        }
        return "minimum";
    }
}

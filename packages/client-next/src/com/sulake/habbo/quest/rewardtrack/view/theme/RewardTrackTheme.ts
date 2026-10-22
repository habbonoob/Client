import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class RewardTrackTheme {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.theme::RewardTrackTheme'); }

    private static readonly BLUE: string = "blue";
    private static readonly ORANGE: string = "orange";
    private static readonly FOREST_GREEN: string = "forest_green";
    private static readonly RED: string = "red";
    private static readonly CYAN: string = "cyan";
    private static readonly RECOLORABLE_LIGHT: string = "RECOLORABLE_LIGHT";
    private static readonly RECOLORABLE_MEDIUM: string = "RECOLORABLE_MEDIUM";
    private static readonly RECOLORABLE_DARK: string = "RECOLORABLE_DARK";

    declare private _key: string;

    declare private _darkColor: number;
    static { (this.prototype as any)._darkColor = 0; }

    declare private _mediumColor: number;
    static { (this.prototype as any)._mediumColor = 0; }

    declare private _lightColor: number;
    static { (this.prototype as any)._lightColor = 0; }

    declare private _activeColor: number;
    static { (this.prototype as any)._activeColor = 0; }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: number) {
        this._key = param1;
        this._darkColor = param2;
        this._mediumColor = param3;
        this._lightColor = param4;
        this._activeColor = param5;
    }

    public static resolve(param1: string): RewardTrackTheme {
        switch (param1) {
            case "orange":
                return new RewardTrackTheme("orange", 13203736, 16768946, 16773078, 16764817);
            case "forest_green":
                return new RewardTrackTheme("forest_green", 4164165, 13494987, 14808031, 12115894);
            case "red":
                return new RewardTrackTheme("red", 12077899, 15846604, 16309725, 15186104);
            case "cyan":
                return new RewardTrackTheme("cyan", 2072243, 13103093, 14481403, 11921905);
            default:
                return new RewardTrackTheme("blue", 3503801, 13624057, 14543865, 12441327);
        }
    }

    public applyTo(param1: IWindow): void {
        let _loc2_: IWindowContainer = null;
        let _loc3_: number = 0;
        this.applyColor(param1);
        if (isIWindowContainer(param1)) {
            _loc2_ = isIWindowContainer(param1) ? param1 : null;
            _loc3_ = 0;
            while (_loc3_ < _loc2_.numChildren) {
                this.applyTo(_loc2_.getChildAt(_loc3_));
                _loc3_ += 1;
            }
        }
    }

    private applyColor(param1: IWindow): void {
        if (param1.tags.indexOf("RECOLORABLE_LIGHT") >= 0) {
            param1.color = this._lightColor;
        } else if (param1.tags.indexOf("RECOLORABLE_MEDIUM") >= 0) {
            param1.color = this._mediumColor;
        } else if (param1.tags.indexOf("RECOLORABLE_DARK") >= 0) {
            param1.color = this._darkColor;
        }
    }

    public get key(): string {
        return this._key;
    }

    public get darkColor(): number {
        return this._darkColor;
    }

    public get lightColor(): number {
        return this._lightColor;
    }

    public get activeColor(): number {
        return this._activeColor;
    }
}

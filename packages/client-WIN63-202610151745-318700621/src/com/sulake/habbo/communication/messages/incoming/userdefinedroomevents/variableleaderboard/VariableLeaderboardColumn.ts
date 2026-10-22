import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableLeaderboardColumn {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.variableleaderboard::VariableLeaderboardColumn'); }

    public static readonly _SafeStr_14030: number = 0;
    public static readonly _SafeStr_14031: number = 1;
    public static readonly _SafeStr_14032: number = 2;
    public static readonly _SafeStr_14033: number = 3;
    private static readonly _SafeStr_14034: number = 70;
    private static readonly _SafeStr_14035: number = 90;
    private static readonly _SafeStr_14036: number = 120;
    private static readonly _SafeStr_14037: number = 170;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _SafeStr_14038: string;

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    constructor(param1: number, param2: string, param3: number) {
        this._type = param1;
        this._SafeStr_14038 = param2;
        this._width = param3;
    }

    public static isValidWidth(param1: number): boolean {
        return param1 == 0 || param1 == 1 || param1 == 2 || param1 == 3;
    }

    public static defaultWidth(param1: number): number {
        switch (param1) {
            case 0:
                return 3;
            case 2:
            case 3:
                return 1;
            case 5:
                return 2;
            default:
                return 0;
        }
    }

    public get type(): number {
        return this._type;
    }

    public get label(): string {
        return this._SafeStr_14038;
    }

    public get width(): number {
        return this._width;
    }

    public get pixelWidth(): number {
        switch (this._width) {
            case 1:
                return 90;
            case 2:
                return 120;
            case 3:
                return 170;
            default:
                return 70;
        }
    }
}

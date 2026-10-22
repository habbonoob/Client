import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BadgeBaseAndLevel {
    static { registerClassName(this, 'com.sulake.habbo.localization::BadgeBaseAndLevel'); }

    private static readonly CHAR_CODE_ZERO: number = 48;
    private static readonly CHAR_CODE_NINE: number = 57;
    private _base: string = "";
    private _level: number = 1;

    constructor(badgeId: string) {
        let baseEnd: number = badgeId.length - 1;
        while (baseEnd > 0 && this.isNumber(badgeId.charAt(baseEnd))) {
            baseEnd--;
        }
        this._base = badgeId.substring(0, baseEnd + 1);
        let levelPart: string = badgeId.substring(baseEnd + 1, badgeId.length);
        if (levelPart != null && levelPart != "") {
            this._level = Number(levelPart) | 0;
        }
    }

    public get base(): string {
        return this._base;
    }

    public get level(): number {
        return this._level;
    }

    public set level(value: number) {
        this._level = Math.max(1, value) | 0;
    }

    public get badgeId(): string {
        return this._base + this._level;
    }

    private isNumber(character: string): boolean {
        let charCode: number = character.charCodeAt(0) | 0;
        return charCode >= BadgeBaseAndLevel.CHAR_CODE_ZERO && charCode <= BadgeBaseAndLevel.CHAR_CODE_NINE;
    }
}

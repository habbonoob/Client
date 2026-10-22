import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BadgeBaseAndLevel {
    static { registerClassName(this, 'com.sulake.habbo.localization::BadgeBaseAndLevel'); }

    private _base: string = "";
    private _level: number = 1;

    constructor(param1: string) {
        let _loc2_: number = param1.length - 1;
        while (_loc2_ > 0 && this.isNumber(param1.charAt(_loc2_))) {
            _loc2_--;
        }
        this._base = param1.substring(0, _loc2_ + 1);
        let _loc3_: string = param1.substring(_loc2_ + 1, param1.length);
        if (_loc3_ != null && _loc3_ != "") {
            this._level = Number(_loc3_) | 0;
        }
    }

    private isNumber(param1: string): boolean {
        let _loc2_: number = param1.charCodeAt(0) | 0;
        return _loc2_ >= 48 && _loc2_ <= 57;
    }

    public get base(): string {
        return this._base;
    }

    public get level(): number {
        return this._level;
    }

    public set level(param1: number) {
        this._level = Math.max(1, param1) | 0;
    }

    public get badgeId(): string {
        return this._base + this._level;
    }
}

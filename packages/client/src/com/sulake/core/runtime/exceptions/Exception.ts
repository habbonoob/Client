import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Exception extends Error {
    static { registerClassName(this, 'com.sulake.core.runtime.exceptions::Exception'); }

    public static getChainedStackTrace(param1: Error): string {
        let _loc3_: string = null;
        let _loc2_: any = null;
        while (param1 != null) {
            _loc3_ = param1.stack;
            if (_loc3_ != null) {
                if (_loc2_ == null) {
                    _loc2_ = _loc3_;
                } else {
                    _loc2_ += "\ncaused by ";
                    _loc2_ += _loc3_;
                }
            }
            if (param1 instanceof Exception) {
                param1 = (param1 instanceof Exception ? param1 : null).cause;
            } else {
                param1 = null;
            }
        }
        return stringOrNull(_loc2_);
    }

    constructor(param1: string, param2: number = 0, param3: Error = null) {
        super(param1); this.errorID = param2;
        this._cause = param3;
    }

    declare private _cause: Error;

    public get cause(): Error {
        return this._cause;
    }

    public toString(): string {
        let _loc1_: string = getQualifiedClassName(this) + ": " + this.message;
        if (this._cause != null) {
            _loc1_ += ", caused by ";
            _loc1_ += this._cause.toString();
        }
        return _loc1_;
    }
}

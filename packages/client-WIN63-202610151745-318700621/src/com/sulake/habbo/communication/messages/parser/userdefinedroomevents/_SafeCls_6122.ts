import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6122 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6122'); }

    declare private _SafeStr_14941: number[];

    declare private _highlightType: number;
    static { (this.prototype as any)._highlightType = 0; }

    declare private _strength: number;
    static { (this.prototype as any)._strength = 0; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _animationMode: number;
    static { (this.prototype as any)._animationMode = 0; }

    declare private _easingMode: number;
    static { (this.prototype as any)._easingMode = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14941 = new Array<number>(0).fill(0);
        this._highlightType = 0;
        this._strength = 0;
        this._color = 0;
        this._animationMode = 0;
        this._easingMode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        if (_loc2_ < 0) {
            return false;
        }
        this._SafeStr_14941 = new Array<number>(0).fill(0);
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14941.push(param1.readInteger());
            _loc3_++;
        }
        this._highlightType = param1.readInteger();
        this._strength = param1.readInteger();
        this._color = param1.readInteger();
        this._animationMode = param1.readInteger();
        this._easingMode = param1.readInteger();
        return true;
    }

    public get roomIndices(): number[] {
        return this._SafeStr_14941;
    }

    public get highlightType(): number {
        return this._highlightType;
    }

    public get strength(): number {
        return this._strength;
    }

    public get color(): number {
        return this._color;
    }

    public get animationMode(): number {
        return this._animationMode;
    }

    public get easingMode(): number {
        return this._easingMode;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectFurnitureHighlightUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectFurnitureHighlightUpdateMessage'); }

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

    declare private _SafeStr_14816: boolean;
    static { (this.prototype as any)._SafeStr_14816 = false; }

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: boolean = false) {
        super(null, null);
        this._highlightType = param1;
        this._strength = param2;
        this._color = param3;
        this._animationMode = param4;
        this._easingMode = param5;
        this._SafeStr_14816 = param6;
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

    public get initialize(): boolean {
        return this._SafeStr_14816;
    }
}

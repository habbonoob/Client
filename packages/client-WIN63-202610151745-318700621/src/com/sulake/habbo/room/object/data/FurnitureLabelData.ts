import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurnitureLabelData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::FurnitureLabelData'); }

    public static readonly _SafeStr_14810: number = 0;
    public static readonly _SafeStr_14811: number = 1;
    public static readonly DEFAULT_COLOR: number = 4278912;
    public static readonly VISIBILITY_EVERYONE: number = 0;
    public static readonly VISIBILITY_WIRED_INSPECTORS: number = 1;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _SafeStr_14615: number;
    static { (this.prototype as any)._SafeStr_14615 = 0; }

    declare private _text: string;

    declare private _bubbleColor: number;
    static { (this.prototype as any)._bubbleColor = 0; }

    declare private _SafeStr_14812: number;
    static { (this.prototype as any)._SafeStr_14812 = 0; }

    declare private _alwaysOpen: boolean;
    static { (this.prototype as any)._alwaysOpen = false; }

    constructor(param1: number, param2: string, param3: number = 0, param4: number = 4278912, param5: number = 1, param6: boolean = false) {
        this._type = param3;
        this._SafeStr_14615 = param1;
        this._text = param2;
        this._bubbleColor = param4;
        this._SafeStr_14812 = param5;
        this._alwaysOpen = param6;
    }

    public get type(): number {
        return this._type;
    }

    public get furnitureId(): number {
        return this._SafeStr_14615;
    }

    public get text(): string {
        return this._text;
    }

    public get bubbleColor(): number {
        return this._bubbleColor;
    }

    public get visibility(): number {
        return this._SafeStr_14812;
    }

    public get alwaysOpen(): boolean {
        return this._alwaysOpen;
    }

    public equals(param1: FurnitureLabelData): boolean {
        return param1 != null && param1.type == this._type && param1.furnitureId == this._SafeStr_14615 && param1.text == this._text && param1.bubbleColor == this._bubbleColor && param1.visibility == this._SafeStr_14812 && param1.alwaysOpen == this._alwaysOpen;
    }
}

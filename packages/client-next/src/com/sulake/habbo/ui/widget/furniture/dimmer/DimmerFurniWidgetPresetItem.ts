import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class DimmerFurniWidgetPresetItem {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.dimmer::DimmerFurniWidgetPresetItem'); }

    private _id: number = 0;
    private _type: number = 0;
    private _color: number = 0;
    private _light: number = 0;

    constructor(param1: number, param2: number, param3: number, param4: number) {
        this._id = param1;
        this._type = param2;
        this._color = param3;
        this._light = param4;
    }

    public get id(): number {
        return this._id;
    }

    public get type(): number {
        return this._type;
    }

    public get color(): number {
        return this._color;
    }

    public get light(): number {
        return this._light;
    }

    public set type(param1: number) {
        this._type = param1;
    }

    public set color(param1: number) {
        this._color = param1;
    }

    public set light(param1: number) {
        this._light = param1;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ISkinTemplateEntity } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplateEntity';

export class SkinTemplateEntity implements ISkinTemplateEntity {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::SkinTemplateEntity'); }

    declare protected _id: number;
    static { (this.prototype as any)._id = 0; }

    declare protected _name: string;

    declare protected _type: string;

    declare protected _SafeStr_4345: Rectangle;

    constructor(param1: string, param2: string, param3: number, param4: Rectangle) {
        this._id = param3;
        this._name = param1;
        this._type = param2;
        this._SafeStr_4345 = param4;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get type(): string {
        return this._type;
    }

    public get region(): Rectangle {
        return this._SafeStr_4345;
    }

    get [ISkinTemplateEntity](): true {
        return true;
    }
}

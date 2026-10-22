import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IChildEntity } from '@/com/sulake/core/window/utils/IChildEntity';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export class SkinLayoutEntity implements IChildEntity {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::SkinLayoutEntity'); }

    public static readonly SCALE_TYPE_FIXED: number = 0;
    public static readonly SCALE_TYPE_MOVE: number = 1;
    public static readonly SCALE_TYPE_STRECH: number = 2;
    public static readonly SCALE_TYPE_TILED: number = 4;
    public static readonly SCALE_TYPE_CENTER: number = 8;

    constructor(param1: number, param2: string) {
        this._id = param1;
        this._name = param2;
    }

    declare public color: number;
    static { (this.prototype as any).color = 0; }

    declare public blend: number;
    static { (this.prototype as any).blend = 0; }

    declare public scaleH: number;
    static { (this.prototype as any).scaleH = 0; }

    declare public scaleV: number;
    static { (this.prototype as any).scaleV = 0; }

    declare public region: Rectangle;

    declare public colorize: boolean;
    static { (this.prototype as any).colorize = false; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._id;
    }

    public get tags(): any[] {
        return null;
    }

    public dispose(): void {
        this.region = null;
    }
}

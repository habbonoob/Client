import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomPlaneBitmapMaskData {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomPlaneBitmapMaskData'); }

    public static readonly MASK_CATEGORY_WINDOW: string = "window";
    public static readonly MASK_CATEGORY_HOLE: string = "hole";
    private _SafeStr_2291: Vector3d = null;
    private _type: string = null;
    private _category: string = null;

    constructor(param1: string, param2: IVector3d, param3: string) {
        this.type = param1;
        this.loc = param2;
        this.category = param3;
    }

    public get loc(): IVector3d {
        return this._SafeStr_2291;
    }

    public set loc(param1: IVector3d) {
        if (this._SafeStr_2291 == null) {
            this._SafeStr_2291 = new Vector3d();
        }
        this._SafeStr_2291.assign(param1);
    }

    public get type(): string {
        return this._type;
    }

    public set type(param1: string) {
        this._type = param1;
    }

    public get category(): string {
        return this._category;
    }

    public set category(param1: string) {
        this._category = param1;
    }

    public dispose(): void {
        this._SafeStr_2291 = null;
    }
}

import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPropertyMap } from '@/com/sulake/core/window/theme/IPropertyMap';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';

export class PropertyMap implements IPropertyMap {
    static { registerClassName(this, 'com.sulake.core.window.theme::PropertyMap'); }

    private _map: Map<any, any> = new Dictionary();

    constructor() {
    }

    private add(param1: string, param2: any, param3: string, param4: any[] = null): void {
        this._map.set(param1, new PropertyStruct(param1, param2, param3, false, param4));
    }

    public addBoolean(param1: string, param2: boolean): void {
        this.add(param1, param2, "Boolean");
    }

    public addInt(param1: string, param2: number): void {
        this.add(param1, param2, "int");
    }

    public addUint(param1: string, param2: number): void {
        this.add(param1, param2, "uint");
    }

    public addHex(param1: string, param2: number): void {
        this.add(param1, param2, "hex");
    }

    public addNumber(param1: string, param2: number): void {
        this.add(param1, param2, "Number");
    }

    public addString(param1: string, param2: string): void {
        this.add(param1, param2, "String");
    }

    public addEnumeration(param1: string, param2: string, param3: any[]): void {
        this.add(param1, param2, "String", param3);
    }

    public addArray(param1: string, param2: any[]): void {
        this.add(param1, param2, "Array");
    }

    public _SafeStr_2119(param1: string): PropertyStruct {
        return this._map.get(param1);
    }

    public clone(): PropertyMap {
        let _loc1_: PropertyMap = new PropertyMap();
        for (const _loc2_ of this._map?.keys() ?? []) {
            _loc1_._map.set(_loc2_, this._map.get(_loc2_));
        }
        return _loc1_;
    }
}

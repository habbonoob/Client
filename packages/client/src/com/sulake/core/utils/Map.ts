import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Proxy } from '@habbo-pixi/runtime/utils/Proxy';
import { QName } from '@habbo-pixi/runtime/xml/QName';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class Map extends Proxy implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.utils::Map'); }

    constructor() {
        super();
        this._length = 0;
        this._SafeStr_2393 = new Dictionary();
        this._array = [];
        this._SafeStr_2468 = [];
    }

    private _SafeStr_2393: globalThis.Map<any, any>;
    private _array: any[];
    private _SafeStr_2468: any[];
    private _length: number = 0;

    public get length(): number {
        return this._length;
    }

    public get disposed(): boolean {
        return this._SafeStr_2393 == null;
    }

    public override getProperty(param1: any): any {
        if (param1 instanceof QName) {
            param1 = castTo(param1, QName).localName;
        }
        return this._SafeStr_2393.get(param1);
    }

    public override setProperty(param1: any, param2: any): void {
        if (param1 instanceof QName) {
            param1 = castTo(param1, QName).localName;
        }
        this._SafeStr_2393.set(param1, param2);
        let _loc3_: number = this._SafeStr_2468.indexOf(param1);
        if (_loc3_ == -1) {
            this._array[this._length] = param2;
            this._SafeStr_2468[this._length] = param1;
            this._length = this._length + 1 >>> 0;
        } else {
            this._array.splice(_loc3_, 1, param2);
        }
    }

    public override nextNameIndex(param1: number): number {
        return param1 < this._length ? param1 + 1 : 0;
    }

    public override nextName(param1: number): string {
        return stringOrNull(this._SafeStr_2468[param1 - 1]);
    }

    public override nextValue(param1: number): any {
        return this._array[param1 - 1];
    }

    public override callProperty(param1: any, ...rest: any[]): any {
        return param1.localName == "toString" ? "Map" : null;
    }

    public dispose(): void {
        this._SafeStr_2393 = null;
        this._length = 0;
        this._array = null;
        this._SafeStr_2468 = null;
    }

    public reset(): void {
        this._SafeStr_2393 = new Dictionary();
        this._length = 0;
        this._array = [];
        this._SafeStr_2468 = [];
    }

    public unshift(param1: any, param2: any): boolean {
        if (this._SafeStr_2393.get(param1) != null) {
            return false;
        }
        this._SafeStr_2393.set(param1, param2);
        this._array.unshift(param2);
        this._SafeStr_2468.unshift(param1);
        this._length = this._length + 1 >>> 0;
        return true;
    }

    public add(param1: any, param2: any): boolean {
        if (this._SafeStr_2393.get(param1) != null) {
            return false;
        }
        this._SafeStr_2393.set(param1, param2);
        this._array[this._length] = param2;
        this._SafeStr_2468[this._length] = param1;
        this._length = this._length + 1 >>> 0;
        return true;
    }

    public replace(param1: any, param2: any): boolean {
        if (this._SafeStr_2393.get(param1) == null) {
            return false;
        }
        let _loc3_: number = this._SafeStr_2468.indexOf(param1);
        this._SafeStr_2393.set(param1, param2);
        this._array[_loc3_] = param2;
        return true;
    }

    public remove(param1: any): any {
        let _loc2_: any = this._SafeStr_2393.get(param1);
        if (_loc2_ == null) {
            return null;
        }
        let _loc3_: number = this._SafeStr_2468.indexOf(param1);
        if (_loc3_ >= 0) {
            this._array.splice(_loc3_, 1);
            this._SafeStr_2468.splice(_loc3_, 1);
            this._length = this._length - 1 >>> 0;
        }
        this._SafeStr_2393.delete(param1);
        return _loc2_;
    }

    public getWithIndex(param1: number): any {
        if (param1 < 0 || param1 >= this._length) {
            return null;
        }
        return this._array[param1];
    }

    public getKey(param1: number): any {
        if (param1 < 0 || param1 >= this._length) {
            return null;
        }
        return this._SafeStr_2468[param1];
    }

    public getValueByIndex(param1: number): any {
        if (param1 < 0 || param1 >= this._length) {
            return null;
        }
        return this._array[param1];
    }

    public getKeys(): any[] {
        return this._SafeStr_2468.slice();
    }

    public hasKey(param1: any): boolean {
        return this._SafeStr_2393.has(param1);
    }

    public getValue(param1: any): any {
        return this._SafeStr_2393.get(param1);
    }

    public getValues(): any[] {
        return this._array.slice();
    }

    public hasValue(param1: any): boolean {
        return this._array.indexOf(param1) > -1;
    }

    public indexOf(param1: any): number {
        return this._array.indexOf(param1);
    }

    public concatenate(param1: Map): void {
        let _loc3_: any = undefined;
        let _loc2_: any[] = param1._SafeStr_2468;
        for (_loc3_ of _loc2_ ?? []) {
            this.add(_loc3_, param1[_loc3_]);
        }
    }

    public clone(): Map {
        let _loc1_: Map = new Map();
        _loc1_.concatenate(this);
        return _loc1_;
    }

    get [IDisposable](): true {
        return true;
    }
}

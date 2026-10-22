import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NeighborhoodFloor {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common::NeighborhoodFloor'); }

    static #staticsReady = false;

    public static RADIUS: number = 10;
    public static SMALL_RADIUS: number = 5;

    public static get _SafeStr_7325(): number {
        NeighborhoodFloor.#initStatics();
        return NeighborhoodFloor._SafeStr_7325;
    }
    public static set _SafeStr_7325(value: number) {
        NeighborhoodFloor.#initStatics();
        NeighborhoodFloor._SafeStr_7325 = value;
    }

    declare private _floorPlanCache: any[];

    private _floorPlanCacheBuffer: any[] = null;
    private _smallMode: boolean = false;
    private _SafeStr_5908: (...args: any[]) => any = null;

    constructor(param1: any[], param2: boolean, param3: (...args: any[]) => any) {
        this._floorPlanCache = param1;
        this._smallMode = param2;
        this._SafeStr_5908 = param3;
    }

    public get floorPlanCache(): any[] {
        return this._floorPlanCache;
    }

    public setOccupied(param1: number, param2: number, param3: boolean): void {
        this._floorPlanCache[param1][param2] = param3;
    }

    public isOccupied(param1: number, param2: number): boolean {
        return this._floorPlanCache[param1][param2];
    }

    public occupationHasChanged(): void {
        if (this._SafeStr_5908 != null) {
            this._SafeStr_5908();
        }
    }

    public set smallMode(param1: boolean) {
        this._smallMode = param1;
    }

    public smallModeAllowed(): boolean {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        _loc1_ = -NeighborhoodFloor.RADIUS;
        while (_loc1_ <= NeighborhoodFloor.RADIUS) {
            _loc2_ = -NeighborhoodFloor.RADIUS;
            while (_loc2_ <= NeighborhoodFloor.RADIUS) {
                if (_loc1_ < -NeighborhoodFloor.SMALL_RADIUS || _loc1_ > NeighborhoodFloor.SMALL_RADIUS || _loc2_ < -NeighborhoodFloor.SMALL_RADIUS || _loc2_ > NeighborhoodFloor.SMALL_RADIUS) {
                    if (this.isOccupied(_loc1_ + NeighborhoodFloor.RADIUS, _loc2_ + NeighborhoodFloor.RADIUS)) {
                        return false;
                    }
                }
                _loc2_ += 1;
            }
            _loc1_ += 1;
        }
        return true;
    }

    public get visualizingRadius(): number {
        if (this._smallMode) {
            return NeighborhoodFloor.SMALL_RADIUS;
        }
        return NeighborhoodFloor.RADIUS;
    }

    public get visualizingDimension(): number {
        return this.visualizingRadius * 2 + 1;
    }

    public initTemporaryCache(): void {
        this._floorPlanCacheBuffer = this._floorPlanCache;
        this.clearTemporaryCache();
    }

    public clearTemporaryCache(): void {
        let _loc1_: number = 0;
        if (this._floorPlanCacheBuffer != null) {
            this._floorPlanCache = [];
            _loc1_ = 0;
            while (_loc1_ < this._floorPlanCacheBuffer.length) {
                this._floorPlanCache.push(this._floorPlanCacheBuffer[_loc1_].concat());
                _loc1_++;
            }
        }
    }

    public submitTemporaryCache(): void {
        this._floorPlanCacheBuffer = null;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (NeighborhoodFloor.#staticsReady) return;
        NeighborhoodFloor.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(NeighborhoodFloor, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_7325", 0);
        set("_SafeStr_7325", NeighborhoodFloor.RADIUS * 2 + 1);
    }
}

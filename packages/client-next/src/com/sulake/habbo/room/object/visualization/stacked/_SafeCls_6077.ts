import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6077 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.stacked::_SafeCls_6077'); }

    public minX: number = 0;
    public minY: number = 0;
    public maxX: number = 0;
    public maxY: number = 0;
    private _initialized: boolean = false;

    constructor() {
    }

    public get width(): number {
        return this.maxX - this.minX;
    }

    public get height(): number {
        return this.maxY - this.minY;
    }

    public add(param1: number, param2: number, param3: number, param4: number): void {
        if (!this._initialized) {
            this.minX = param1;
            this.minY = param2;
            this.maxX = param1 + param3;
            this.maxY = param2 + param4;
            this._initialized = true;
            return;
        }
        this.minX = Math.min(this.minX, param1) | 0;
        this.minY = Math.min(this.minY, param2) | 0;
        this.maxX = Math.max(this.maxX, param1 + param3) | 0;
        this.maxY = Math.max(this.maxY, param2 + param4) | 0;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { JsonMaskDrawingData } from '@/com/sulake/habbo/communication/messages/outgoing/camera/json/JsonMaskDrawingData';
import type { JsonTextureColumnData } from '@/com/sulake/habbo/communication/messages/outgoing/camera/json/JsonTextureColumnData';
import { JsonPoint } from '@/com/sulake/habbo/communication/messages/outgoing/camera/json/JsonPoint';

export class JsonPlaneDrawingData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.camera.json::JsonPlaneDrawingData'); }

    declare private _z: number;
    static { (this.prototype as any)._z = NaN; }

    private _SafeStr_5536: JsonPoint[] = [];

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    private _masks: any[] = [];

    declare private _bottomAligned: boolean;
    static { (this.prototype as any)._bottomAligned = false; }

    private _texCols: any[] = [];

    constructor() {
    }

    public get z(): number {
        return this._z;
    }

    public set z(param1: number) {
        this._z = param1;
    }

    public get cornerPoints(): JsonPoint[] {
        return this._SafeStr_5536;
    }

    public addCornerPoint(param1: number, param2: number): void {
        this._SafeStr_5536.push(new JsonPoint(param1, param2));
    }

    public get masks(): any[] {
        return this._masks;
    }

    public addMask(param1: JsonMaskDrawingData): void {
        this._masks.push(param1);
    }

    public get color(): number {
        return this._color;
    }

    public set color(param1: number) {
        this._color = param1;
    }

    public get bottomAligned(): boolean {
        return this._bottomAligned;
    }

    public setBottomAligned(param1: boolean): void {
        this._bottomAligned = param1;
    }

    public get texCols(): any[] {
        return this._texCols;
    }

    public addTexCol(param1: JsonTextureColumnData): void {
        this._texCols.push(param1);
    }

    /** What AS3's JSON.stringify writes for an instance: its public getters, not its private fields. */
    public toJSON(): object {
        return { z: this.z, cornerPoints: this.cornerPoints, color: this.color, masks: this.masks, bottomAligned: this.bottomAligned, texCols: this.texCols };
    }
}

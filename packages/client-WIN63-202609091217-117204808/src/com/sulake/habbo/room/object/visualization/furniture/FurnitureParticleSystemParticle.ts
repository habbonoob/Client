import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { Vector3D } from '@habbo-pixi/runtime/geom/Vector3D';

export class FurnitureParticleSystemParticle {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureParticleSystemParticle'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = NaN; }

    declare private _y: number;
    static { (this.prototype as any)._y = NaN; }

    declare private _z: number;
    static { (this.prototype as any)._z = NaN; }

    declare private _lastX: number;
    static { (this.prototype as any)._lastX = NaN; }

    declare private _lastY: number;
    static { (this.prototype as any)._lastY = NaN; }

    declare private _lastZ: number;
    static { (this.prototype as any)._lastZ = NaN; }

    private _hasMoved: boolean = false;

    declare private _direction: Vector3D;

    private _age: number = 0;

    declare private _lifeTime: number;
    static { (this.prototype as any)._lifeTime = 0; }

    private _isEmitter: boolean = false;
    private _fade: boolean = false;

    declare private _fadeTime: number;
    static { (this.prototype as any)._fadeTime = NaN; }

    private _alphaMultiplier: number = 1;

    declare private _frames: any[];

    constructor() {
    }

    public get fade(): boolean {
        return this._fade;
    }

    public get alphaMultiplier(): number {
        return this._alphaMultiplier;
    }

    public get direction(): Vector3D {
        return this._direction;
    }

    public get age(): number {
        return this._age;
    }

    public init(param1: number, param2: number, param3: number, param4: Vector3D, param5: number, param6: number, param7: number, param8: boolean = false, param9: any[] = null, param10: boolean = false): void {
        this._SafeStr_2126 = param1;
        this._y = param2;
        this._z = param3;
        this._direction = new Vector3D(param4.x, param4.y, param4.z);
        this._direction.scaleBy(param5);
        this._lastX = this._SafeStr_2126 - this._direction.x * param6;
        this._lastY = this._y - this._direction.y * param6;
        this._lastZ = this._z - this._direction.z * param6;
        this._age = 0;
        this._hasMoved = false;
        this._lifeTime = param7;
        this._isEmitter = param8;
        this._frames = param9;
        this._fade = param10;
        this._alphaMultiplier = 1;
        this._fadeTime = 0.5 + Math.random() * 0.5;
    }

    public update(): void {
        this._age = this._age + 1;
        if (this._age == this._lifeTime) {
            this.ignite();
        }
        if (this._fade) {
            if (this._age / this._lifeTime > this._fadeTime) {
                this._alphaMultiplier = (this._lifeTime - this._age) / (this._lifeTime * (1 - this._fadeTime));
            }
        }
    }

    public getAsset(): IGraphicAsset {
        if (this._frames && this._frames.length > 0) {
            return this._frames[this._age % this._frames.length];
        }
        return null;
    }

    protected ignite(): void {
    }

    public get isEmitter(): boolean {
        return this._isEmitter;
    }

    public get isAlive(): boolean {
        return this._age <= this._lifeTime;
    }

    public dispose(): void {
        this._direction = null;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._z;
    }

    public set x(param1: number) {
        this._SafeStr_2126 = param1;
    }

    public set y(param1: number) {
        this._y = param1;
    }

    public set z(param1: number) {
        this._z = param1;
    }

    public get lastX(): number {
        return this._lastX;
    }

    public set lastX(param1: number) {
        this._hasMoved = true;
        this._lastX = param1;
    }

    public get lastY(): number {
        return this._lastY;
    }

    public set lastY(param1: number) {
        this._hasMoved = true;
        this._lastY = param1;
    }

    public get lastZ(): number {
        return this._lastZ;
    }

    public set lastZ(param1: number) {
        this._hasMoved = true;
        this._lastZ = param1;
    }

    public get hasMoved(): boolean {
        return this._hasMoved;
    }

    public toString(): string {
        return stringOrNull([this._SafeStr_2126, this._y, this._z].toString());
    }

    public copy(param1: FurnitureParticleSystemParticle, param2: number): void {
        this._SafeStr_2126 = param1._SafeStr_2126 * param2;
        this._y = param1._y * param2;
        this._z = param1._z * param2;
        this._lastX = param1._lastX * param2;
        this._lastY = param1._lastY * param2;
        this._lastZ = param1._lastZ * param2;
        this._hasMoved = param1.hasMoved;
        this._direction = param1._direction;
        this._age = param1._age;
        this._lifeTime = param1._lifeTime;
        this._isEmitter = param1._isEmitter;
        this._fade = param1._fade;
        this._fadeTime = param1._fadeTime;
        this._alphaMultiplier = param1._alphaMultiplier;
    }
}

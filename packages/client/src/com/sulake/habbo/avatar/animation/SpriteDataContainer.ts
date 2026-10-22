import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAnimation } from '@/com/sulake/habbo/avatar/animation/IAnimation';
import type { ISpriteDataContainer } from '@/com/sulake/habbo/avatar/animation/ISpriteDataContainer';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class SpriteDataContainer implements ISpriteDataContainer {
    static { registerClassName(this, 'com.sulake.habbo.avatar.animation::SpriteDataContainer'); }

    constructor(param1: IAnimation, param2: XML) {
        let _loc4_: number = 0;
        this._animation = param1;
        this._id = String(param2.attribute("id"));
        this._ink = parseInt(param2.attribute("ink").toString()) | 0;
        this._member = String(param2.attribute("member"));
        this._hasStaticY = Boolean(parseInt(param2.attribute("staticY").toString()));
        this._hasDirections = Boolean(parseInt(param2.attribute("directions").toString()));
        this._dx = [];
        this._dy = [];
        this._dz = [];
        for (const _loc3_ of param2.child("direction") ?? []) {
            _loc4_ = parseInt(_loc3_.attribute("id").toString()) | 0;
            this._dx[_loc4_] = parseInt(_loc3_.attribute("dx").toString());
            this._dy[_loc4_] = parseInt(_loc3_.attribute("dy").toString());
            this._dz[_loc4_] = parseInt(_loc3_.attribute("dz").toString());
        }
    }

    declare private _animation: IAnimation;

    declare private _id: string;

    declare private _ink: number;
    static { (this.prototype as any)._ink = 0; }

    declare private _member: string;

    declare private _hasDirections: boolean;
    static { (this.prototype as any)._hasDirections = false; }

    declare private _hasStaticY: boolean;
    static { (this.prototype as any)._hasStaticY = false; }

    declare private _dx: any[];

    declare private _dy: any[];

    declare private _dz: any[];

    public get animation(): IAnimation {
        return this._animation;
    }

    public get id(): string {
        return this._id;
    }

    public get ink(): number {
        return this._ink;
    }

    public get member(): string {
        return this._member;
    }

    public get hasDirections(): boolean {
        return this._hasDirections;
    }

    public get hasStaticY(): boolean {
        return this._hasStaticY;
    }

    public getDirectionOffsetX(param1: number): number {
        if (param1 < this._dx.length) {
            return this._dx[param1] | 0;
        }
        return 0;
    }

    public getDirectionOffsetY(param1: number): number {
        if (param1 < this._dy.length) {
            return this._dy[param1] | 0;
        }
        return 0;
    }

    public getDirectionOffsetZ(param1: number): number {
        if (param1 < this._dz.length) {
            return this._dz[param1] | 0;
        }
        return 0;
    }
}

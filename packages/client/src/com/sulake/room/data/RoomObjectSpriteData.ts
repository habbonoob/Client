import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomObjectSpriteData {
    static { registerClassName(this, 'com.sulake.room.data::RoomObjectSpriteData'); }

    constructor() {
    }

    declare public objectId: number;
    static { (this.prototype as any).objectId = 0; }

    declare public x: number;
    static { (this.prototype as any).x = 0; }

    declare public y: number;
    static { (this.prototype as any).y = 0; }

    declare public z: number;
    static { (this.prototype as any).z = NaN; }

    declare public name: string;

    declare public blendMode: string;

    declare public flipH: boolean;
    static { (this.prototype as any).flipH = false; }

    declare public skew: number;
    static { (this.prototype as any).skew = NaN; }

    declare public frame: boolean;
    static { (this.prototype as any).frame = false; }

    declare public color: string;

    declare public alpha: number;
    static { (this.prototype as any).alpha = NaN; }

    declare public width: number;
    static { (this.prototype as any).width = 0; }

    declare public height: number;
    static { (this.prototype as any).height = 0; }

    declare public objectType: string;

    declare public posture: string;
}

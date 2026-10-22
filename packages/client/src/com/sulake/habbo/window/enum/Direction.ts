import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Direction {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::Direction'); }

    public static readonly NORTH_EAST: number = 0;
    public static readonly EAST: number = 1;
    public static readonly SOUTH_EAST: number = 2;
    public static readonly SOUTH: number = 3;
    public static readonly SOUTH_WEST: number = 4;
    public static readonly WEST: number = 5;
    public static readonly NORTH_WEST: number = 6;
    public static readonly NORTH: number = 7;
}

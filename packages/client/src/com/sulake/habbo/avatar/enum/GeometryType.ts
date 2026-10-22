import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class GeometryType {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::GeometryType'); }

    public static readonly VERTICAL: string = "vertical";
    public static readonly SITTING: string = "sitting";
    public static readonly HORIZONTAL: string = "horizontal";
    public static readonly SWIM: string = "swim";
    public static readonly SNOWSTORMHORIZONTAL: string = "swhorizontal";
}

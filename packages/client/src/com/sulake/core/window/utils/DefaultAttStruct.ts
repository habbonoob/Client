import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class DefaultAttStruct {
    static { registerClassName(this, 'com.sulake.core.window.utils::DefaultAttStruct'); }

    public static useRectLimits: boolean = true;

    constructor() {
    }

    public color: number = 16777215;
    public background: boolean = false;
    public blend: number = 1;
    public threshold: number = 10;
    public width_min: number = -2147483648;
    public width_max: number = 2147483647;
    public height_min: number = -2147483648;
    public height_max: number = 2147483647;

    public hasRectLimits(): boolean {
        return DefaultAttStruct.useRectLimits && (this.width_min > -2147483648 || this.height_min > -2147483648 || this.width_max < 2147483647 || this.height_max < 2147483647);
    }
}

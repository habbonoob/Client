import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class ImageResult {
    static { registerClassName(this, 'com.sulake.habbo.room::ImageResult'); }

    public id: number = 0;
    public data: BitmapData = null;

    constructor() {
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class VariableFxFrame {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxFrame'); }

    declare public bitmapData: BitmapData;

    declare public _SafeStr_14673: any;

    public updateId: number = 0;
    public width: number = 0;
    public height: number = 0;
    public _SafeStr_14669: number = 0;
    public _SafeStr_14670: number = 0;

    constructor() {
    }

    public disposeBitmap(): void {
        if (this.bitmapData != null) {
            this.bitmapData.dispose();
        }
        this.bitmapData = null;
        this._SafeStr_14673 = null;
        this.width = 0;
        this.height = 0;
    }
}

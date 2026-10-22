import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class GraphicAssetPalette {
    static { registerClassName(this, 'com.sulake.room.object.visualization.utils::GraphicAssetPalette'); }

    private static BLANK: any[] = [];

    declare private _SafeStr_3687: any[];

    private _primaryColor: number = 0;
    private _secondaryColor: number = 0;

    constructor(param1: ByteArray, param2: number, param3: number) {
        let _loc4_: any = 0;
        let _loc6_: any = 0;
        let _loc5_: any = 0;
        let _loc7_: any = 0;
        this._SafeStr_3687 = [];
        param1.position = 0;
        while (param1.bytesAvailable >= 3) {
            _loc4_ = param1.readUnsignedByte();
            _loc6_ = param1.readUnsignedByte();
            _loc5_ = param1.readUnsignedByte();
            _loc7_ = (-16777216 | _loc4_ << 16 | _loc6_ << 8 | _loc5_) >>> 0;
            this._SafeStr_3687.push(_loc7_);
        }
        while (this._SafeStr_3687.length < 256) {
            this._SafeStr_3687.push(0);
        }
        while (GraphicAssetPalette.BLANK.length < 256) {
            GraphicAssetPalette.BLANK.push(0);
        }
        this._primaryColor = param2;
        this._secondaryColor = param3;
    }

    public get primaryColor(): number {
        return this._primaryColor;
    }

    public get secondaryColor(): number {
        return this._secondaryColor;
    }

    public dispose(): void {
        this._SafeStr_3687 = [];
    }

    public colorizeBitmap(param1: BitmapData): void {
        let _loc2_: BitmapData = param1.clone();
        param1.paletteMap(param1, param1.rect, new Point(0, 0), GraphicAssetPalette.BLANK, this._SafeStr_3687, GraphicAssetPalette.BLANK, GraphicAssetPalette.BLANK);
        param1.copyChannel(_loc2_, param1.rect, new Point(0, 0), 8, 8);
        _loc2_.dispose();
    }
}

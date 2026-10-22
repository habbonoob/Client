import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';

export class GraphicAsset implements IGraphicAsset {
    static { registerClassName(this, 'com.sulake.room.object.visualization.utils::GraphicAsset'); }

    private static readonly _SafeStr_3935: GraphicAsset[] = [];

    declare private _assetName: string;

    declare private _libraryAssetName: string;

    declare private _asset: BitmapDataAsset;

    declare private _flipH: boolean;
    static { (this.prototype as any)._flipH = false; }

    declare private _flipV: boolean;
    static { (this.prototype as any)._flipV = false; }

    declare private _usesPalette: boolean;
    static { (this.prototype as any)._usesPalette = false; }

    declare private _offsetX: number;
    static { (this.prototype as any)._offsetX = 0; }

    declare private _offsetY: number;
    static { (this.prototype as any)._offsetY = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    constructor() {
    }

    public static allocate(param1: string, param2: string, param3: IAsset, param4: boolean, param5: boolean, param6: number, param7: number, param8: boolean = false): GraphicAsset {
        let _loc9_: GraphicAsset = GraphicAsset._SafeStr_3935.length > 0 ? GraphicAsset._SafeStr_3935.pop() : new GraphicAsset();
        _loc9_._assetName = param1;
        _loc9_._libraryAssetName = param2;
        let _loc10_: BitmapDataAsset = param3 instanceof BitmapDataAsset ? param3 : null;
        if (_loc10_ != null) {
            _loc9_._asset = _loc10_;
            _loc9_._initialized = false;
        } else {
            _loc9_._asset = null;
            _loc9_._initialized = true;
        }
        _loc9_._flipH = param4;
        _loc9_._flipV = param5;
        _loc9_._offsetX = param6;
        _loc9_._offsetY = param7;
        _loc9_._usesPalette = param8;
        return _loc9_;
    }

    public recycle(): void {
        this._asset = null;
        GraphicAsset._SafeStr_3935.push(this);
    }

    private initialize(): void {
        let _loc1_: BitmapData = null;
        if (!this._initialized && this._asset != null) {
            _loc1_ = asInstanceOf(this._asset.content, BitmapData);
            if (_loc1_ != null) {
                this._width = _loc1_.width;
                this._height = _loc1_.height;
            }
            this._initialized = true;
        }
    }

    public get flipV(): boolean {
        return this._flipV;
    }

    public get flipH(): boolean {
        return this._flipH;
    }

    public get width(): number {
        this.initialize();
        return this._width;
    }

    public get height(): number {
        this.initialize();
        return this._height;
    }

    public get assetName(): string {
        return this._assetName;
    }

    public get libraryAssetName(): string {
        return this._libraryAssetName;
    }

    public get asset(): IAsset {
        return this._asset;
    }

    public get usesPalette(): boolean {
        return this._usesPalette;
    }

    public get offsetX(): number {
        if (!this._flipH) {
            return this._offsetX;
        }
        return -(this.width + this._offsetX);
    }

    public get offsetY(): number {
        if (!this._flipV) {
            return this._offsetY;
        }
        return -(this.height + this._offsetY);
    }

    public get originalOffsetX(): number {
        return this._offsetX;
    }

    public get originalOffsetY(): number {
        return this._offsetY;
    }

    get [IGraphicAsset](): true {
        return true;
    }
}

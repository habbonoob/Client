import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';

export class MarketplaceChart {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::MarketplaceChart'); }

    declare private _SafeStr_2126: any[];

    declare private _y: any[];

    declare private _chartWidth: number;
    static { (this.prototype as any)._chartWidth = 0; }

    declare private _SafeStr_3886: number;
    static { (this.prototype as any)._SafeStr_3886 = 0; }

    private _xMin: number = -30;

    declare private _SafeStr_3093: number;
    static { (this.prototype as any)._SafeStr_3093 = 0; }

    constructor(param1: any[], param2: any[]) {
        this._SafeStr_2126 = param1.slice();
        this._y = param2.slice();
    }

    public draw(param1: number, param2: number): BitmapData {
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: BitmapData = new BitmapData(param1, param2);
        if (!this.available) {
            return _loc8_;
        }
        this._SafeStr_3093 = 0;
        for (_loc5_ of this._y ?? []) {
            if (_loc5_ > this._SafeStr_3093) {
                this._SafeStr_3093 = _loc5_;
            }
        }
        let _loc6_: number = Math.pow(10, this._SafeStr_3093.toString().length - 1) | 0;
        this._SafeStr_3093 = Math.ceil(this._SafeStr_3093 / _loc6_) * _loc6_ | 0;
        let _loc9_: TextField = new TextField();
        let _loc4_: TextFormat = new TextFormat();
        _loc9_.embedFonts = true;
        _loc4_.font = "Volter";
        _loc4_.size = 9;
        _loc9_.defaultTextFormat = _loc4_;
        _loc9_.text = this._SafeStr_3093.toString();
        _loc8_.draw(_loc9_);
        this._chartWidth = param1 - _loc9_.textWidth - 2 | 0;
        this._SafeStr_3886 = param2 - _loc9_.textHeight | 0;
        let _loc10_: number = _loc9_.textWidth | 0;
        _loc9_.text = "0";
        _loc8_.draw(_loc9_, new Matrix(1, 0, 0, 1, _loc10_ - _loc9_.textWidth + 1, param2 - _loc9_.textHeight - 1));
        let _loc3_: Shape = new Shape();
        _loc3_.graphics.lineStyle(1, 13421772);
        _loc3_.graphics.moveTo(0, 0);
        _loc3_.graphics.lineTo(0, this._SafeStr_3886);
        _loc7_ = 0;
        while (_loc7_ <= 5) {
            _loc5_ = (this._SafeStr_3886 - 1) / 5 * _loc7_ | 0;
            _loc3_.graphics.moveTo(0, _loc5_);
            _loc3_.graphics.lineTo(this._chartWidth - 1, _loc5_);
            _loc7_++;
        }
        _loc3_.graphics.lineStyle(2, 255);
        _loc3_.graphics.moveTo(this.getX(0), this.getY(0));
        _loc7_ = 1;
        while (_loc7_ < this._SafeStr_2126.length) {
            _loc3_.graphics.lineTo(this.getX(_loc7_), this.getY(_loc7_));
            _loc7_++;
        }
        _loc8_.draw(_loc3_, new Matrix(1, 0, 0, 1, param1 - this._chartWidth, (param2 - this._SafeStr_3886) / 2));
        return _loc8_;
    }

    private getX(param1: number): number {
        return this._chartWidth + this._chartWidth / -this._xMin * this._SafeStr_2126[param1];
    }

    private getY(param1: number): number {
        return this._SafeStr_3886 - this._SafeStr_3886 / this._SafeStr_3093 * this._y[param1];
    }

    public get available(): boolean {
        return !!(this._SafeStr_2126 && this._y && this._SafeStr_2126.length > 1);
    }
}

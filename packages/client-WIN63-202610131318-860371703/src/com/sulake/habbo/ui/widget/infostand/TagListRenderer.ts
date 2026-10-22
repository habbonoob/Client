import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class TagListRenderer {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::TagListRenderer'); }

    private readonly MARGIN_X: number = 5;
    private readonly MARGIN_Y: number = 5;

    declare private _widget: InfoStandWidget;

    declare private _SafeStr_2333: (...args: any[]) => any;

    declare private _offsetX: number;
    static { (this.prototype as any)._offsetX = 0; }

    declare private _offsetY: number;
    static { (this.prototype as any)._offsetY = 0; }

    private _SafeStr_4345: Rectangle = null;
    private _SafeStr_7364: number = 0;

    declare private _SafeStr_4868: any[];

    constructor(param1: InfoStandWidget, param2: (...args: any[]) => any) {
        this._widget = param1;
        this._SafeStr_2333 = param2;
    }

    public dispose(): void {
        this._widget = null;
        this._SafeStr_2333 = null;
    }

    public renderTags(param1: any[], param2: IWindowContainer, param3: any[]): number {
        let _loc4_: any[] = null;
        let _loc5_: string = null;
        let _loc9_: ITextWindow = null;
        let _loc7_: number = 0;
        this._SafeStr_4868 = param3;
        if (this._SafeStr_4868 != null) {
            _loc4_ = [];
            while (true) {
                _loc5_ = stringOrNull(param1.pop());
                if (_loc5_ == null) {
                    break;
                }
                param3.indexOf(_loc5_) != -1 ? _loc4_.unshift(_loc5_) : _loc4_.push(_loc5_);
            }
            param1 = _loc4_;
        }
        while (param2.removeChildAt(0) != null) {
        }
        this._SafeStr_7364 = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._SafeStr_4345 = param2.rectangle;
        this._SafeStr_4345.height = 150;
        _loc7_ = 0;
        while (_loc7_ < param1.length) {
            _loc9_ = this.createTag(asGuarded(param1[_loc7_], isString));
            if (this.fit(_loc9_)) {
                param2.addChild(_loc9_);
            } else {
                _loc9_.dispose();
            }
            _loc7_++;
        }
        let _loc8_: number = param2.numChildren;
        if (_loc8_ == 0) {
            return 0;
        }
        let _loc6_: IWindow = param2.getChildAt(param2.numChildren - 1);
        return _loc6_.bottom;
    }

    private fit(param1: IWindow): boolean {
        if (param1.width > this._SafeStr_4345.width) {
            return false;
        }
        if (this._offsetY + param1.height > this._SafeStr_4345.height) {
            return false;
        }
        if (this._offsetX + param1.width > this._SafeStr_4345.width) {
            this._offsetX = 0;
            this._offsetY += param1.height + 5;
            return this.fit(param1);
        }
        param1.offset(this._offsetX, this._offsetY);
        this._offsetX += param1.width + 5;
        return true;
    }

    private createTag(param1: string): ITextWindow {
        let _loc2_: XmlAsset = null;
        if (this._SafeStr_4868 != null && this._SafeStr_4868.indexOf(param1) != -1) {
            _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("user_tag_highlighted"), XmlAsset);
        } else {
            _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("user_tag"), XmlAsset);
        }
        if (_loc2_ == null) {
            return null;
        }
        let _loc3_: ITextWindow = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isITextWindow);
        if (_loc3_ == null) {
            throw new Error("Failed to construct window from XML!");
        }
        _loc3_.addEventListener("WME_CLICK", this._SafeStr_2333);
        _loc3_.caption = param1;
        return _loc3_;
    }
}

import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ITrophyFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/trophy/ITrophyFurniWidget';
import type { ITrophyView } from '@/com/sulake/habbo/ui/widget/furniture/trophy/ITrophyView';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TrophyTheme } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyTheme';

export class TrophyView implements ITrophyView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.trophy::TrophyView'); }

    declare private _widget: ITrophyFurniWidget;

    declare private _window: IWindowContainer;

    constructor(param1: ITrophyFurniWidget) {
        this._widget = param1;
    }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._widget = null;
    }

    public showInterface(): boolean {
        let _loc2_: IWindow = null;
        let _loc9_: IWindowContainer = null;
        let _loc11_: ITextWindow = null;
        let _loc6_: ITextWindow = null;
        let _loc3_: ITextWindow = null;
        let _loc7_: ITextWindow = null;
        let _loc5_: BitmapDataAsset = null;
        let _loc4_: BitmapData = null;
        let _loc8_: IBitmapWrapperWindow = null;
        let _loc10_: IAsset = this._widget.assets.getAssetByName("trophy");
        let _loc1_: XmlAsset = castTo(_loc10_, XmlAsset);
        if (_loc1_ == null) {
            return false;
        }
        if (this._window == null) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIWindowContainer);
        }
        this._window.center();
        _loc2_ = this._window.findChildByName("close");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        _loc9_ = asGuarded(this._window.findChildByName("title_bg"), isIWindowContainer);
        if (_loc9_ != null) {
            _loc9_.color = this._widget.headerColor;
        }
        _loc11_ = asGuarded(this._window.findChildByName("title"), isITextWindow);
        if (_loc11_ != null) {
            _loc11_.text = this._widget.frameTitle;
        }
        _loc6_ = asGuarded(this._window.findChildByName("greeting"), isITextWindow);
        if (_loc6_ != null) {
            _loc6_.text = this._widget.message.replace(/\\r/g, "\n");
        }
        _loc3_ = asGuarded(this._window.findChildByName("date"), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.text = this._widget.date;
        }
        _loc7_ = asGuarded(this._window.findChildByName("name"), isITextWindow);
        if (_loc7_ != null) {
            _loc7_.text = this._widget.name;
        }
        _loc5_ = asInstanceOf(this._widget.assets.getAssetByName(TrophyTheme.getBackgroundAssetName(this._widget.backgroundTheme)), BitmapDataAsset);
        _loc8_ = asGuarded(this._window.findChildByName("trophy_bg"), isIBitmapWrapperWindow);
        if (_loc8_ != null) {
            _loc8_.color = this._widget.color >>> 0;
        }
        if (_loc5_ != null && _loc8_ != null) {
            _loc4_ = asInstanceOf(_loc5_.content, BitmapData);
            _loc8_.bitmap = _loc4_;
        }
        return true;
    }

    public disposeInterface(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private onMouseEvent = (param1: WindowMouseEvent): void => {
        this.disposeInterface();
    };
}

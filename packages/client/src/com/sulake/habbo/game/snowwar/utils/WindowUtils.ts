import { asGuarded, asInstanceOf, castGuarded, castTo, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { HabboGamesCom } from '@/com/sulake/habbo/game/HabboGameManager.group';

export class WindowUtils {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.utils::WindowUtils'); }

    private static _assets: IAssetLibrary;
    private static _windowManager: IHabboWindowManager;

    public static setCaption(param1: IWindow, param2: string): void {
        let _loc3_: IWindow = null;
        param1.caption = param2;
        if (isIWindowContainer(param1.parent)) {
            _loc3_ = (asGuarded(param1.parent, isIWindowContainer)).findChildByName(param1.name + "_stroke");
        }
        if (isIItemListWindow(param1.parent)) {
            _loc3_ = (asGuarded(param1.parent, isIItemListWindow)).getListItemByName(param1.name + "_stroke");
        }
        if (isIItemGridWindow(param1.parent)) {
            _loc3_ = (asGuarded(param1.parent, isIItemGridWindow)).getGridItemByName(param1.name + "_stroke");
        }
        if (_loc3_) {
            if (_loc3_.caption != param2) {
                _loc3_.caption = param2;
            }
        }
    }

    public static init(param1: IAssetLibrary, param2: IHabboWindowManager): void {
        WindowUtils._assets = param1;
        WindowUtils._windowManager = param2;
    }

    public static setElementImage(param1: IWindow, param2: BitmapData, param3: number = 0, param4: number = 0, param5: number = 0): void {
        let _loc9_: IBitmapWrapperWindow = null;
        let _loc6_: IDisplayObjectWrapper = null;
        if (param2 == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        if (param1.disposed) {
            return;
        }
        let _loc10_: number = param3 > 0 ? param3 : param1.height;
        let _loc7_: number = (param1.width - param2.width) / 2 + param4 | 0;
        let _loc8_: number = (_loc10_ - param2.height) / 2 + param5 | 0;
        if ((isIBitmapWrapperWindow(param1) ? param1 : null) != null) {
            _loc9_ = castGuarded(param1, isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            if (_loc9_.bitmap == null || param3 > 0) {
                _loc9_.bitmap = new BitmapData(param1.width, _loc10_, true, 16777215);
            }
            _loc9_.bitmap.fillRect(_loc9_.bitmap.rect, 16777215);
            _loc9_.bitmap.copyPixels(param2, param2.rect, new Point(_loc7_, _loc8_), null, null, false);
            param1.invalidate();
        } else if ((isIDisplayObjectWrapper(param1) ? param1 : null) != null) {
            _loc6_ = castGuarded(param1, isIDisplayObjectWrapper, "com.sulake.core.window.components.IDisplayObjectWrapper");
            _loc6_.setDisplayObject(new Bitmap(param2));
        }
    }

    public static createWindow(param1: string, param2: number = 2): IWindow {
        HabboGamesCom.log("CreateWindow: " + param1);
        if (!WindowUtils._assets || !WindowUtils._windowManager) {
            return null;
        }
        let _loc4_: XmlAsset = asInstanceOf(WindowUtils._assets.getAssetByName(param1), XmlAsset);
        if (_loc4_ == null) {
            HabboGamesCom.log("CreateWindow() could not find the asset for window: " + param1);
            return null;
        }
        let _loc5_: IWindow = WindowUtils._windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML), param2 >>> 0);
        let _loc3_: any[] = [];
        if (isIWindowContainer(_loc5_)) {
            (isIWindowContainer(_loc5_) ? _loc5_ : null).groupChildrenWithTag("bitmap", _loc3_, -1);
        } else if (isIItemListWindow(_loc5_)) {
            (isIItemListWindow(_loc5_) ? _loc5_ : null).groupListItemsWithTag("bitmap", _loc3_, -1);
        } else if (isIItemGridWindow(_loc5_)) {
        }
        for (const _loc7_ of _loc3_ ?? []) {
            HabboGamesCom.log("Found child: " + _loc7_.name);
        }
        for (const _loc6_ of _loc3_ ?? []) {
            if (_loc6_ != null) {
                WindowUtils.setDefaultElementImage(_loc6_, false);
            }
        }
        return _loc5_;
    }

    public static hideElement(param1: IWindowContainer, param2: string): void {
        let _loc4_: IWindow = param1.findChildByName(param2);
        if (_loc4_) {
            _loc4_.visible = false;
        }
        let _loc3_: IWindow = param1.findChildByName(param2 + "_stroke");
        if (_loc3_) {
            _loc3_.visible = false;
        }
    }

    public static colorStrokes(param1: IWindow, param2: number): void {
        let _loc3_: any[] = [];
        if (isIWindowContainer(param1)) {
            (isIWindowContainer(param1) ? param1 : null).groupChildrenWithTag("stroke", _loc3_, 10);
        } else if (isIItemListWindow(param1)) {
            (isIItemListWindow(param1) ? param1 : null).groupListItemsWithTag("stroke", _loc3_, 10);
        } else if (isIItemGridWindow(param1)) {
        }
        for (const _loc4_ of _loc3_ ?? []) {
            if (_loc4_ != null) {
                _loc4_.textColor = param2;
            }
        }
    }

    public static showElement(param1: IWindowContainer, param2: string): void {
        let _loc4_: IWindow = param1.findChildByName(param2);
        if (_loc4_) {
            _loc4_.visible = true;
        }
        let _loc3_: IWindow = param1.findChildByName(param2 + "_stroke");
        if (_loc3_) {
            _loc3_.visible = true;
        }
    }

    private static setDefaultElementImage(param1: IBitmapWrapperWindow, param2: boolean): void {
        let asset: IAsset;
        let result: any[];
        let offset: Point;
        let assetName: string;
        let src: BitmapData;
        let bmpWindow: IBitmapWrapperWindow = param1;
        let active: boolean = param2;
        if (!WindowUtils._assets) {
            return;
        }
        if (bmpWindow == null) {
            return;
        }
        result = bmpWindow.properties.filter((param1: any, param2: number, param3: any[]): boolean => {
                return castTo(param1, PropertyStruct).key == "bitmap_asset_name";
            });
        offset = new Point();
        if (result && result.length) {
            assetName = asGuarded(castTo(result[0], PropertyStruct).value, isString);
            HabboGamesCom.log("Found Image: " + bmpWindow.name + " : " + assetName);
            if (active) {
                assetName = assetName.replace("_on", "");
            }
            asset = WindowUtils._assets.getAssetByName(assetName);
            if (asset && asset instanceof BitmapDataAsset) {
                bmpWindow.bitmap = new BitmapData(bmpWindow.width, bmpWindow.height, true, 0);
                src = asInstanceOf(asset.content, BitmapData);
                offset.x = (bmpWindow.width - src.width) / 2;
                offset.y = (bmpWindow.height - src.height) / 2;
                bmpWindow.bitmap.copyPixels(src, src.rect, offset);
            }
        }
    }

    constructor() {
    }
}

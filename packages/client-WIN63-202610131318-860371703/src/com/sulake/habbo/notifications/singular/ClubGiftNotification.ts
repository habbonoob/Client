import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class ClubGiftNotification {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::ClubGiftNotification'); }

    private static readonly TOOLBAR_EXTENSION_ID: string = "club_gift_notification";
    private static readonly LINK_COLOR_NORMAL: number = 16777215;
    private static readonly LINK_COLOR_HIGHLIGHT: number = 12247545;
    private static readonly ICON_STYLE_CLUB: number = 13;
    private static readonly ICON_STYLE_VIP: number = 14;

    declare private _window: IBorderWindow;

    declare private _catalog: IHabboCatalog;

    declare private _toolbar: IHabboToolbar;

    declare private _linkText: ITextWindow;

    private _isCancelled: boolean = false;

    constructor(param1: number, param2: IAssetLibrary, param3: IHabboWindowManager, param4: IHabboCatalog, param5: IHabboToolbar) {
        if (!param2 || !param3 || !param4) {
            return;
        }
        this._catalog = param4;
        this._toolbar = param5;
        let _loc6_: XmlAsset = asInstanceOf(param2.getAssetByName("club_gift_notification_xml"), XmlAsset);
        if (_loc6_ == null) {
            return;
        }
        this._window = asGuarded(param3.buildFromXML(asInstanceOf(_loc6_.content, XML)), isIBorderWindow);
        if (this._window == null) {
            return;
        }
        this._window.procedure = this.eventHandler;
        this._toolbar.extensionView.attachExtension("club_gift_notification", this._window);
        this._linkText = asGuarded(this._window.findChildByName("cancel_link"), isITextWindow);
        let _loc7_: IRegionWindow = asGuarded(this._window.findChildByName("cancel_link_region"), isIRegionWindow);
        if (_loc7_) {
            _loc7_.addEventListener("WME_OVER", this.onMouseOver);
            _loc7_.addEventListener("WME_OUT", this.onMouseOut);
        }
        this.setClubIcon(13);
    }

    public get visible(): boolean {
        return !!(this._window && this._window.visible);
    }

    public get isCancelled(): boolean {
        return this._isCancelled;
    }

    public dispose(): void {
        if (this._toolbar) {
            this._toolbar.extensionView.detachExtension("club_gift_notification");
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._catalog = null;
    }

    private setImage(param1: string, param2: BitmapData): void {
        if (this._window == null) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName(param1), isIBitmapWrapperWindow);
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: BitmapData = new BitmapData(_loc3_.width, _loc3_.height, true, 0);
        let _loc5_: number = _loc4_.width * 0.5 - param2.width | 0;
        let _loc6_: number = _loc4_.height * 0.5 - param2.height | 0;
        _loc4_.draw(param2, new Matrix(2, 0, 0, 2, _loc5_, _loc6_));
        _loc3_.bitmap = _loc4_;
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "open_catalog_button":
                if (this._catalog) {
                    this._catalog.openCatalogPage("club_gifts");
                }
                this.dispose();
            default:
                return;
            case "cancel_link_region":
            case "cancel_link":
        }
        this._isCancelled = true;
        this.dispose();
    };

    private onMouseOver = (param1: WindowMouseEvent): void => {
        this._linkText.textColor = 12247545;
    };

    private onMouseOut = (param1: WindowMouseEvent): void => {
        this._linkText.textColor = 16777215;
    };

    private setClubIcon(param1: number): void {
        let _loc2_: IIconWindow = null;
        if (this._window) {
            _loc2_ = asGuarded(this._window.findChildByName("club_icon"), isIIconWindow);
            if (_loc2_) {
                _loc2_.style = param1 >>> 0;
                _loc2_.invalidate();
            }
        }
    }
}

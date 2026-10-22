import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IVideoOfferLauncher } from '@/com/sulake/habbo/catalog/IVideoOfferLauncher';
import type { HabboInventoryHabboClubEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryHabboClubEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { VideoOfferTypeEnum } from '@/com/sulake/habbo/catalog/enum/VideoOfferTypeEnum';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';

export class VideoOfferExtension implements IVideoOfferLauncher {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions::VideoOfferExtension'); }

    private static readonly _SafeStr_7913: string = "video_offer";
    private static readonly LINK_COLOR_NORMAL: number = 16777215;
    private static readonly LINK_COLOR_HIGHLIGHT: number = 12247545;
    private static readonly CLOSE_COLOR_NORMAL: number = 6710886;
    private static readonly CLOSE_COLOR_OVER: number = 13421772;

    declare private _toolbar: HabboToolbar;

    declare private _view: IWindowContainer;

    declare private _SafeStr_2918: IRegionWindow;

    declare private _SafeStr_2511: IIconWindow;

    private _SafeStr_5791: boolean = false;

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
    }

    public get window(): IWindow {
        return this._view;
    }

    public onClubChanged(param1: HabboInventoryHabboClubEvent): void {
        if (this._toolbar.inventory.clubIsExpiring && !this._view && this.isClubExtensionEnabled()) {
            this._toolbar.extensionView.detachExtension("video_offer");
            this.destroyWindow();
            return;
        }
        if (!this._SafeStr_5791 && !this._view) {
            this._toolbar.catalog.videoOffers.load(this);
        }
    }

    private isClubExtensionEnabled(): boolean {
        return this._toolbar.inventory.clubLevel == 2 && this._toolbar.getBoolean("club.membership.extend.vip.promotion.enabled");
    }

    public offersAvailable(param1: number): void {
        if (this._toolbar == null) {
            return;
        }
        if (param1 <= 0 || this._SafeStr_5791 || this._toolbar.inventory.clubIsExpiring && this.isClubExtensionEnabled()) {
            if (this._view) {
                this.destroyWindow();
            }
            return;
        }
        if (!this._view) {
            this._view = this.createWindow();
        }
    }

    private createWindow(): IWindowContainer {
        let _loc2_: string = null;
        let _loc6_: ITextWindow = null;
        let _loc7_: ITextWindow = null;
        let _loc4_: BitmapDataAsset = null;
        let _loc5_: BitmapData = null;
        let _loc8_: IBitmapWrapperWindow = null;
        let _loc1_: IWindowContainer = null;
        let _loc3_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("video_offer_promotion_xml"), XmlAsset);
        if (_loc3_) {
            _loc1_ = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML), 1), isIWindowContainer);
            if (_loc1_) {
                _loc2_ = this._toolbar.localization.getLocalization("supersaverads.video.promo.offer", "Watch a video and earn a credit!");
                _loc6_ = asGuarded(_loc1_.findChildByName("promo_text"), isITextWindow);
                _loc7_ = asGuarded(_loc1_.findChildByName("promo_text_shadow"), isITextWindow);
                if (_loc6_) {
                    _loc6_.text = _loc2_;
                }
                if (_loc7_) {
                    _loc7_.text = _loc2_;
                }
                _loc4_ = asInstanceOf(this._toolbar.assets.getAssetByName("offer_icon_png"), BitmapDataAsset);
                if (_loc4_ != null) {
                    _loc5_ = asInstanceOf(_loc4_.content, BitmapData);
                    _loc8_ = asGuarded(_loc1_.findChildByName("promo_icon"), isIBitmapWrapperWindow);
                    if (_loc5_ != null && _loc8_ != null) {
                        _loc8_.bitmap = new BitmapData(_loc8_.width, _loc8_.height, true, 0);
                        _loc8_.bitmap.copyPixels(_loc5_, _loc5_.rect, new Point(0, 0));
                    }
                }
                this._SafeStr_2918 = asGuarded(_loc1_.findChildByName("text_region"), isIRegionWindow);
                if (this._SafeStr_2918) {
                    this._SafeStr_2918.addEventListener("WME_CLICK", this.onTextRegionClicked);
                    this._SafeStr_2918.addEventListener("WME_OVER", this.onTextRegionMouseOver);
                    this._SafeStr_2918.addEventListener("WME_OUT", this.onTextRegionMouseOut);
                }
                this._SafeStr_2511 = asGuarded(_loc1_.findChildByName("promo_close_icon"), isIIconWindow);
                if (this._SafeStr_2511) {
                    this._SafeStr_2511.addEventListener("WME_CLICK", this.onCloseClicked);
                    this._SafeStr_2511.addEventListener("WME_OVER", this.onCloseMouseOver);
                    this._SafeStr_2511.addEventListener("WME_OUT", this.onCloseMouseOut);
                }
                this._toolbar.extensionView.attachExtension("video_offer", _loc1_, 10);
            }
        }
        return _loc1_;
    }

    private destroyWindow(): void {
        if (this._view) {
            if (this._SafeStr_2918) {
                this._SafeStr_2918.removeEventListener("WME_CLICK", this.onTextRegionClicked);
                this._SafeStr_2918.removeEventListener("WME_OVER", this.onTextRegionMouseOver);
                this._SafeStr_2918.removeEventListener("WME_OUT", this.onTextRegionMouseOut);
                this._SafeStr_2918 = null;
            }
            if (this._SafeStr_2511) {
                this._SafeStr_2511.removeEventListener("WME_CLICK", this.onCloseClicked);
                this._SafeStr_2511.removeEventListener("WME_OVER", this.onCloseMouseOver);
                this._SafeStr_2511.removeEventListener("WME_OUT", this.onCloseMouseOut);
                this._SafeStr_2511 = null;
            }
            this._view.dispose();
            this._view = null;
        }
    }

    public dispose(): void {
        if (this._toolbar == null) {
            return;
        }
        this._toolbar.extensionView.detachExtension("video_offer");
        this.destroyWindow();
        this._toolbar = null;
    }

    private onCloseClicked = (param1: WindowMouseEvent): void => {
        this._SafeStr_5791 = true;
        this.destroyWindow();
        this._toolbar.connection.send(new EventLogMessageComposer("SuperSaverAds", "client_action", "supersaverads.video.promo.close_clicked"));
    };

    private onCloseMouseOver = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2511) {
            this._SafeStr_2511.color = 13421772;
        }
    };

    private onCloseMouseOut = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2511) {
            this._SafeStr_2511.color = 6710886;
        }
    };

    private onTextRegionClicked = (param1: WindowMouseEvent): void => {
        if (!this._toolbar.catalog.videoOffers.launch(VideoOfferTypeEnum.CREDIT)) {
            this.destroyWindow();
        }
    };

    private onTextRegionMouseOver = (param1: WindowMouseEvent): void => {
        let _loc2_: ITextWindow = null;
        if (this._view) {
            _loc2_ = asGuarded(this._view.findChildByName("promo_text"), isITextWindow);
            _loc2_.textColor = 12247545;
        }
    };

    private onTextRegionMouseOut = (param1: WindowMouseEvent): void => {
        let _loc2_: ITextWindow = null;
        if (this._view) {
            _loc2_ = asGuarded(this._view.findChildByName("promo_text"), isITextWindow);
            _loc2_.textColor = 16777215;
        }
    };
}

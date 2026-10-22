import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboInventoryHabboClubEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryHabboClubEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIAsset } from '@/com/sulake/core/assets/IAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetHabboClubExtendOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetHabboClubExtendOfferMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';

export class ClubDiscountPromoExtension {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions::ClubDiscountPromoExtension'); }

    private static readonly _SafeStr_7913: string = "club_promo";
    private static readonly ICON_STYLE_VIP: number = 14;
    private static readonly LINK_COLOR_NORMAL: number = 16777215;
    private static readonly LINK_COLOR_HIGHLIGHT: number = 12247545;

    declare private _toolbar: HabboToolbar;

    declare private _view: IWindowContainer;

    private _disposed: boolean = false;

    declare private _SafeStr_2231: IBitmapWrapperWindow;

    declare private _SafeStr_3045: Timer;

    private _SafeStr_4338: number = 0;

    declare private _animBlockMoveAmount: number;
    static { (this.prototype as any)._animBlockMoveAmount = 0; }

    declare private _SafeStr_3166: Timer;

    declare private _SafeStr_3632: BitmapData;

    declare private _SafeStr_3129: Timer;

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
    }

    private createWindow(): IWindowContainer {
        let _loc4_: IAsset = null;
        let _loc2_: IRegionWindow = null;
        let _loc1_: IWindowContainer = null;
        let _loc3_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("club_discount_promotion_xml"), XmlAsset);
        if (_loc3_) {
            _loc1_ = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML), 1), isIWindowContainer);
            if (_loc1_) {
                this._SafeStr_2231 = asGuarded(_loc1_.findChildByName("flashing_animation"), isIBitmapWrapperWindow);
                if (this._SafeStr_2231) {
                    _loc4_ = asGuarded(this._toolbar.assets.getAssetByName("extend_hilite_png"), isIAsset);
                    if (_loc4_) {
                        this._SafeStr_3632 = asInstanceOf(_loc4_.content, BitmapData);
                        if (this._SafeStr_3632) {
                            this._SafeStr_2231.bitmap = this._SafeStr_3632.clone();
                        }
                    }
                    this._SafeStr_2231.visible = false;
                }
                _loc2_ = asGuarded(_loc1_.findChildByName("text_region"), isIRegionWindow);
                if (_loc2_) {
                    _loc2_.addEventListener("WME_CLICK", this.onTextRegionClicked);
                    _loc2_.addEventListener("WME_OVER", this.onTextRegionMouseOver);
                    _loc2_.addEventListener("WME_OUT", this.onTextRegionMouseOut);
                }
                this.assignState();
            }
        }
        return _loc1_;
    }

    private destroyWindow(): void {
        if (this._view) {
            this._view.dispose();
            this._view = null;
            this._SafeStr_2231 = null;
        }
        this.animate(false);
        this.destroyExpirationTimer();
    }

    public dispose(): void {
        if (this._disposed || !this._toolbar) {
            return;
        }
        if (this._toolbar.extensionView) {
            this._toolbar.extensionView.detachExtension("club_promo");
        }
        this.clearAnimation();
        this.destroyWindow();
        this._toolbar = null;
        this._disposed = true;
    }

    private onTextRegionClicked = (param1: WindowMouseEvent): void => {
        if (this._toolbar.inventory.clubLevel == 2) {
            this._toolbar.connection.send(new EventLogMessageComposer("DiscountPromo", "discount", "client.club.extend.discount.clicked"));
            this._toolbar.connection.send(new GetHabboClubExtendOfferMessageComposer());
        }
    };

    private assignState(): void {
        switch (this._toolbar.inventory.clubLevel) {
            case 0:
                this.setText("${discount.bar.no.club.promo}");
                this.setClubIcon(14);
                break;
            case 2:
                this.setText("${discount.bar.vip.expiring}");
                this.setClubIcon(14);
        }
        this.animate(true);
    }

    public onClubChanged(param1: HabboInventoryHabboClubEvent): void {
        if (this._toolbar.inventory.clubIsExpiring && !this._view && this.isExtensionEnabled()) {
            this._view = this.createWindow();
            if (this._SafeStr_3129 != null) {
                this.destroyExpirationTimer();
            }
            if (this._toolbar.inventory.clubMinutesUntilExpiration < 1440 && this._toolbar.inventory.clubMinutesUntilExpiration > 0) {
                this._SafeStr_3129 = new Timer(this._toolbar.inventory.clubMinutesUntilExpiration * 60 * 1000, 1);
                this._SafeStr_3129.addEventListener("timerComplete", this.onExtendOfferExpire);
                this._SafeStr_3129.start();
            }
            this.assignState();
            this._toolbar.extensionView.attachExtension("club_promo", this._view, 10);
        } else {
            this._toolbar.extensionView.detachExtension("club_promo");
            this.destroyWindow();
        }
    }

    private destroyExpirationTimer(): void {
        if (this._SafeStr_3129) {
            this._SafeStr_3129.stop();
            this._SafeStr_3129.removeEventListener("timerComplete", this.onExtendOfferExpire);
            this._SafeStr_3129 = null;
        }
    }

    private onExtendOfferExpire = (param1: TimerEvent): void => {
        this._toolbar.extensionView.detachExtension("club_promo");
        this.destroyWindow();
    };

    private isExtensionEnabled(): boolean {
        if (this._toolbar.inventory.clubLevel == 2 && this._toolbar.getBoolean("club.membership.extend.vip.promotion.enabled")) {
            return true;
        }
        return false;
    }

    private setText(param1: string): void {
        let _loc2_: ITextWindow = null;
        let _loc3_: ITextWindow = null;
        if (this._view) {
            _loc2_ = asGuarded(this._view.findChildByName("promo_text"), isITextWindow);
            _loc3_ = asGuarded(this._view.findChildByName("promo_text_shadow"), isITextWindow);
            if (_loc2_) {
                _loc2_.text = param1;
            }
            if (_loc3_) {
                _loc3_.text = param1;
            }
        }
    }

    private animate(param1: boolean): void {
        if (param1) {
            Logger.log("Animate window");
            if (this._SafeStr_3166) {
                this._SafeStr_3166.stop();
            }
            this._SafeStr_3166 = new Timer(15000);
            this._SafeStr_3166.addEventListener("timer", this.onTriggerTimer);
            this._SafeStr_3166.start();
        } else {
            if (this._SafeStr_3166) {
                this._SafeStr_3166.stop();
                this._SafeStr_3166 = null;
            }
            this.clearAnimation();
        }
    }

    private clearAnimation(): void {
        if (this._SafeStr_2231) {
            this._SafeStr_2231.visible = false;
            this._SafeStr_2231.bitmap = null;
            this._SafeStr_2231 = null;
            this._view.invalidate();
            if (this._SafeStr_3045) {
                this._SafeStr_3045.stop();
                this._SafeStr_3045 = null;
            }
        }
    }

    private onTriggerTimer = (param1: TimerEvent): void => {
        if (this._SafeStr_2231) {
            if (this._SafeStr_2231.context) {
                this._SafeStr_2231.visible = true;
                this.resetAnimationVariables();
                this.startAnimationTimer();
            }
        }
    };

    private resetAnimationVariables(): void {
        this._SafeStr_2231.x = 3;
        this._SafeStr_2231.y = 3;
        this._SafeStr_2231.bitmap = this._SafeStr_3632.clone();
        this._SafeStr_2231.height = this._view.height - 6;
        this._SafeStr_2231.width = this._SafeStr_2231.bitmap.width;
        this._SafeStr_2231.invalidate();
        this._animBlockMoveAmount = this._view.width - 7 - this._SafeStr_2231.bitmap.width;
        this._SafeStr_4338 = 0;
    }

    private startAnimationTimer(): void {
        this._SafeStr_3045 = new Timer(25, 26);
        this._SafeStr_3045.addEventListener("timer", this.onAnimationTimer);
        this._SafeStr_3045.addEventListener("timerComplete", this.onAnimationTimerComplete);
        this._SafeStr_3045.start();
    }

    private onAnimationTimer = (param1: TimerEvent): void => {
        let _loc2_: number = 0;
        let _loc3_: BitmapData = null;
        if (this._SafeStr_2231) {
            this._SafeStr_2231.x = 3 + this._SafeStr_4338 / 20 * this._animBlockMoveAmount | 0;
            if (this._SafeStr_2231.x > this._animBlockMoveAmount) {
                _loc2_ = this._view.width - 4 - this._SafeStr_2231.x;
                _loc3_ = new BitmapData(_loc2_, this._SafeStr_3632.height);
                _loc3_.copyPixels(this._SafeStr_3632, new Rectangle(0, 0, _loc2_, this._SafeStr_3632.height), new Point(0, 0));
                this._SafeStr_2231.bitmap = _loc3_;
                this._SafeStr_2231.width = _loc2_;
            }
            this._SafeStr_2231.invalidate();
            this._SafeStr_4338 = this._SafeStr_4338 + 1;
        }
    };

    private onAnimationTimerComplete = (param1: TimerEvent): void => {
        this.clearAnimation();
    };

    private setClubIcon(param1: number): void {
        let _loc2_: IIconWindow = null;
        if (this._view) {
            _loc2_ = asGuarded(this._view.findChildByName("club_icon"), isIIconWindow);
            if (_loc2_) {
                _loc2_.style = param1 >>> 0;
                _loc2_.invalidate();
            }
        }
    }

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

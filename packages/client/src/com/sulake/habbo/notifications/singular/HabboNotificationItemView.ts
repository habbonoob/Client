import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboNotificationItem } from '@/com/sulake/habbo/notifications/singular/HabboNotificationItem';
import type { BadgeImageReadyEvent } from '@/com/sulake/habbo/session/events/BadgeImageReadyEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';
import type { IProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class HabboNotificationItemView implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::HabboNotificationItemView'); }

    public static readonly MAX_HEIGHT: number = 70;
    public static readonly SIDE_MARGIN: number = 5;
    private static readonly STATE_IDLE: number = 0;
    private static readonly STATE_FADE_IN: number = 1;
    private static readonly STATE_DISPLAY: number = 2;
    private static readonly STATE_FADE_OUT: number = 3;
    private static readonly STATE_SWIPE_OUT: number = 4;

    declare private _SafeStr_2259: IHabboLocalizationManager;

    declare private _window: IWindow;

    declare private _item: HabboNotificationItem;

    private _hovering: boolean = false;

    declare private _styleConfig: UtilsMap;

    declare private _viewConfig: UtilsMap;

    declare private _SafeStr_3851: number;
    static { (this.prototype as any)._SafeStr_3851 = 0; }

    declare private _SafeStr_4132: number;
    static { (this.prototype as any)._SafeStr_4132 = 0; }

    declare private _SafeStr_3980: number;
    static { (this.prototype as any)._SafeStr_3980 = 0; }

    declare private _SafeStr_4588: number;
    static { (this.prototype as any)._SafeStr_4588 = 0; }

    declare private _margin: number;
    static { (this.prototype as any)._margin = 0; }

    declare private _blend: number;
    static { (this.prototype as any)._blend = NaN; }

    declare private _resizeMargin: number;
    static { (this.prototype as any)._resizeMargin = 0; }

    declare private _SafeStr_5812: number;
    static { (this.prototype as any)._SafeStr_5812 = 0; }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _SafeStr_6545: number;
    static { (this.prototype as any)._SafeStr_6545 = 0; }

    constructor(param1: IHabboLocalizationManager, param2: IAsset, param3: IHabboWindowManager, param4: UtilsMap, param5: UtilsMap, param6: HabboNotificationItem) {
        this._SafeStr_2259 = param1;
        this._styleConfig = param4;
        this._viewConfig = param5;
        let _loc7_: XmlAsset = param2 instanceof XmlAsset ? param2 : null;
        if (_loc7_ == null) {
            return;
        }
        this._window = param3.buildFromXML(asInstanceOf(_loc7_.content, XML), 1);
        this._window.tags.push("notificationview");
        this._window.context.getDesktopWindow().addEventListener("WE_RESIZED", this.onRoomViewResized);
        this._window.procedure = this.onWindowEvent;
        this._window.blend = 0;
        this._window.visible = false;
        let _loc8_: ITextWindow = asGuarded(castGuarded(this._window, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByTag("notification_text"), isITextWindow);
        if (_loc8_ != null) {
            this._resizeMargin = this._window.height - _loc8_.bottom;
        } else {
            this._resizeMargin = 15;
        }
        this._SafeStr_5812 = this._window.height;
        this._margin = 4;
        this._blend = 0;
        this._state = 0;
        if (param6.style.styleName == "nft_opening") {
            this.showNftOpeningNotification(param6);
        } else if (param6.style.styleName == "treasure_hunt") {
            this.showTreasureHuntNotification(param6);
        } else {
            this.showNormalNotification(param6);
        }
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    public get ready(): boolean {
        return this._state == 0;
    }

    public get verticalPosition(): number {
        return this._margin;
    }

    private showTreasureHuntNotification(param1: HabboNotificationItem): void {
        if (param1 == null) {
            return;
        }
        this._window.findChildByName("treasure_hunt_image").visible = param1.style.icon == null;
        this.showNormalNotification(param1);
    }

    private showNftOpeningNotification(param1: HabboNotificationItem): void {
        if (param1 == null) {
            return;
        }
        let _loc6_: string = param1.content;
        this.setNotificationText(_loc6_);
        let _loc2_: IProductDisplayInfo = param1.style.extraData[0];
        let _loc7_: string = stringOrNull(param1.style.extraData[1]);
        let _loc5_: number = param1.style.extraData[2] >>> 0;
        let _loc3_: IProductIconWidget = asGuarded((asGuarded(this._window.findChildByName("icon_widget"), isIWidgetWindow)).widget, isIProductIconWidget);
        _loc3_.productInfo = _loc2_;
        let _loc4_: IButtonWindow = asGuarded(this._window.findChildByName("rarity_text"), isIButtonWindow);
        _loc4_.caption = this._SafeStr_2259.getLocalization("collectibles.item.rarity") + ": " + _loc7_;
        this.reposition();
        this.startFadeIn();
    }

    private showNormalNotification(param1: HabboNotificationItem): void {
        let _loc2_: BitmapData = null;
        if (param1 == null) {
            return;
        }
        let _loc3_: string = param1.content;
        this.setNotificationText(_loc3_);
        if (param1.style.iconAssetUri == null) {
            _loc2_ = param1.style.icon;
            this.setNotificationIcon(_loc2_);
        } else {
            castGuarded(castGuarded(this._window, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByTag("notification_icon_static"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = param1.style.iconAssetUri;
        }
        this._item = param1;
        this.reposition();
        this.startFadeIn();
    }

    public replaceIcon(param1: BadgeImageReadyEvent): void {
        if (param1.badgeId != this._item.style.iconSrc) {
            return;
        }
        if (param1.badgeImage != null) {
            this.setNotificationIcon(param1.badgeImage);
        }
    }

    public update(param1: number): void {
        let _loc3_: number = NaN;
        let _loc4_: number = NaN;
        let _loc2_: number = NaN;
        switch (this._state) {
            case 1:
                this._SafeStr_3851 += param1;
                _loc3_ = this._SafeStr_3851 / Number(this._viewConfig["time_fade_in"]);
                if (this._SafeStr_3851 > (this._viewConfig["time_fade_in"] | 0)) {
                    this.startDisplay();
                }
                this.adjustBlend(_loc3_);
                break;
            case 2:
                this._SafeStr_4588 += param1;
                if (this._SafeStr_4588 > (this._viewConfig["time_display"] | 0) && !this._hovering) {
                    this.startFadeOut();
                }
                break;
            case 3:
                this._SafeStr_4132 += param1;
                _loc4_ = 1 - this._SafeStr_4132 / Number(this._viewConfig["time_fade_out"]);
                this.adjustBlend(_loc4_);
                if (this._SafeStr_4132 > (this._viewConfig["time_fade_out"] | 0)) {
                    this.startIdling();
                }
                break;
            case 4:
                this._SafeStr_3980 += param1;
                _loc2_ = this._SafeStr_3980 / Number(this._viewConfig["time_swipe_out"]);
                this.adjustSwipeOut(_loc2_);
                if (this._SafeStr_3980 > (this._viewConfig["time_swipe_out"] | 0)) {
                    this.startIdling();
                }
        }
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._item != null) {
            this._item.dispose();
            this._item = null;
        }
    }

    private setNotificationText(param1: string): void {
        let _loc2_: ITextWindow = asGuarded(castGuarded(this._window, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByTag("notification_text"), isITextWindow);
        if (_loc2_ == null || param1 == null) {
            return;
        }
        this._window.height = 0;
        _loc2_.text = param1;
        _loc2_.height = _loc2_.textHeight + this._resizeMargin | 0;
        if (this._window.height < this._SafeStr_5812) {
            this._window.height = this._SafeStr_5812;
        }
    }

    private setNotificationIcon(param1: BitmapData): void {
        let _loc6_: BitmapData = null;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: IBitmapWrapperWindow = asGuarded(castGuarded(this._window, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByTag("notification_icon"), isIBitmapWrapperWindow);
        if (_loc4_ == null) {
            return;
        }
        if (param1 == null) {
            _loc4_.bitmap = null;
            return;
        }
        if (param1.width < _loc4_.width && param1.height < _loc4_.height) {
            _loc6_ = new BitmapData(_loc4_.width, _loc4_.height, true, 0);
            _loc2_ = (_loc4_.width - param1.width) / 2 | 0;
            _loc3_ = (_loc4_.height - param1.height) / 2 | 0;
            _loc6_.copyPixels(param1, param1.rect, new Point(_loc2_, _loc3_));
        } else if (param1.width < param1.height) {
            _loc6_ = new BitmapData(param1.height, param1.height, true, 0);
            _loc5_ = (param1.height - param1.width) / 2 | 0;
            _loc6_.copyPixels(param1, param1.rect, new Point(_loc5_, 0));
        } else if (param1.width > param1.height) {
            _loc6_ = new BitmapData(param1.width, param1.width, true, 0);
            _loc5_ = (param1.width - param1.height) / 2 | 0;
            _loc6_.copyPixels(param1, param1.rect, new Point(0, _loc5_));
        } else {
            _loc6_ = new BitmapData(param1.width, param1.height);
            _loc6_.copyPixels(param1, param1.rect, new Point(0, 0));
        }
        _loc4_.bitmap = _loc6_;
    }

    private startFadeIn(): void {
        this._SafeStr_3851 = 0;
        this._state = 1;
        this._window.visible = true;
    }

    private startFadeOut(): void {
        this._SafeStr_4132 = 0;
        this._state = 3;
    }

    private startSwipeOut(): void {
        this._SafeStr_3980 = 0;
        this._state = 4;
    }

    private startDisplay(): void {
        this._SafeStr_4588 = 0;
        this._state = 2;
    }

    private startIdling(): void {
        this._state = 0;
        this._window.visible = false;
    }

    public reposition(param1: number = -1): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: IDesktopWindow = this._window.context.getDesktopWindow();
        if (_loc2_ == null) {
            return;
        }
        if (param1 != -1) {
            this._margin = param1;
        }
        this._window.x = _loc2_.width - this._window.width - 5;
        this._window.y = this._margin;
        this._SafeStr_6545 = this._window.x;
    }

    public onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1 == null) {
            return;
        }
        if (param1.type == "WME_CLICK" && param1.target.tags.indexOf("slide_notification_away") != -1) {
            this.startSwipeOut();
            return;
        }
        if (param1.type == "WME_OVER") {
            this._hovering = true;
        } else if (param1.type == "WME_OUT") {
            this._hovering = false;
        } else if (param1.type == "WME_CLICK") {
            if (this._item != null) {
                this._item.ExecuteUiLinks();
                this.startFadeOut();
            }
        }
    };

    private onRoomViewResized = (param1: WindowEvent): void => {
        this.reposition();
    };

    private adjustBlend(param1: number): void {
        this._blend = param1;
        if (this._blend > 1) {
            this._blend = 1;
        }
        if (this._blend < 0) {
            this._blend = 0;
        }
        this._window.blend = this._blend;
    }

    private adjustSwipeOut(param1: number): void {
        this._window.x = this._SafeStr_6545 + param1 * this._viewConfig["distance_swipe_out"] | 0;
    }

    public get height(): number {
        return this._viewConfig["height"] | 0;
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}

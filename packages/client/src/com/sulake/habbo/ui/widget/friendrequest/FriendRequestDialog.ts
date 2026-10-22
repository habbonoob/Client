import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FriendRequestWidget } from '@/com/sulake/habbo/ui/widget/friendrequest/FriendRequestWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class FriendRequestDialog {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.friendrequest::FriendRequestDialog'); }

    constructor(param1: FriendRequestWidget, param2: number, param3: number, param4: string) {
        this._widget = param1;
        this._requestId = param2;
        this._userId = param3;
        this._userName = param4;
    }

    declare private _window: IWindowContainer;

    declare private _widget: FriendRequestWidget;

    declare private _requestId: number;
    static { (this.prototype as any)._requestId = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    private _SafeStr_2283: boolean = false;
    private _SafeStr_4837: boolean = false;
    private _SafeStr_4959: boolean = false;

    public get userId(): number {
        return this._userId;
    }

    public set targetRect(param1: Rectangle) {
        let _loc4_: Point = null;
        if (!param1) {
            this._widget.ignoreRequest(this._requestId);
            return;
        }
        if (this._SafeStr_2283 || this._SafeStr_4837) {
            return;
        }
        let _loc2_: boolean = true;
        if (!this._window) {
            this.createWindow();
            _loc2_ = false;
        }
        if (!this._window) {
            return;
        }
        let _loc5_: Point = new Point(param1.left + param1.width / 2 - this._window.width / 2, param1.top - this._window.height + 10);
        let _loc3_: number = Point.distance(this._window.position, _loc5_);
        if (_loc2_ && _loc3_ > 5) {
            _loc4_ = Point.interpolate(this._window.position, _loc5_, 0.5);
            this._window.x = _loc4_.x | 0;
            this._window.y = _loc4_.y | 0;
        } else {
            this._window.x = _loc5_.x | 0;
            this._window.y = _loc5_.y | 0;
        }
        if (!this._window.visible) {
            this.show();
        }
        if (this._SafeStr_4959) {
            this.show();
            this._SafeStr_4959 = false;
        }
    }

    public dispose(): void {
        this._widget = null;
        if (this._window) {
            this._window.dispose();
        }
        this._window = null;
    }

    public setImageAsset(param1: IBitmapWrapperWindow, param2: string): void {
        if (!param1 || !this._widget || !this._widget.assets) {
            return;
        }
        let _loc4_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName(param2), BitmapDataAsset);
        if (!_loc4_) {
            return;
        }
        let _loc3_: BitmapData = asInstanceOf(_loc4_.content, BitmapData);
        if (!_loc3_) {
            return;
        }
        if (param1.bitmap) {
            param1.bitmap.dispose();
        }
        param1.bitmap = new BitmapData(param1.width, param1.height, true, 0);
        param1.bitmap.draw(_loc3_);
    }

    public show(): void {
        if (this._window != null) {
            this._window.visible = true;
            this._window.activate();
        }
    }

    private addMouseClickListener(param1: IWindow, param2: (...args: any[]) => any): void {
        if (param1 != null) {
            param1.setParamFlag(1, true);
            param1.addEventListener("WME_CLICK", param2);
        }
    }

    private createWindow(): void {
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        let _loc3_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("instant_friend_request"), XmlAsset);
        if (!_loc3_) {
            return;
        }
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML), 0), isIWindowContainer);
        if (!this._window) {
            return;
        }
        this._window.addEventListener("WE_DEACTIVATED", this.onDeactivated);
        let _loc6_: IRegionWindow = asGuarded(this._window.findChildByName("profile_region"), isIRegionWindow);
        if (_loc6_) {
            _loc6_.procedure = this.onProfile;
            _loc6_.toolTipCaption = this._widget.localizations.getLocalization("infostand.profile.link.tooltip", "");
            _loc6_.toolTipDelay = 100;
        }
        let _loc4_: ITextWindow = asGuarded(this._window.findChildByName("text"), isITextWindow);
        if (_loc4_) {
            _loc4_.text = this._widget.localizations.registerParameter("widget.friendrequest.from", "username", this._userName);
        }
        let _loc7_: IWindow = this._window.findChildByName("accept_button");
        this.addMouseClickListener(_loc7_, this.onAccept);
        let _loc5_: IWindow = this._window.findChildByName("decline_button");
        this.addMouseClickListener(_loc5_, this.onDecline);
        let _loc2_: IWindow = this._window.findChildByName("close_button");
        this.addMouseClickListener(_loc2_, this.onClose);
        let _loc1_: IIconWindow = asGuarded(this._window.findChildByName("profile_icon"), isIIconWindow);
        _loc1_.procedure = this.onProfileIcon;
        this._window.procedure = this.windowEventHandler;
        this._window.visible = false;
    }

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (!param1) {
            return;
        }
        switch (param1.type) {
            case "WME_OVER":
                this._SafeStr_2283 = true;
                break;
            case "WME_OUT":
                this._SafeStr_2283 = false;
                break;
            case "WME_DOWN":
                this._SafeStr_4837 = true;
                break;
            case "WME_UP":
            case "WME_UP_OUTSIDE":
                this._SafeStr_4837 = false;
        }
    };

    private onDeactivated = (param1: WindowEvent): void => {
        this._SafeStr_4959 = true;
    };

    private onClose = (param1: WindowMouseEvent): void => {
        if (this._widget != null) {
            this._widget.ignoreRequest(this._requestId);
        }
    };

    private onAccept = (param1: WindowMouseEvent): void => {
        if (this._widget != null) {
            this._widget.acceptRequest(this._requestId);
        }
    };

    private onDecline = (param1: WindowMouseEvent): void => {
        if (this._widget != null) {
            this._widget.declineRequest(this._requestId);
        }
    };

    private onProfile = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ITextWindow = null;
        if (param1.type == "WME_CLICK") {
            this._widget.showProfile(this._userId, "instantFriendRequest_name");
        }
        if (param1.type == "WME_OVER") {
            _loc3_ = asGuarded(this._window.findChildByName("text"), isITextWindow);
            _loc3_.underline = true;
        }
        if (param1.type == "WME_OUT") {
            _loc3_ = asGuarded(this._window.findChildByName("text"), isITextWindow);
            _loc3_.underline = false;
        }
    };

    private onProfileIcon = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: IIconWindow = null;
        if (param1.type == "WME_CLICK") {
            this._widget.showProfile(this._userId, "instantFriendRequest_icon");
        }
        if (param1.type == "WME_OVER") {
            _loc3_ = asGuarded(this._window.findChildByName("profile_icon"), isIIconWindow);
            _loc3_.style = 22;
            _loc3_.invalidate();
        }
        if (param1.type == "WME_OUT") {
            _loc3_ = asGuarded(this._window.findChildByName("profile_icon"), isIIconWindow);
            _loc3_.style = 21;
            _loc3_.invalidate();
        }
    };
}

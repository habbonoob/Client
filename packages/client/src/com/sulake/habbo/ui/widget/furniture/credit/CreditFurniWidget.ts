import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetCreditFurniUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetCreditFurniUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetCreditFurniRedeemMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetCreditFurniRedeemMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class CreditFurniWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.credit::CreditFurniWidget'); }

    private static readonly _SafeStr_7717: number = 100;
    private static readonly _SafeStr_8215: number = 100;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        super(param1, param2, param3, param4);
    }

    declare private _window: IWindowContainer;

    private _SafeStr_4062: number = -1;

    declare private _SafeStr_5002: number;
    static { (this.prototype as any)._SafeStr_5002 = NaN; }

    declare private _isNftCredit: boolean;
    static { (this.prototype as any)._isNftCredit = false; }

    public override dispose(): void {
        this.hideInterface();
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWCFUE_CREDIT_FURNI_UPDATE", this.onObjectUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWCFUE_CREDIT_FURNI_UPDATE", this.onObjectUpdate);
    }

    private showInterface(): void {
        let _loc2_: IWindow = null;
        if (this._SafeStr_4062 == -1) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        let _loc4_: string = this._isNftCredit ? "nft.creditfurni.redeem.description" : "widgets.furniture.credit.redeem.value";
        let _loc5_: string = this.localizations.getLocalizationWithParams(_loc4_, "", "value", String(this._SafeStr_5002));
        let _loc3_: string = this.localizations.getLocalization("nft.creditfurni.redeem.prompt");
        let _loc6_: IAsset = this.assets.getAssetByName("credit_redeem");
        let _loc1_: XmlAsset = castTo(_loc6_, XmlAsset);
        if (_loc1_ == null) {
            return;
        }
        this._window = asGuarded(this.windowManager.createWindow("creditfurniui_container", "", 4, 0, (0x020000 | 1) >>> 0, new Rectangle(100, 100, 2, 2), null, 0), isIWindowContainer);
        this._window.buildFromXML(XML.from(_loc1_.content));
        this._window.background = true;
        this._window.color = 33554431;
        _loc2_ = this._window.findChildByName("exchange_text");
        if (_loc2_ != null) {
            _loc2_.caption = this._isNftCredit ? _loc5_ + " " + _loc3_ : _loc5_;
        }
        _loc2_ = this._window.findChildByName("cancel");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        _loc2_ = this._window.findChildByName("exchange");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        _loc2_ = this._window.findChildByName("link");
        if (_loc2_ != null) {
            _loc2_.visible = !this._isNftCredit;
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        _loc2_ = this._window.findChildByTag("close");
        if (_loc2_ != null) {
            _loc2_.procedure = this.onWindowClose;
        }
        this._window.addEventListener("WME_CLICK", this.onMouseEvent);
    }

    private hideInterface(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._SafeStr_4062 = -1;
        this._SafeStr_5002 = 0;
    }

    private sendRedeemMessage(): void {
        let _loc1_: RoomWidgetCreditFurniRedeemMessage = null;
        if (this._SafeStr_4062 == -1) {
            return;
        }
        if (this.messageListener != null) {
            _loc1_ = new RoomWidgetCreditFurniRedeemMessage("RWFCRM_REDEEM", this._SafeStr_4062);
            this.messageListener.processWidgetMessage(_loc1_);
            this.hideInterface();
        }
    }

    private onMouseEvent = (param1: WindowMouseEvent): void => {
        let _loc4_: string = null;
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        switch (_loc3_) {
            case "link":
                _loc4_ = this.localizations.getLocalization("widget.furni.info.url");
                if (_loc4_.indexOf("http") == 0) {
                    HabboWebTools.navigateToURL(_loc4_, "habboMain");
                }
                break;
            case "exchange":
                this.sendRedeemMessage();
                break;
            case "cancel":
            case "close":
                this.hideInterface();
        }
    };

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hideInterface();
    };

    private onObjectUpdate = (param1: RoomWidgetCreditFurniUpdateEvent): void => {
        this.hideInterface();
        this._SafeStr_4062 = param1.objectId;
        this._SafeStr_5002 = param1.creditValue;
        this._isNftCredit = param1.isNftCredit;
        this.showInterface();
    };
}

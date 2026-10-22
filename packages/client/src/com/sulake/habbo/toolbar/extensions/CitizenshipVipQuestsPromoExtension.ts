import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { IExtensionView } from '@/com/sulake/habbo/toolbar/IExtensionView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { CitizenshipVipOfferPromoEnabledEvent } from '@/com/sulake/habbo/communication/messages/incoming/perk/CitizenshipVipOfferPromoEnabledEvent';
import { StartCampaignMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/StartCampaignMessageComposer';

export class CitizenshipVipQuestsPromoExtension {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions::CitizenshipVipQuestsPromoExtension'); }

    constructor(param1: HabboToolbar, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IEventDispatcher, param5: ICoreLocalizationManager, param6: IConnection) {
        this._windowManager = param2;
        this._assets = param3;
        this._events = param4;
        this._localization = param5;
        this._connection = param6;
        this._extensionView = param1.extensionView;
        this._SafeStr_4115 = new CitizenshipVipOfferPromoEnabledEvent(this.onCitizenshipQuestPromoEnabled);
        this._connection.addMessageEvent(this._SafeStr_4115);
        this._vipQuestsCampaignName = param1.getProperty("citizenship.vip.tutorial.quest.campaign.name");
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _events: IEventDispatcher;

    declare private _localization: ICoreLocalizationManager;

    declare private _connection: IConnection;

    declare private _extensionView: IExtensionView;

    declare private _view: IBorderWindow;

    private _disposed: boolean = false;
    private _expanded: boolean = true;
    private _SafeStr_6265: number = 216;

    declare private _vipQuestsCampaignName: string;

    private _SafeStr_4115: IMessageEvent = null;

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._connection && this._SafeStr_4115) {
            this._connection.removeMessageEvent(this._SafeStr_4115);
            this._SafeStr_4115 = null;
        }
        this.destroyWindow();
        this._localization = null;
        this._assets = null;
        this._events = null;
        this._windowManager = null;
        this._connection = null;
        this._extensionView = null;
        this._disposed = true;
    }

    private createWindow(): IBorderWindow {
        let _loc1_: IBorderWindow = null;
        let _loc2_: IAsset = this._assets.getAssetByName("vip_quests_promo_xml");
        if (_loc2_) {
            _loc1_ = asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML), 1), isIBorderWindow);
            if (_loc1_) {
                castGuarded(_loc1_.findChildByName("quests_button").addEventListener("WME_CLICK", this.onButtonClicked), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
                castGuarded(_loc1_.findChildByName("minimize_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").addEventListener("WME_CLICK", this.onMinMax);
                castGuarded(_loc1_.findChildByName("maximize_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").addEventListener("WME_CLICK", this.onMinMax);
                this._SafeStr_6265 = _loc1_.height;
            }
        }
        return _loc1_;
    }

    private destroyWindow(): void {
        if (this._extensionView) {
            this._extensionView.detachExtension("vip_quests");
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        if (this._connection) {
            this._connection.send(new StartCampaignMessageComposer(this._vipQuestsCampaignName));
        }
        this.destroyWindow();
    };

    private onMinMax = (param1: WindowMouseEvent): void => {
        this._expanded = !this._expanded;
        this.assignState();
    };

    private assignState(): void {
        castGuarded(this._view.findChildByName("content_itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").visible = this._expanded;
        castGuarded(this._view.findChildByName("promo_img"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").visible = this._expanded;
        this._view.height = this._expanded ? this._SafeStr_6265 : 33;
    }

    private onCitizenshipQuestPromoEnabled = (param1: IMessageEvent): void => {
        if (this._view == null) {
            this._view = this.createWindow();
        }
        this.assignState();
        this._extensionView.detachExtension("club_promo");
        this._extensionView.attachExtension("vip_quests", this._view, 10);
    };
}

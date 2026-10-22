import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TalentLevelUpMessageParser } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentLevelUpMessageParser';
import type { TalentTrackRewardPerk } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackRewardPerk';
import type { TalentTrackRewardProduct } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackRewardProduct';
import type { HabboTalent } from '@/com/sulake/habbo/friendbar/talent/HabboTalent';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TalentLevelUpMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/talent/TalentLevelUpMessageEvent';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class TalentLevelUpController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.talent::TalentLevelUpController'); }

    declare private _habboTalent: HabboTalent;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _window: IWindowContainer;

    declare private _SafeStr_5628: string;

    declare private _SafeStr_3860: IWindow;

    declare private _SafeStr_4010: IWindow;

    declare private _SafeStr_3924: IWindow;

    constructor(param1: HabboTalent) {
        this._habboTalent = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_3924 != null) {
                this._SafeStr_3924.dispose();
                this._SafeStr_3924 = null;
            }
            if (this._SafeStr_3860 != null) {
                this._SafeStr_3860.dispose();
                this._SafeStr_3860 = null;
            }
            if (this._SafeStr_4010 != null) {
                this._SafeStr_4010.dispose();
                this._SafeStr_4010 = null;
            }
            this.closeWindow();
            this._habboTalent = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public initialize(): void {
        this._habboTalent.communicationManager.addHabboConnectionMessageEvent(new TalentLevelUpMessageEvent(this.onTalentLevelUp));
    }

    private onTalentLevelUp = (param1: TalentLevelUpMessageEvent): void => {
        let _loc2_: TalentLevelUpMessageParser = param1.getParser();
        if (_loc2_.level == 1 && _loc2_.talentTrackName == "helper" && this._habboTalent.citizenshipEnabled) {
            return;
        }
        this.showWindow(_loc2_.talentTrackName, _loc2_.level, _loc2_.rewardPerks, _loc2_.rewardProducts);
    };

    public showWindow(param1: string, param2: number, param3: TalentTrackRewardPerk[], param4: TalentTrackRewardProduct[]): void {
        this.closeWindow();
        this._SafeStr_5628 = param1;
        this._window = asGuarded(this._habboTalent.getXmlWindow("level_up"), isIWindowContainer);
        this._window.center();
        this._window.procedure = this.onWindowEvent;
        castGuarded(this._window.findChildByName("level_decoration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}talent/" + param1 + "_levelup_" + param2 + ".png";
        this._window.findChildByName("level_up_message").caption = "${talent.track." + param1 + ".levelup.message}";
        this._window.findChildByName("level_title").caption = "${talent.track." + param1 + ".level." + param2 + ".title}";
        this._window.findChildByName("level_description").caption = "${talent.track." + param1 + ".level." + param2 + ".description}";
        let _loc8_: IItemListWindow = castGuarded(this._window.findChildByName("reward_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc6_: IWindow = _loc8_.removeListItem(_loc8_.getListItemByName("plus_template"));
        this._SafeStr_3860 = _loc8_.removeListItem(_loc8_.getListItemByName("reward_product_template"));
        this._SafeStr_4010 = _loc8_.removeListItem(_loc8_.getListItemByName("reward_vip_template"));
        this._SafeStr_3924 = _loc8_.removeListItem(_loc8_.getListItemByName("reward_perk_template"));
        let _loc7_: boolean = false;
        for (const _loc5_ of param3 ?? []) {
            if (_loc7_) {
                _loc8_.addListItem(_loc6_.clone());
            }
            _loc8_.addListItem(this.createRewardPerk(_loc5_));
            _loc7_ = true;
        }
        for (const _loc9_ of param4 ?? []) {
            if (_loc7_) {
                _loc8_.addListItem(_loc6_.clone());
            }
            _loc8_.addListItem(this.createRewardProduct(_loc9_));
            _loc7_ = true;
        }
        if (_loc8_.numListItems < 1) {
            this._window.findChildByName("level_rewards").visible = false;
            castGuarded(this._window.findChildByName("level_up_layout"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
        }
    }

    private createRewardPerk(param1: TalentTrackRewardPerk): IWindow {
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_3924.clone(), isIWindowContainer);
        castGuarded(castGuarded(_loc2_.findChildByName("perk_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = param1.perkId;
        _loc2_.findChildByName("perk_name").caption = "${perk." + param1.perkId + ".name}";
        return _loc2_;
    }

    private createRewardProduct(param1: TalentTrackRewardProduct): IWindow {
        let _loc2_: IWindow = null;
        if (param1.vipDays == 0) {
            _loc2_ = this._SafeStr_3860.clone();
            castGuarded(_loc2_, isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}talent/reward_product_" + param1.productCode.toLowerCase().replace(" ", "_") + ".png";
        } else {
            _loc2_ = this._SafeStr_4010.clone();
            castGuarded(_loc2_, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("vip_length").caption = this._habboTalent.localizationManager.getLocalizationWithParams("catalog.vip.item.header.days", "", "num_days", param1.vipDays);
        }
        return _loc2_;
    }

    private closeWindow(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this._window == null || Boolean(this._window.disposed) || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "close_button":
                this.closeWindow();
                break;
            case "talent_button":
                this.closeWindow();
                this._habboTalent.tracking.trackTalentTrackOpen(this._SafeStr_5628, "levelup");
                this._habboTalent.send(new GetTalentTrackMessageComposer(this._SafeStr_5628));
        }
    };

    get [IDisposable](): true {
        return true;
    }
}

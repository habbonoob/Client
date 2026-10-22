import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { CustomUserNotificationWidgetHandler } from '@/com/sulake/habbo/ui/handler/CustomUserNotificationWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class CustomUserNotificationWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.requirementsmissing::CustomUserNotificationWidget'); }

    public static readonly TYPE_VIPHOPPER: string = "viphopper";
    public static readonly _SafeStr_7926: string = "vipgate";
    public static readonly TYPE_COSTUMEHOPPER: string = "costumehopper";
    public static readonly TYPE_RESPECT_VOTE_FAILED_NO_STAGE: string = "respectfailedstage";
    public static readonly _SafeStr_7882: string = "respectfailedaudience";

    declare private _window: IFrameWindow;

    declare private _SafeStr_2803: CustomUserNotificationWidgetHandler;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_2803 = castTo(param1, CustomUserNotificationWidgetHandler);
        this._SafeStr_2803.widget = this;
    }

    public open(param1: string = ""): void {
        if (!this._window) {
            switch (param1) {
                case "viphopper":
                    this.buildWindow("viprequired_xml");
                    this.setVipRequiredSpecificLocalization("viphopper");
                    break;
                case "vipgate":
                    this.buildWindow("viprequired_xml");
                    this.setVipRequiredSpecificLocalization("gate");
                    break;
                case "costumehopper":
                    this.buildWindow("costumehopper_costumerequired_xml");
                    break;
                case "respectfailedstage":
                    this.buildWindow("respect_giving_failed_notification_xml");
                    this.setText("stage");
                    this.setBitmapUrl("stage");
                    break;
                case "respectfailedaudience":
                    this.buildWindow("respect_giving_failed_notification_xml");
                    this.setText("audience");
                    this.setBitmapUrl("audience");
            }
            this._window.center();
            this._window.procedure = this.eventProc;
        }
    }

    private buildWindow(param1: string): void {
        this._window = castGuarded(this.windowManager.buildFromXML(XML.from(this.assets.getAssetByName(param1).content)), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
    }

    private setVipRequiredSpecificLocalization(param1: string): void {
        this._window.findChildByName("title").caption = "${" + param1 + ".viprequired.title}";
        this._window.findChildByName("bodytext").caption = "${" + param1 + ".viprequired.bodytext}";
    }

    private setText(param1: string): void {
        let _loc4_: string = "respect.giving.failed.no." + param1;
        let _loc2_: string = this._SafeStr_2803.container.localization.getLocalization(_loc4_);
        let _loc3_: string = this._SafeStr_2803.container.config.getProperty("respect.talent.show.min.audience");
        if (_loc3_) {
            _loc2_ = _loc2_.replace("%users%", _loc3_);
        }
        this._window.findChildByName("body_txt").caption = _loc2_;
    }

    private setBitmapUrl(param1: string): void {
        let _loc3_: string = "${image.library.url}notifications/habbo_talent_show_" + param1 + ".png";
        let _loc2_: IStaticBitmapWrapperWindow = asGuarded(this._window.content.getChildByName("respectFailedNotificationBitmap"), isIStaticBitmapWrapperWindow);
        _loc2_.assetUri = _loc3_;
    }

    public close(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    private eventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: any[] = null;
        let _loc5_: boolean = false;
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "buy_vip":
                    if (this._SafeStr_2803 != null && this._SafeStr_2803.container != null) {
                        this._SafeStr_2803.container.catalog.openClubCenter();
                    }
                    this.close();
                    break;
                case "vip_benefits":
                    this._SafeStr_2803.container.catalog.showVipBenefits();
                    break;
                case "buy_costumes":
                    _loc4_ = this._SafeStr_2803.container.inventory.getAvatarEffects();
                    _loc5_ = false;
                    for (const _loc3_ of _loc4_ ?? []) {
                        if (_loc3_.subType == 1) {
                            _loc5_ = true;
                            break;
                        }
                    }
                    if (_loc5_) {
                        this._SafeStr_2803.container.avatarEditor.openEditor(0, null, null, true, null, "effects");
                        this._SafeStr_2803.container.avatarEditor.loadOwnAvatarInEditor(0);
                    } else {
                        this._SafeStr_2803.container.catalog.openCatalogPage("costumes");
                    }
                    this.close();
                    break;
                case "close":
                    this.close();
            }
            if (param2.tags.indexOf("close") != -1) {
                this.close();
            }
        }
    };
}

import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class NotificationPopup implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.notifications::NotificationPopup'); }

    declare private _notifications: HabboNotifications;

    declare private _SafeStr_2492: IModalDialog;

    declare private _type: string;

    declare private _parameters: UtilsMap;

    constructor(param1: HabboNotifications, param2: string, param3: UtilsMap) {
        let _loc7_: IWindow = null;
        let _loc8_: IWindow = null;
        this._notifications = param1;
        this._type = param2;
        this._parameters = param3;
        let _loc10_: string = this.getNotificationPart("title", true);
        let _loc11_: string = this.getNotificationPart("message", true).replace(/\\r/g, "\r");
        let _loc6_: string = this.getNotificationPart("linkUrl", false);
        let _loc4_: any = null;
        let _loc5_: boolean = _loc6_ != null && _loc6_.substr(0, 6) == "event:";
        if (_loc6_ != null) {
            _loc4_ = this.getNotificationPart("linkTitle", false);
            if (_loc4_ == null) {
                _loc4_ = _loc6_;
            }
        }
        let _loc12_: IAsset = this._notifications.assets.getAssetByName("layout_notification_popup_xml");
        this._SafeStr_2492 = this._notifications.windowManager.buildModalDialogFromXML(asInstanceOf(_loc12_.content, XML));
        let _loc9_: IWindowContainer = asGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer);
        _loc9_.procedure = this.windowProcedure;
        _loc9_.caption = _loc10_;
        if (_loc6_ != null) {
            if (_loc5_) {
                _loc7_ = _loc9_.findChildByName("action");
                _loc7_.visible = true;
                _loc7_.caption = stringOrNull(_loc4_);
            } else {
                _loc8_ = _loc9_.findChildByName("link");
                _loc8_.visible = true;
                _loc8_.caption = stringOrNull(_loc4_);
            }
        }
        _loc9_.findChildByName("message").caption = _loc11_;
        castGuarded(_loc9_.findChildByName("illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._notifications.getNotificationImageUrl(param3, param2);
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_2492.dispose();
        this._SafeStr_2492 = null;
        this._notifications = null;
        this._type = null;
        this._parameters = null;
    }

    public get disposed(): boolean {
        return this._SafeStr_2492 == null;
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed) {
            return;
        }
        switch (param1.type) {
            case "WME_CLICK":
                switch (param2.name) {
                    case "header_button_close":
                        this.dispose();
                        break;
                    case "action":
                        this._notifications.createLinkEvent(this.getNotificationPart("linkUrl", false).substr(6));
                        this.dispose();
                        break;
                    case "link":
                        HabboWebTools.openWebPage(this.getNotificationPart("linkUrl", false), "habboMain");
                }
                break;
            case "WE_RESIZED":
                if (param2.name == "illustration") {
                    param2.parent.limits.minHeight = param2.height;
                }
        }
    };

    private getNotificationPart(param1: string, param2: boolean): string {
        return this._notifications.getNotificationPart(this._parameters, this._type, param1, param2);
    }

    get [IDisposable](): true {
        return true;
    }
}

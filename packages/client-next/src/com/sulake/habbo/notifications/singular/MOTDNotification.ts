import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class MOTDNotification {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::MOTDNotification'); }

    declare private _window: IFrameWindow;

    declare private _SafeStr_2259: IHabboLocalizationManager;

    declare private _messages: any[];

    private readonly LIST_ITEM_HEIGHT_MARGIN: number = 20;

    constructor(param1: any[], param2: IAssetLibrary, param3: IHabboWindowManager) {
        let _loc9_: any = null;
        let _loc8_: IWindowContainer = null;
        let _loc7_: ITextWindow = null;
        if (!param3 || !param2) {
            return;
        }
        this._messages = param1;
        let _loc6_: XmlAsset = asInstanceOf(param2.getAssetByName("motd_notification_xml"), XmlAsset);
        if (_loc6_ == null) {
            return;
        }
        this._window = asGuarded(param3.buildFromXML(asInstanceOf(_loc6_.content, XML)), isIFrameWindow);
        if (this._window == null) {
            return;
        }
        this._window.procedure = this.eventHandler;
        this._window.center();
        let _loc5_: XmlAsset = asInstanceOf(param2.getAssetByName("motd_notification_item_xml"), XmlAsset);
        if (_loc5_ == null) {
            return;
        }
        let _loc4_: IWindowContainer = asGuarded(param3.buildFromXML(asInstanceOf(_loc5_.content, XML)), isIWindowContainer);
        let _loc10_: IItemListWindow = asGuarded(this._window.findChildByName("message_list"), isIItemListWindow);
        for (_loc9_ of this._messages ?? []) {
            _loc8_ = asGuarded(_loc4_.clone(), isIWindowContainer);
            _loc7_ = asGuarded(_loc8_.findChildByName("message_text"), isITextWindow);
            _loc7_.text = stringOrNull(_loc9_);
            _loc8_.height = _loc7_.textHeight + 20 | 0;
            _loc10_.addListItem(_loc8_);
        }
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._SafeStr_2259 = null;
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "close":
            case "header_button_close":
                break;
            default:
                return;
        }
        this.dispose();
    };
}

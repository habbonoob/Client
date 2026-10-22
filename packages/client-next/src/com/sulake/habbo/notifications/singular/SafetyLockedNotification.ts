import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class SafetyLockedNotification {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::SafetyLockedNotification'); }

    private static readonly TOOLBAR_EXTENSION_ID: string = "safety_locked_notification";
    private static readonly LINK_COLOR_NORMAL: number = 16777215;
    private static readonly LINK_COLOR_HIGHLIGHT: number = 12247545;

    declare private _window: IBorderWindow;

    declare private _catalog: IHabboCatalog;

    declare private _toolbar: IHabboToolbar;

    declare private _SafeStr_3819: ITextWindow;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    constructor(param1: number, param2: IAssetLibrary, param3: IHabboWindowManager, param4: IHabboCatalog, param5: IHabboToolbar) {
        if (!param2 || !param3 || !param4) {
            return;
        }
        this._catalog = param4;
        this._toolbar = param5;
        this._userId = param1;
        let _loc6_: XmlAsset = asInstanceOf(param2.getAssetByName("safety_locked_notification_xml"), XmlAsset);
        if (_loc6_ == null) {
            return;
        }
        this._window = asGuarded(param3.buildFromXML(asInstanceOf(_loc6_.content, XML)), isIBorderWindow);
        if (this._window == null) {
            return;
        }
        this._window.procedure = this.eventHandler;
        this._toolbar.extensionView.attachExtension("safety_locked_notification", this._window);
        this._SafeStr_3819 = asGuarded(this._window.findChildByName("unlock_link"), isITextWindow);
        let _loc7_: IRegionWindow = asGuarded(this._window.findChildByName("unlock_link_region"), isIRegionWindow);
        if (_loc7_) {
            _loc7_.addEventListener("WME_OVER", this.onMouseOver);
            _loc7_.addEventListener("WME_OUT", this.onMouseOut);
        }
    }

    public get visible(): boolean {
        return !!(this._window && this._window.visible);
    }

    public dispose(): void {
        if (this._toolbar) {
            this._toolbar.extensionView.detachExtension("safety_locked_notification");
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._catalog = null;
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = null;
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "unlock_link_region":
            case "unlock_link":
                break;
            default:
                return;
        }
        _loc3_ = (this._toolbar instanceof Component ? this._toolbar : null).getProperty("link.format.safetylock_unlock");
        HabboWebTools.openWebPage(_loc3_, "habboMain");
    };

    private onMouseOver = (param1: WindowMouseEvent): void => {
        this._SafeStr_3819.textColor = 12247545;
    };

    private onMouseOut = (param1: WindowMouseEvent): void => {
        this._SafeStr_3819.textColor = 16777215;
    };
}

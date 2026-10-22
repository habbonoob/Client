import { asGuarded, asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { FlatCategory } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatCategory';
import { UpdateRoomCategoryAndTradeSettingsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/UpdateRoomCategoryAndTradeSettingsComposer';

export class EnforceCategoryCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::EnforceCategoryCtrl'); }

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _window: IFrameWindow;

    declare private _SafeStr_2492: IModalDialog;

    private _SafeStr_4504: number = 0;
    private _SafeStr_6010: number = 0;
    private _visibleAndSelectableCategories: any[] = [];

    public show(param1: number): void {
        this.close();
        this._SafeStr_2492 = this._navigator.windowManager.buildModalDialogFromXML(asInstanceOf(this._navigator.assets.getAssetByName("enforce_category_xml").content, XML));
        this._window = asGuarded(this._SafeStr_2492.rootWindow, isIFrameWindow);
        this._window.procedure = this.windowProcedure;
        this._window.center();
        this._window.findChildByName("header_button_close").visible = false;
        let _loc2_: IDropMenuWindow = asGuarded(this._window.findChildByName("trade_mode"), isIDropMenuWindow);
        let _loc5_: any[] = [];
        _loc5_.push("${navigator.roomsettings.trade_not_allowed}");
        _loc5_.push("${navigator.roomsettings.trade_not_with_Controller}");
        _loc5_.push("${navigator.roomsettings.trade_allowed}");
        _loc2_.populate(_loc5_);
        _loc2_.selection = 0;
        let _loc6_: IDropMenuWindow = asGuarded(this._window.findChildByName("category"), isIDropMenuWindow);
        this._visibleAndSelectableCategories = [];
        for (const _loc7_ of this._navigator.data.visibleCategories ?? []) {
            if (!_loc7_.automatic && (!_loc7_.staffOnly || _loc7_.staffOnly && this._navigator.sessionData.hasSecurity(7))) {
                this._visibleAndSelectableCategories.push(_loc7_);
            }
        }
        let _loc3_: any[] = [];
        for (const _loc4_ of this._visibleAndSelectableCategories ?? []) {
            _loc3_.push(_loc4_.visibleName);
        }
        _loc6_.populate(_loc3_);
        _loc6_.selection = 0;
    }

    private close(): void {
        if (this._SafeStr_2492 && this._window) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
            this._window = null;
        }
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (param1.type == "WME_CLICK") {
            let _loc4_: any = param2.name;
            if ("ok" === _loc4_) {
                _loc3_ = castTo(this._visibleAndSelectableCategories[Math.max(0, this._SafeStr_4504)], FlatCategory).nodeId;
                this._navigator.communication.connection.send(new UpdateRoomCategoryAndTradeSettingsComposer(this._navigator.data.currentRoomId, _loc3_, this._SafeStr_6010));
                this.close();
            }
        } else if (param1.type == "WE_SELECTED") {
            switch (param2.name) {
                case "category":
                    this._SafeStr_4504 = castGuarded(param2, isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection;
                    break;
                case "trade_mode":
                    this._SafeStr_6010 = castGuarded(param2, isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection;
            }
        }
    };
}

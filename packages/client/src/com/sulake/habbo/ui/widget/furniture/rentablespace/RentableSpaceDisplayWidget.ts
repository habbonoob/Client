import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurnitureRentableSpaceWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureRentableSpaceWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';

export class RentableSpaceDisplayWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.rentablespace::RentableSpaceDisplayWidget'); }

    static #staticsReady = false;

    private static get errorCodesToMessages(): Map<any, any> {
        RentableSpaceDisplayWidget.#initStatics();
        return RentableSpaceDisplayWidget.errorCodesToMessages;
    }
    private static set errorCodesToMessages(value: Map<any, any>) {
        RentableSpaceDisplayWidget.#initStatics();
        RentableSpaceDisplayWidget.errorCodesToMessages = value;
    }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        super(param1, param2, param3, param4);
        this.ownHandler.widget = this;
    }

    declare private _window: IWindowContainer;

    declare private _roomObject: IRoomObject;

    public override get mainWindow(): IWindow {
        return this._window;
    }

    private get ownHandler(): FurnitureRentableSpaceWidgetHandler {
        return this._SafeStr_2143 instanceof FurnitureRentableSpaceWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hide(this._roomObject);
        super.dispose();
    }

    public hide(param1: IRoomObject): void {
        if (this._roomObject != param1) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._roomObject = null;
    }

    public show(param1: IRoomObject): void {
        this._roomObject = param1;
        this.updateWidgetState();
    }

    public updateWidgetState(): void {
        if (this._roomObject == null) {
            return;
        }
        this.ownHandler.getRentableSpaceStatus(this._roomObject.getId());
    }

    public populateRentInfo(param1: boolean, param2: boolean, param3: number, param4: number, param5: string, param6: number, param7: number): void {
        let _loc8_: any = false;
        if (this._roomObject == null) {
            return;
        }
        this.createWindow();
        if (param1) {
            this._window.findChildByName("rent_view").visible = false;
            this._window.findChildByName("error_view").visible = false;
            this._window.findChildByName("rented_view").visible = true;
            this._window.findChildByName("renter_name").caption = param5;
            this._window.findChildByName("time_remaining_label").caption = FriendlyTime.getFriendlyTime(this.ownHandler.container.localization, param6);
            this._window.findChildByName("cancel_rent_button").visible = this.ownHandler.container.isOwnerOfFurniture(this._roomObject) || this.ownHandler.container.sessionDataManager.hasSecurity(5);
            castGuarded(this._window.findChildByName("rented_view"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
        } else {
            this._window.findChildByName("rented_view").visible = false;
            this._window.findChildByName("error_view").visible = false;
            this._window.findChildByName("rent_view").visible = true;
            this._window.findChildByName("price_label").caption = param7.toString() + " x";
            _loc8_ = param7 <= this.ownHandler.getUsersCreditAmount();
            if (!param2) {
                this._window.findChildByName("cant_rent_error").caption = stringOrNull(RentableSpaceDisplayWidget.errorCodesToMessages.get(param3));
            } else if (!_loc8_) {
                this._window.findChildByName("cant_rent_error").caption = stringOrNull(RentableSpaceDisplayWidget.errorCodesToMessages.get(200));
            } else {
                this._window.findChildByName("cant_rent_error").visible = false;
                this._window.findChildByName("rent_button").enable();
            }
            castGuarded(this._window.findChildByName("rent_view"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
        }
        if (!this._window.visible) {
            this._window.visible = true;
        }
    }

    public showErrorView(param1: number): void {
        this._window.findChildByName("rent_view").visible = false;
        this._window.findChildByName("rented_view").visible = false;
        this._window.findChildByName("error_view").visible = true;
        this._window.findChildByName("error_message").caption = stringOrNull(RentableSpaceDisplayWidget.errorCodesToMessages.get(param1));
    }

    private createWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = asGuarded(this.windowManager.buildFromXML(XML.from(this.assets.getAssetByName("rentablespace_xml").content)), isIWindowContainer);
        this._window.procedure = this.windowProcedure;
        this._window.center();
        this._window.findChildByName("rent_button").disable();
        this._window.findChildByName("rented_view").visible = false;
        this._window.findChildByName("error_view").visible = false;
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: any = param1.type;
        if ("WME_CLICK" === _loc3_) {
            switch (param2.name) {
                case "header_button_close":
                case "error_button_close":
                    this.hide(this._roomObject);
                    break;
                case "rent_button":
                    this.ownHandler.rentSpace(this._roomObject.getId());
                    break;
                case "cancel_rent_button":
                    this.ownHandler.cancelRent(this._roomObject.getId());
            }
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RentableSpaceDisplayWidget.#staticsReady) return;
        RentableSpaceDisplayWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RentableSpaceDisplayWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("errorCodesToMessages", null);
        set("errorCodesToMessages", new Dictionary());
        RentableSpaceDisplayWidget.errorCodesToMessages.set(100, "${rentablespace.widget.error_reason_already_rented}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(101, "${rentablespace.widget.error_reason_not_rented}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(102, "${rentablespace.widget.error_reason_not_rented_by_you}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(103, "${rentablespace.widget.error_reason_can_rent_only_one_space}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(200, "${rentablespace.widget.error_reason_not_enough_credits}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(201, "${rentablespace.widget.error_reason_not_enough_duckets}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(202, "${rentablespace.widget.error_reason_no_permission}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(203, "${rentablespace.widget.error_reason_no_habboclub}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(300, "${rentablespace.widget.error_reason_disabled}");
        RentableSpaceDisplayWidget.errorCodesToMessages.set(400, "${rentablespace.widget.error_reason_generic}");
    }
}

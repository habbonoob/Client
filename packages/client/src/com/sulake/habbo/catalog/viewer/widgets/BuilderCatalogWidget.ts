import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { CatalogWidgetRoomChangedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetRoomChangedEvent';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { YouAreOwnerMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/permissions/YouAreOwnerMessageEvent';

export class BuilderCatalogWidget extends CatalogWidget implements ICatalogWidget, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::BuilderCatalogWidget'); }

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
        this._SafeStr_4596 = new YouAreOwnerMessageEvent(this.onYouAreOwner);
        this._catalog.connection.addMessageEvent(this._SafeStr_4596);
    }

    declare private _catalog: HabboCatalog;

    declare private _offer: IPurchasableOffer;

    declare private _SafeStr_4596: YouAreOwnerMessageEvent;

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._catalog != null && this._catalog.connection != null) {
            this._catalog.connection.removeMessageEvent(this._SafeStr_4596);
            this._SafeStr_4596 = null;
            this._catalog = null;
        }
        this.events.removeEventListener("SELECT_PRODUCT", this.onSelectProduct);
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this._catalog.catalogType != "BUILDERS_CLUB") {
            this._window.visible = false;
            return true;
        }
        this.attachWidgetView("builderWidget");
        this.updateButtons(false);
        this._window.procedure = this.windowProcedure;
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        this.events.addEventListener("CWE_ROOM_CHANGED", this.onRoomChanged);
        return true;
    }

    private onYouAreOwner = (param1: YouAreOwnerMessageEvent): void => {
        if (this._catalog.catalogType != "BUILDERS_CLUB") {
            return;
        }
        this.updateButtons(true);
    };

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "place_one":
                this._catalog.requestSelectedItemToMover(null, this._offer);
                break;
            case "place_many":
                this._catalog.requestSelectedItemToMover(null, this._offer, true);
        }
    };

    private updateButtons(param1: boolean): void {
        let _loc2_: IStaticBitmapWrapperWindow = null;
        let _loc4_: IWindow = null;
        if (!this._window || !this._window.visible) {
            return;
        }
        let _loc3_: number = this._catalog.getBuilderFurniPlaceableStatusForOffer(this._offer);
        if (_loc3_ == 4 && param1) {
            _loc3_ = 0;
        }
        if (_loc3_ == 0) {
            castGuarded(this._window.findChildByName("place_one"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow").enable();
            castGuarded(this._window.findChildByName("place_many"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow").enable();
            this._window.findChildByName("error_container").visible = false;
        } else {
            castGuarded(this._window.findChildByName("place_one"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow").disable();
            castGuarded(this._window.findChildByName("place_many"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow").disable();
            this._window.findChildByName("error_container").visible = true;
            _loc2_ = asGuarded(this._window.findChildByName("error_icon"), isIStaticBitmapWrapperWindow);
            _loc4_ = this._window.findChildByName("error_message");
            switch (_loc3_ - 1) {
                case 0:
                    this._window.findChildByName("error_container").visible = false;
                    break;
                case 1:
                    _loc2_.assetUri = "icons_builder_error_furnilimit";
                    _loc4_.caption = "${builder.placement_widget.error.limit_reached}";
                    break;
                case 2:
                    _loc2_.assetUri = "icons_builder_error_notroom";
                    _loc4_.caption = "${builder.placement_widget.error.not_in_room}";
                    break;
                case 3:
                    _loc2_.assetUri = "icons_builder_error_room";
                    _loc4_.caption = "${builder.placement_widget.error.not_group_admin}";
                    break;
                case 4:
                    _loc2_.assetUri = "icons_builder_error_grouproom";
                    _loc4_.caption = "${builder.placement_widget.error.group_room}";
                    break;
                case 5:
                    _loc2_.assetUri = "icons_builder_error_userinroom";
                    _loc4_.caption = "${builder.placement_widget.error.visitors}";
            }
        }
    }

    private onRoomChanged = (param1: CatalogWidgetRoomChangedEvent): void => {
        this.updateButtons(false);
    };

    private onSelectProduct = (param1: SelectProductEvent): void => {
        this._offer = param1.offer;
        this.updateButtons(false);
    };

    get [IDisposable](): true {
        return true;
    }
}

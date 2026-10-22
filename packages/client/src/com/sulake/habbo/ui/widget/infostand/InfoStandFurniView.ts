import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { RoomWidgetFurniInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFurniInfoUpdateEvent';
import type { InfoStandFurniData } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandFurniData';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { ILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import type { IRarityItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemPreviewOverlayWidget';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { RoomWidgetFurniActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniActionMessage';
import { RoomWidgetGetBadgeDetailsMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetGetBadgeDetailsMessage';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { FurniId } from '@/com/sulake/habbo/utils/FurniId';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import { isIRarityItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemPreviewOverlayWidget';

export class InfoStandFurniView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandFurniView'); }

    private static readonly _SafeStr_8525: number = -12345678;
    private readonly _SafeStr_7498: number = 0;
    private readonly _SafeStr_8213: number = 1;
    private readonly _SafeStr_8522: number = 2;

    constructor(param1: InfoStandWidget, param2: string, param3: IHabboCatalog) {
        this.initInstanceFields();
        this._pickupMode = this._SafeStr_7498;
        this._widget = param1;
        this._catalog = param3;
        this._habboTracking = HabboTracking.getInstance();
        this.createWindow(param2);
    }

    declare protected _SafeStr_2534: IWindowContainer;

    declare protected _SafeStr_6090: IWindow;

    declare protected _border: IBorderWindow;

    declare protected _buttons: IItemListWindow;

    declare protected _catalog: IHabboCatalog;

    declare protected _habboTracking: IHabboTracking;

    declare protected _SafeStr_2445: IWindow;

    declare protected _SafeStr_4349: IWindow;

    declare protected _SafeStr_2457: IWindow;

    declare protected _SafeStr_2436: IWindow;

    declare protected _SafeStr_2432: IWindow;

    declare protected _widget: InfoStandWidget;

    declare protected _SafeStr_2212: IItemListWindow;

    declare private _pickupMode: number;
    static { (this.prototype as any)._pickupMode = 0; }

    private _ownerId: number = 0;

    declare protected _window: IItemListWindow;

    public get window(): IItemListWindow {
        return this._window;
    }

    public set name(param1: string) {
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("name_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = param1;
        _loc2_.visible = true;
        _loc2_.height = _loc2_.textHeight + 5 | 0;
        this.updateWindow();
    }

    public set isNft(param1: boolean) {
        let _loc2_: IBitmapWrapperWindow = null;
        let _loc4_: BitmapDataAsset = null;
        let _loc3_: BitmapData = null;
        let _loc5_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("nft_indicator"), isIWindowContainer);
        if (_loc5_ == null) {
            return;
        }
        _loc5_.height = param1 ? 22 : 0;
        _loc5_.visible = param1;
        if (param1) {
            _loc2_ = asGuarded(this._border.findChildByName("nft_icon"), isIBitmapWrapperWindow);
            if (_loc2_ != null) {
                _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
                _loc4_ = asInstanceOf(this._widget.assets.getAssetByName("icon_nft"), BitmapDataAsset);
                _loc3_ = asInstanceOf(_loc4_.content, BitmapData);
                _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
                _loc2_.bitmap.copyPixels(_loc3_, _loc3_.rect, new Point(0, 0));
            }
        }
        this.updateWindow();
    }

    public set furniImage(param1: BitmapData) {
        this.setImage(param1, "image");
    }

    public set description(param1: string) {
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("description_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = param1;
        _loc2_.height = _loc2_.textHeight + 5 | 0;
        this.updateWindow();
    }

    public set groupName(param1: string) {
        let _loc2_: IWindow = this._border.findChildByName("group_name");
        if (_loc2_) {
            _loc2_.caption = param1;
            _loc2_.visible = true;
        }
    }

    public set groupBadgeId(param1: string) {
        let _loc3_: IWidgetWindow = asGuarded(this._border.findChildByName("group_badge_image"), isIWidgetWindow);
        let _loc2_: IBadgeImageWidget = asGuarded(_loc3_.widget, isIBadgeImageWidget);
        _loc2_.badgeId = param1;
        _loc2_.groupId = this._widget.furniData.groupId;
        _loc3_.visible = true;
    }

    private set expiration(param1: number) {
        let _loc2_: IWindow = this._SafeStr_2212.getListItemByName("expiration_text");
        if (_loc2_ == null) {
            return;
        }
        this._widget.localizations.registerParameter("infostand.rent.expiration", "time", FriendlyTime.getFriendlyTime(this._widget.handler.container.localization, param1));
        _loc2_.visible = param1 >= 0 && this._ownerId == this._widget.handler.container.sessionDataManager.userId;
        this.updateWindow();
    }

    public dispose(): void {
        this._catalog = null;
        this._widget = null;
        this._window.dispose();
        this._window = null;
    }

    public setOwnerInfo(param1: number, param2: string): void {
        let _loc4_: IRegionWindow = null;
        let _loc5_: ITextWindow = null;
        let _loc3_: IWindow = null;
        let _loc6_: IWindow = null;
        this._ownerId = param1;
        if (this._ownerId == 0) {
            this.showWindow("owner_region", false);
            this.showWindow("owner_spacer", false);
        } else {
            _loc4_ = asGuarded(this._SafeStr_2212.getListItemByName("owner_region"), isIRegionWindow);
            _loc5_ = asGuarded(_loc4_.findChildByName("owner_name"), isITextWindow);
            _loc3_ = _loc4_.findChildByName("owner_link");
            _loc6_ = _loc4_.findChildByName("bcw_icon");
            if (this._ownerId != -12345678) {
                _loc5_.text = param2;
                _loc4_.toolTipCaption = this._widget.localizations.getLocalization("infostand.profile.link.tooltip", "");
                _loc4_.toolTipDelay = 100;
                _loc3_.visible = true;
                if (_loc6_ != null) {
                    _loc6_.visible = false;
                }
            } else {
                _loc5_.text = "${builder.catalog.title}";
                _loc4_.toolTipCaption = "";
                _loc3_.visible = false;
                if (_loc6_ != null) {
                    _loc6_.visible = true;
                }
            }
            this.showWindow("owner_region", true);
            this.showWindow("owner_spacer", true);
        }
        this.updateWindow();
    }

    protected createWindow(param1: string): void {
        let _loc2_: IWindow = null;
        let _loc5_: number = 0;
        let _loc4_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("furni_view"), XmlAsset);
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML)), isIItemListWindow);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._border = asGuarded(this._window.getListItemByName("info_border"), isIBorderWindow);
        this._buttons = asGuarded(this._window.getListItemByName("button_list"), isIItemListWindow);
        this._SafeStr_2534 = asGuarded(this._window.getListItemByName("custom_variables"), isIWindowContainer);
        if (!this._widget.handler.container.sessionDataManager.hasSecurity(5)) {
            this._SafeStr_2534.dispose();
            this._SafeStr_2534 = null;
        }
        if (this._SafeStr_2534 != null) {
            this._SafeStr_2534.procedure = this.customVarsWindowProcedure;
            this._SafeStr_6090 = castGuarded(this._SafeStr_2534.findChildByName("variable_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItemAt(0);
        }
        if (this._border != null) {
            this._SafeStr_2212 = asGuarded(this._border.findChildByName("infostand_element_list"), isIItemListWindow);
        }
        this._window.name = param1;
        this._widget.mainContainer.addChild(this._window);
        let _loc3_: IWindow = this._border.findChildByTag("close");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onClose);
        }
        if (this._buttons != null) {
            _loc5_ = 0;
            while (_loc5_ < this._buttons.numListItems) {
                _loc2_ = this._buttons.getListItemAt(_loc5_ >>> 0);
                _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
                _loc5_++;
            }
        }
        this._SafeStr_2445 = this._border.findChildByTag("catalog");
        if (this._SafeStr_2445 != null) {
            this._SafeStr_2445.addEventListener("WME_CLICK", this.onCatalogButtonClicked);
        }
        this._SafeStr_4349 = this._border.findChildByName("bc_place_button");
        if (this._SafeStr_4349 != null) {
            this._SafeStr_4349.addEventListener("WME_CLICK", this.onBcPlaceMoreButtonClicked);
        }
        this._SafeStr_2457 = this._border.findChildByName("rent_button");
        if (this._SafeStr_2457 != null) {
            this._SafeStr_2457.addEventListener("WME_CLICK", this.onRentButtonClicked);
        }
        this._SafeStr_2436 = this._border.findChildByName("extend_button");
        if (this._SafeStr_2436 != null) {
            this._SafeStr_2436.addEventListener("WME_CLICK", this.onExtendButtonClicked);
        }
        this._SafeStr_2432 = this._border.findChildByName("buyout_button");
        if (this._SafeStr_2432 != null) {
            this._SafeStr_2432.addEventListener("WME_CLICK", this.onBuyoutButtonClicked);
        }
        let _loc6_: IRegionWindow = asGuarded(this._SafeStr_2212.getListItemByName("owner_region"), isIRegionWindow);
        if (_loc6_ != null) {
            _loc6_.addEventListener("WME_CLICK", this.onOwnerRegion);
            _loc6_.addEventListener("WME_OVER", this.onOwnerRegion);
            _loc6_.addEventListener("WME_OUT", this.onOwnerRegion);
        }
        let _loc7_: IWindow = this._border.findChildByName("group_details_container");
        if (_loc7_) {
            _loc7_.addEventListener("WME_CLICK", this.onGroupInfoClicked);
        }
    }

    protected onBuyoutButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: IFurnitureData = null;
        if (this._catalog != null && this._widget && this._widget.furniData) {
            _loc2_ = this.getFurnitureData(this._widget.furniData);
            if (_loc2_) {
                this._catalog.openRentConfirmationWindow(_loc2_, true, this._widget.furniData.id);
            }
        }
    };

    protected onExtendButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: IFurnitureData = null;
        if (this._catalog != null && this._widget && this._widget.furniData) {
            _loc2_ = this.getFurnitureData(this._widget.furniData);
            if (_loc2_) {
                this._catalog.openRentConfirmationWindow(_loc2_, false, this._widget.furniData.id);
            }
        }
    };

    protected onRentButtonClicked = (param1: WindowMouseEvent): void => {
        if (this._catalog != null) {
            this._catalog.openCatalogPageByOfferId(this._widget.furniData.rentOfferId, "NORMAL");
        }
    };

    protected onClose = (param1: WindowMouseEvent): void => {
        this._widget.close();
    };

    protected onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc4_: RoomWidgetMessage = null;
        let _loc5_: string = null;
        let _loc3_: string = null;
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        switch (_loc2_.name) {
            case "rotate":
                _loc5_ = "RWFUAM_ROTATE";
                break;
            case "move":
                _loc5_ = "RWFAM_MOVE";
                break;
            case "pickup":
                if (this._pickupMode == 2) {
                    _loc5_ = "RWFAM_PICKUP";
                } else {
                    _loc5_ = "RWFAM_EJECT";
                }
                this._widget.close();
                break;
            case "save_branding_configuration":
                if (this._widget.handler.container.sessionDataManager.hasSecurity(4)) {
                    _loc5_ = "RWFAM_SAVE_STUFF_DATA";
                    _loc3_ = this.getVisibleAdFurnitureExtraParams();
                    break;
                }
            case "use":
                _loc5_ = "RWFAM_USE";
                break;
            case "wired_inspect":
                _loc5_ = "RWFAM_WIRED_INSPECT";
        }
        if (_loc5_ != null) {
            _loc4_ = new RoomWidgetFurniActionMessage(_loc5_, this._widget.furniData.id, this._widget.furniData.category, this._widget.furniData.purchaseOfferId, _loc3_);
            this._widget.messageListener.processWidgetMessage(_loc4_);
        }
    };

    protected onCatalogButtonClicked = (param1: WindowMouseEvent): void => {
        if (this._catalog != null) {
            this._catalog.openCatalogPageByOfferId(this._widget.furniData.purchaseOfferId, "NORMAL");
            if (this._habboTracking && !this._habboTracking.disposed) {
                this._habboTracking.trackGoogle("infostandCatalogButton", "offer", this._widget.furniData.purchaseOfferId);
            }
        }
    };

    protected onBcPlaceMoreButtonClicked = (param1: WindowMouseEvent): void => {
        this._widget.requestItemToMover();
    };

    protected onOwnerRegion = (param1: WindowMouseEvent): void => {
        if (param1.type == "WME_CLICK") {
            if (this._ownerId == -12345678) {
                if (this._widget.furniData.availableForBuildersClub && this._widget.furniData.purchaseOfferId >= 0) {
                    this._catalog.openCatalogPageByOfferId(this._widget.furniData.purchaseOfferId, "BUILDERS_CLUB");
                } else {
                    this._widget.handler.container.catalog.toggleBuilderCatalog();
                }
            } else {
                this._widget.messageListener.processWidgetMessage(new RoomWidgetOpenProfileMessage("RWOPEM_OPEN_USER_PROFILE", this._ownerId, "infoStand_furniView"));
            }
        }
        if (param1.type == "WME_OUT") {
            castGuarded(castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").findChildByName("owner_link"), isIIconWindow, "com.sulake.core.window.components.IIconWindow").style = 21;
        }
        if (param1.type == "WME_OVER") {
            castGuarded(castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").findChildByName("owner_link"), isIIconWindow, "com.sulake.core.window.components.IIconWindow").style = 22;
        }
    };

    protected updateWindow(): void {
        if (this._SafeStr_2212 == null || this._border == null || this._buttons == null) {
            return;
        }
        this._SafeStr_2212.arrangeListItems();
        this._buttons.width = this._buttons.scrollableRegion.width | 0;
        this._SafeStr_2212.height = this._SafeStr_2212.scrollableRegion.height | 0;
        this._border.height = this._SafeStr_2212.height + 20;
        this._window.width = Math.max(this._border.width, this._buttons.width) | 0;
        this._window.height = this._window.scrollableRegion.height | 0;
        if (this._border.width < this._buttons.width) {
            this._border.x = this._window.width - this._border.width;
            this._buttons.x = 0;
        } else {
            this._buttons.x = this._window.width - this._buttons.width;
            this._border.x = 0;
        }
        if (this._SafeStr_2534 != null) {
            this._SafeStr_2534.x = this._border.x;
        }
        this._widget.refreshContainer();
    }

    protected showButton(param1: string, param2: boolean): void {
        if (this._buttons == null) {
            return;
        }
        let _loc3_: IWindow = this._buttons.getListItemByName(param1);
        if (_loc3_ != null) {
            _loc3_.visible = param2;
            this._buttons.arrangeListItems();
        }
    }

    private customVarsWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: UtilsMap = null;
        let _loc3_: IItemListWindow = null;
        let _loc4_: number = 0;
        let _loc6_: IWindowContainer = null;
        if (param1.type != "WME_CLICK" || this._SafeStr_2534 == null) {
            return;
        }
        let _loc7_: any = param2.name;
        if ("set_values" === _loc7_) {
            _loc5_ = new UtilsMap();
            _loc3_ = asGuarded(this._SafeStr_2534.findChildByName("variable_list"), isIItemListWindow);
            _loc4_ = 0;
            while (_loc4_ < _loc3_.numListItems) {
                _loc6_ = asGuarded(_loc3_.getListItemAt(_loc4_ >>> 0), isIWindowContainer);
                _loc5_[_loc6_.name] = _loc6_.findChildByName("value").caption;
                _loc4_++;
            }
            this._widget.handler.setObjectData(_loc5_);
        }
    };

    private getRoomObject(param1: number): IRoomObject {
        let _loc3_: number = this._widget.handler.container.roomSession.roomId;
        let _loc2_: IRoomObject = this._widget.handler.container.roomEngine.getRoomObject(_loc3_, param1, 10);
        if (_loc2_ == null) {
            _loc2_ = this._widget.handler.container.roomEngine.getRoomObject(_loc3_, param1, 20);
        }
        return _loc2_;
    }

    private getFurnitureData(param1: InfoStandFurniData): IFurnitureData {
        let _loc4_: IFurnitureData = null;
        let _loc2_: IRoomObject = this.getRoomObject(param1.id);
        if (_loc2_ == null) {
            return null;
        }
        let _loc3_: any = this._widget.furniData.category == 20;
        let _loc5_: number = _loc2_.getModel().getNumber("furniture_type_id") | 0;
        if (_loc3_) {
            _loc4_ = this._widget.handler.container.sessionDataManager.getWallItemData(_loc5_);
        } else {
            _loc4_ = this._widget.handler.container.sessionDataManager.getFloorItemData(_loc5_);
        }
        return _loc4_;
    }

    private setImage(param1: BitmapData, param2: string): void {
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName(param2), isIBitmapWrapperWindow);
        if (_loc3_ == null) {
            return;
        }
        if (param1 == null) {
            param1 = new BitmapData(_loc3_.width, 40, true);
        }
        _loc3_.height = Math.min(param1.height, 200) | 0;
        _loc3_.bitmap = param1.clone();
        _loc3_.visible = true;
        this.updateWindow();
    }

    private onGroupInfoClicked = (param1: WindowMouseEvent): void => {
        this._widget.messageListener.processWidgetMessage(new RoomWidgetGetBadgeDetailsMessage(false, this._widget.furniData.groupId));
    };

    private updateCustomVarsWindow(): void {
        let _loc1_: IWindowContainer = null;
        if (this._SafeStr_2534 == null || this._widget.furniData == null) {
            return;
        }
        let _loc6_: IRoomObject = this.getRoomObject(this._widget.furniData.id);
        if (_loc6_ == null) {
            return;
        }
        let _loc3_: any[] = _loc6_.getModel().getStringArray("furniture_custom_variables");
        this._SafeStr_2534.visible = _loc3_ != null && _loc3_.length > 0;
        if (!this._SafeStr_2534.visible) {
            return;
        }
        let _loc5_: IItemListWindow = asGuarded(this._SafeStr_2534.findChildByName("variable_list"), isIItemListWindow);
        _loc5_.destroyListItems();
        let _loc4_: UtilsMap = _loc6_.getModel().getStringToStringMap("furniture_data");
        for (const _loc2_ of _loc3_ ?? []) {
            _loc1_ = asGuarded(this._SafeStr_6090.clone(), isIWindowContainer);
            _loc1_.name = stringOrNull(_loc2_);
            _loc1_.findChildByName("name").caption = stringOrNull(_loc2_);
            _loc1_.findChildByName("value").caption = stringOrNull(_loc4_[_loc2_]);
            _loc5_.addListItem(_loc1_);
        }
    }

    private updatePickupMode(param1: RoomWidgetFurniInfoUpdateEvent, param2: boolean): void {
        this._pickupMode = 0;
        if (!param2) {
            if (param1.isOwner || param1.isAnyRoomController) {
                this._pickupMode = 2;
            } else if (param1.isRoomOwner || param1.roomControllerLevel >= 3) {
                this._pickupMode = 1;
            }
            if (param1.isStickie) {
                this._pickupMode = 0;
            }
        }
        this.showButton("pickup", this._pickupMode != 0);
        this.localizePickupButton(this._pickupMode);
    }

    private localizePickupButton(param1: number): void {
        if (this._buttons == null) {
            return;
        }
        let _loc2_: IWindow = this._buttons.getListItemByName("pickup");
        if (_loc2_ != null) {
            if (param1 == 1) {
                _loc2_.caption = "${infostand.button.eject}";
            } else {
                _loc2_.caption = "${infostand.button.pickup}";
            }
        }
    }

    private createAdElement(param1: string, param2: string): void {
        let _loc4_: XmlAsset = null;
        let _loc5_: IWindowContainer = null;
        let _loc6_: IWindow = null;
        let _loc3_: IWindow = null;
        if (this._SafeStr_2212 != null) {
            _loc4_ = asInstanceOf(this._widget.assets.getAssetByName("furni_view_branding_element"), XmlAsset);
            if (_loc4_ != null) {
                _loc5_ = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML)), isIWindowContainer);
                if (_loc5_ != null) {
                    _loc6_ = _loc5_.findChildByName("element_name");
                    if (_loc6_ != null) {
                        _loc6_.caption = param1;
                    }
                    _loc3_ = _loc5_.findChildByName("element_value");
                    if (_loc3_ != null) {
                        _loc3_.caption = param2;
                        _loc3_.addEventListener("WKE_KEY_DOWN", this.adElementKeyEventProc);
                    }
                    if (_loc6_ != null && _loc3_ != null) {
                        this._SafeStr_2212.addListItem(_loc5_);
                    }
                }
            }
        }
    }

    private getAdFurnitureExtraParams(): UtilsMap {
        let _loc5_: string = null;
        let _loc3_: any[] = null;
        let _loc4_: any[] = null;
        let _loc7_: string = null;
        let _loc6_: string = null;
        let _loc1_: UtilsMap = new UtilsMap();
        if (this._widget != null) {
            _loc5_ = this._widget.furniData.extraParam.substr("RWEIEP_BRANDING_OPTIONS".length);
            _loc3_ = _loc5_.split("\t");
            if (_loc3_ != null) {
                for (const _loc2_ of _loc3_ ?? []) {
                    _loc4_ = _loc2_.split("=", 2);
                    if (_loc4_ != null && _loc4_.length == 2) {
                        _loc7_ = stringOrNull(_loc4_[0]);
                        _loc6_ = stringOrNull(_loc4_[1]);
                        _loc1_.add(_loc7_, _loc6_);
                    }
                }
            }
        }
        return _loc1_;
    }

    private getVisibleAdFurnitureExtraParams(): string {
        let _loc2_: any[] = null;
        let _loc7_: IWindow = null;
        let _loc3_: IWindow = null;
        let _loc5_: string = null;
        let _loc4_: string = null;
        let _loc1_: string = "";
        if (this._border != null) {
            _loc2_ = [];
            this._border.groupChildrenWithTag("branding_element", _loc2_, -1);
            if (_loc2_.length > 0) {
                for (const _loc6_ of _loc2_ ?? []) {
                    _loc7_ = _loc6_.findChildByName("element_name");
                    _loc3_ = _loc6_.findChildByName("element_value");
                    if (_loc7_ != null && _loc3_ != null) {
                        _loc5_ = this.trimAdFurnitureExtramParam(_loc7_.caption);
                        _loc4_ = this.trimAdFurnitureExtramParam(_loc3_.caption);
                        _loc1_ += _loc5_ + "=" + _loc4_ + "\t";
                    }
                }
            }
        }
        return _loc1_;
    }

    private trimAdFurnitureExtramParam(param1: string): string {
        if (param1 != null) {
            if (param1.indexOf("\t") != -1) {
                return param1.replace("\t", "");
            }
        }
        return param1;
    }

    private showAdFurnitureDetails(param1: boolean): void {
        let _loc5_: string = null;
        let _loc8_: UtilsMap = null;
        let _loc9_: string = null;
        if (this._widget == null || this._border == null) {
            return;
        }
        let _loc4_: IWindow = this._border.findChildByName("furni_details_spacer");
        if (_loc4_ != null) {
            _loc4_.visible = param1;
        }
        let _loc2_: any[] = [];
        this._border.groupChildrenWithTag("branding_element", _loc2_, -1);
        if (_loc2_.length > 0) {
            for (const _loc6_ of _loc2_ ?? []) {
                this._border.removeChild(_loc6_);
                _loc6_.dispose();
            }
        }
        let _loc3_: boolean = false;
        let _loc7_: IWindow = asGuarded(this._border.findChildByName("furni_details_text"), isITextWindow);
        if (_loc7_ != null) {
            _loc7_.visible = param1;
            _loc5_ = "id: " + this._widget.furniData.id;
            _loc8_ = this.getAdFurnitureExtraParams();
            if (_loc8_.length > 0) {
                _loc3_ = true;
                for (const _loc10_ of _loc8_.getKeys() ?? []) {
                    _loc9_ = stringOrNull(_loc8_.getValue(_loc10_));
                    this.createAdElement(stringOrNull(_loc10_), _loc9_);
                }
            }
            _loc7_.caption = _loc5_;
        }
        this.showButton("save_branding_configuration", _loc3_);
    }

    private showGroupInfo(param1: boolean): void {
        this.showWindow("group_details_spacer", param1);
        this.showWindow("group_details_container", param1);
        this.showWindow("group_badge_image", false);
        this.showWindow("group_name", false);
    }

    private showWindow(param1: string, param2: boolean): void {
        let _loc3_: IWindow = this._border.findChildByName(param1);
        if (_loc3_) {
            _loc3_.visible = param2;
        }
    }

    private adElementKeyEventProc = (param1: WindowEvent = null, param2: IWindow = null): void => {
    };

    private updatePurchaseButtonVisibility(param1: boolean, param2: boolean, param3: boolean, param4: boolean, param5: boolean, param6: boolean, param7: boolean): void {
        let _loc12_: any = false;
        let _loc10_: boolean = param1 && param2;
        let _loc9_: boolean = _loc10_ && param6;
        let _loc11_: boolean = _loc10_ && param5;
        let _loc13_: boolean = !_loc10_ && param3;
        let _loc15_: boolean = param7 && this._widget.config.getBoolean("infostand.place_more.enabled");
        let _loc14_: boolean = !_loc10_ && param4;
        if (this._SafeStr_4349 != null) {
            this._SafeStr_4349.visible = _loc15_;
            if (!_loc12_) {
                _loc12_ = _loc15_;
            }
        }
        if (this._SafeStr_2445 != null) {
            this._SafeStr_2445.visible = _loc13_;
            if (!_loc12_) {
                _loc12_ = _loc13_;
            }
        }
        if (this._SafeStr_2457 != null) {
            this._SafeStr_2457.visible = _loc14_;
            if (!_loc12_) {
                _loc12_ = _loc14_;
            }
        }
        if (this._SafeStr_2436 != null) {
            this._SafeStr_2436.visible = _loc9_;
            if (!_loc12_) {
                _loc12_ = _loc9_;
            }
        }
        if (this._SafeStr_2432 != null) {
            this._SafeStr_2432.visible = _loc11_;
            if (!_loc12_) {
                _loc12_ = _loc11_;
            }
        }
        let _loc8_: IItemListWindow = asGuarded(this._SafeStr_2212.getListItemByName("purchase_buttons"), isIItemListWindow);
        if (_loc8_ != null) {
            _loc8_.arrangeListItems();
            _loc8_.visible = _loc12_;
        }
        this._SafeStr_2212.arrangeListItems();
    }

    private showLimitedItem(param1: boolean, param2: IStuffData): void {
        let _loc3_: IWidgetWindow = null;
        let _loc4_: ILimitedItemPreviewOverlayWidget = null;
        let _loc6_: IWindowContainer = asGuarded(this._border.findChildByName("unique_item_background_container"), isIWindowContainer);
        let _loc5_: IWindowContainer = asGuarded(this._border.findChildByName("unique_item_overlay_container"), isIWindowContainer);
        if (!_loc6_ || !_loc5_) {
            return;
        }
        if (!param1) {
            _loc6_.visible = false;
            _loc5_.visible = false;
        } else {
            _loc6_.visible = true;
            _loc5_.visible = true;
            _loc3_ = castGuarded(_loc5_.findChildByName("unique_item_plaque_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc4_ = castGuarded(_loc3_.widget, isILimitedItemPreviewOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemPreviewOverlayWidget");
            _loc4_.serialNumber = param2.uniqueSerialNumber;
            _loc4_.seriesSize = param2.uniqueSeriesSize;
        }
    }

    private showChestData(param1: boolean, param2: boolean, param3: IStuffData): void {
        if (this._border.findChildByName("wired_chest_elements") == null) {
            return;
        }
        let _loc6_: MapStuffData = param3 instanceof MapStuffData ? param3 : null;
        if (!param1 && !param2 || _loc6_ == null) {
            this._border.findChildByName("wired_chest_elements").visible = false;
            this._border.findChildByName("name_extra_text").visible = false;
            this._border.findChildByName("chest_item_count").visible = false;
            return;
        }
        let _loc7_: any = _loc6_.getValue("is_wired_enabled") == "1";
        this._border.findChildByName("wired_chest_elements").visible = _loc7_;
        if (_loc7_) {
            this._border.findChildByName("locked_icon").visible = _loc6_.getValue("locked") == "1";
        }
        let _loc4_: ITextWindow = asGuarded(this._border.findChildByName("name_extra_text"), isITextWindow);
        _loc4_.visible = param3.chestName != "";
        if (param3.chestName != "") {
            _loc4_.text = param3.chestName;
        }
        let _loc5_: ITextWindow = asGuarded(this._border.findChildByName("chest_item_count"), isITextWindow);
        _loc5_.visible = true;
        let _loc8_: string = "infostand.chest_contents." + (param1 ? "furni" : "coin");
        _loc5_.text = this._widget.localizations.getLocalizationWithParams(_loc8_, "", "amount", _loc6_.getValue("contents_count"));
    }

    private showRarityItem(param1: boolean, param2: IStuffData): void {
        let _loc3_: IWidgetWindow = null;
        let _loc4_: IRarityItemPreviewOverlayWidget = null;
        let _loc5_: IWindowContainer = asGuarded(this._border.findChildByName("rarity_item_overlay_container"), isIWindowContainer);
        if (!_loc5_) {
            return;
        }
        if (!param1) {
            _loc5_.visible = false;
        } else {
            _loc5_.visible = true;
            _loc3_ = castGuarded(_loc5_.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc4_ = castGuarded(_loc3_.widget, isIRarityItemPreviewOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemPreviewOverlayWidget");
            _loc4_.rarityLevel = param2.rarityLevel;
        }
    }

    public update(param1: RoomWidgetFurniInfoUpdateEvent): void {
        if (this._border != null) {
            this._border.color = (FurniId.isBuilderClubId(param1.id) ? 14121216 : 16777215) >>> 0;
        }
        let _loc10_: IRoomSession = this._widget.handler.container.roomSession;
        let _loc4_: boolean = _loc10_ != null && _loc10_.playTestMode;
        let _loc8_: boolean = _loc10_ != null && this._widget.handler.container.roomEngine.activeRoomHasFreeFurniMovementsMode;
        this.name = param1.name;
        this.description = param1.description;
        this.furniImage = param1.image;
        this.expiration = param1.expiration;
        this.isNft = param1.isNft;
        this.setOwnerInfo(FurniId.isBuilderClubId(param1.id) ? -12345678 : param1.ownerId, param1.ownerName);
        let _loc3_: boolean = false;
        let _loc7_: any = false;
        let _loc9_: boolean = false;
        let _loc2_: boolean = false;
        if (_loc8_ || !_loc4_ && (param1.roomControllerLevel >= 1 || param1.isOwner || param1.isRoomOwner || param1.isAnyRoomController)) {
            _loc3_ = true;
            _loc7_ = !param1.isWallItem;
        }
        if (param1.isAnyRoomController) {
            _loc9_ = true;
        }
        let _loc11_: any = param1.roomControllerLevel >= 1;
        let _loc5_: boolean = this._widget.config.getBoolean("infostand.use.button.enabled");
        if (_loc5_) {
            if (param1.usagePolicy == 2) {
                _loc2_ = true;
            }
            if (!_loc4_ && (param1.usagePolicy == 1 && _loc11_ || param1.extraParam == "RWEIEP_JUKEBOX" && _loc11_ || param1.extraParam == "RWEIEP_USABLE_PRODUCT" && _loc11_)) {
                _loc2_ = true;
            }
            if (_loc8_) {
                _loc2_ = true;
            }
        }
        this.updatePickupMode(param1, _loc4_);
        this.showButton("move", _loc3_);
        this.showButton("rotate", _loc7_);
        this.showButton("use", _loc2_);
        this.showButton("wired_inspect", !_loc4_ && this._widget.handler.container.userDefinedRoomEvents.showInspectButton());
        this.showAdFurnitureDetails(_loc9_);
        this.showGroupInfo(param1.groupId > 0);
        this.updatePurchaseButtonVisibility(param1.isOwner, param1.expiration >= 0, param1.purchaseOfferId >= 0, param1.rentOfferId >= 0, param1.purchaseCouldBeUsedForBuyout, param1.rentCouldBeUsedForBuyout, param1.bcOfferId >= 0 && param1.availableForBuildersClub && this._catalog.canPlaceWithBC());
        this.showLimitedItem(param1.stuffData.uniqueSerialNumber > 0, param1.stuffData);
        this.showRarityItem(param1.stuffData.rarityLevel >= 0, param1.stuffData);
        let _loc6_: IFurnitureData = this.getFurnitureData(this._widget.furniData);
        this.showChestData(_loc6_ != null && _loc6_.category == 24, _loc6_ != null && _loc6_.category == 25, param1.stuffData);
        this._buttons.visible = !!(_loc3_ || _loc7_ || this._pickupMode != 0 || _loc2_);
        this.updateCustomVarsWindow();
        this.updateWindow();
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }
}

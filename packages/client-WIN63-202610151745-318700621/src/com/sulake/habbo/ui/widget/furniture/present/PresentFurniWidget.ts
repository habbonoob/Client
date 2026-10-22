import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetEcotronBoxDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetEcotronBoxDataUpdateEvent';
import type { RoomWidgetPresentDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPresentDataUpdateEvent';
import type { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetExtendedProfileByNameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileByNameMessageComposer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { FurniturePresentWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurniturePresentWidgetHandler';
import { RoomWidgetPresentOpenMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPresentOpenMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class PresentFurniWidget extends RoomWidgetBase implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.present::PresentFurniWidget'); }

    private static readonly _SafeStr_7439: string = "floor";
    private static readonly TYPE_WALLPAPER: string = "wallpaper";
    private static readonly TYPE_LANDSCAPE: string = "landscape";

    declare private _SafeStr_5124: ICoreConfiguration;

    declare private _catalog: IHabboCatalog;

    declare private _inventory: IHabboInventory;

    declare private _roomEngine: IRoomEngine;

    declare private _window: IFrameWindow;

    private _objectId: number = -1;
    private _classId: number = 0;

    declare private _itemType: string;

    declare private _text: string;

    declare private _controller: boolean;
    static { (this.prototype as any)._controller = false; }

    private _SafeStr_2538: boolean = false;

    declare private _senderFigure: string;

    declare private _senderName: string;

    private _placedItemId: number = -1;
    private _placedItemType: string = "";
    private _placedInRoom: boolean = false;
    private _trustedSender: boolean = false;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: ICoreConfiguration, param6: IHabboCatalog, param7: IHabboInventory, param8: IRoomEngine) {
        super(param1, param2, param3, param4);
        this._SafeStr_5124 = param5;
        this._catalog = param6;
        this._inventory = param7;
        this._roomEngine = param8;
    }

    public override dispose(): void {
        this.hideInterface();
        this._SafeStr_5124 = null;
        this._catalog = null;
        this._inventory = null;
        this._roomEngine = null;
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWPDUE_PACKAGEINFO", this.onObjectUpdate);
        param1.addEventListener("RWPDUE_CONTENTS", this.onObjectUpdate);
        param1.addEventListener("RWPDUE_CONTENTS_IMAGE", this.onObjectUpdate);
        param1.addEventListener("RWPDUE_CONTENTS_CLUB", this.onObjectUpdate);
        param1.addEventListener("RWPDUE_CONTENTS_FLOOR", this.onObjectUpdate);
        param1.addEventListener("RWPDUE_CONTENTS_LANDSCAPE", this.onObjectUpdate);
        param1.addEventListener("RWPDUE_CONTENTS_WALLPAPER", this.onObjectUpdate);
        param1.addEventListener("RWROUE_FURNI_REMOVED", this.onRoomObjectRemoved);
        param1.addEventListener("RWEBDUE_PACKAGEINFO", this.onEcotronUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWPDUE_PACKAGEINFO", this.onObjectUpdate);
        param1.removeEventListener("RWPDUE_CONTENTS", this.onObjectUpdate);
        param1.removeEventListener("RWPDUE_CONTENTS_IMAGE", this.onObjectUpdate);
        param1.removeEventListener("RWPDUE_CONTENTS_CLUB", this.onObjectUpdate);
        param1.removeEventListener("RWPDUE_CONTENTS_FLOOR", this.onObjectUpdate);
        param1.removeEventListener("RWPDUE_CONTENTS_LANDSCAPE", this.onObjectUpdate);
        param1.removeEventListener("RWPDUE_CONTENTS_WALLPAPER", this.onObjectUpdate);
        param1.removeEventListener("RWEBDUE_PACKAGEINFO", this.onEcotronUpdate);
        param1.removeEventListener("RWROUE_FURNI_REMOVED", this.onRoomObjectRemoved);
    }

    private onObjectUpdate = (param1: RoomWidgetPresentDataUpdateEvent): void => {
        switch (param1.type) {
            case "RWPDUE_PACKAGEINFO":
                this.hideInterface();
                this._SafeStr_2538 = false;
                this._objectId = param1.objectId;
                this._text = param1.text;
                this._controller = param1.controller;
                this._senderName = param1.purchaserName;
                this._senderFigure = param1.purchaserFigure;
                this._trustedSender = param1.trustedSender;
                this.showInterface();
                this.showIcon(param1.iconBitmapData);
                break;
            case "RWPDUE_CONTENTS_FLOOR":
                if (!this._SafeStr_2538) {
                    return;
                }
                this._objectId = param1.objectId;
                this._classId = param1.classId;
                this._itemType = param1.itemType;
                this._text = param1.text;
                this._controller = param1.controller;
                this._placedItemId = param1.placedItemId;
                this._placedItemType = param1.placedItemType;
                this._placedInRoom = param1.placedInRoom;
                this.showGiftOpenedInterface();
                this.showCustomIcon("packagecard_icon_floor");
                break;
            case "RWPDUE_CONTENTS_LANDSCAPE":
                if (!this._SafeStr_2538) {
                    return;
                }
                this._objectId = param1.objectId;
                this._classId = param1.classId;
                this._itemType = param1.itemType;
                this._text = param1.text;
                this._controller = param1.controller;
                this._placedItemId = param1.placedItemId;
                this._placedItemType = param1.placedItemType;
                this._placedInRoom = param1.placedInRoom;
                this.showGiftOpenedInterface();
                this.showCustomIcon("packagecard_icon_landscape");
                break;
            case "RWPDUE_CONTENTS_WALLPAPER":
                if (!this._SafeStr_2538) {
                    return;
                }
                this._objectId = param1.objectId;
                this._classId = param1.classId;
                this._itemType = param1.itemType;
                this._text = param1.text;
                this._controller = param1.controller;
                this._placedItemId = param1.placedItemId;
                this._placedItemType = param1.placedItemType;
                this._placedInRoom = param1.placedInRoom;
                this.showGiftOpenedInterface();
                this.showCustomIcon("packagecard_icon_wallpaper");
                break;
            case "RWPDUE_CONTENTS_CLUB":
                if (!this._SafeStr_2538) {
                    return;
                }
                this._objectId = param1.objectId;
                this._classId = param1.classId;
                this._itemType = param1.itemType;
                this._text = param1.text;
                this._controller = param1.controller;
                this.showGiftOpenedInterface();
                this.showCustomIcon("packagecard_icon_hc");
                break;
            case "RWPDUE_CONTENTS":
                if (!this._SafeStr_2538) {
                    return;
                }
                this._objectId = param1.objectId;
                this._classId = param1.classId;
                this._itemType = param1.itemType;
                this._text = param1.text;
                this._controller = param1.controller;
                this._placedItemId = param1.placedItemId;
                this._placedItemType = param1.placedItemType;
                this._placedInRoom = param1.placedInRoom;
                this.showGiftOpenedInterface();
                this.showIcon(param1.iconBitmapData);
                break;
            case "RWPDUE_CONTENTS_IMAGE":
                if (!this._SafeStr_2538) {
                    return;
                }
                this.showIcon(param1.iconBitmapData);
        }
    };

    private onRoomObjectRemoved = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        if (param1.id == this._objectId) {
            this.hideInterface();
        }
        if (param1.id == this._placedItemId) {
            if (this._placedInRoom) {
                this._placedInRoom = false;
                this.updateRoomAndInventoryButtons();
            }
        }
    };

    private onEcotronUpdate = (param1: RoomWidgetEcotronBoxDataUpdateEvent): void => {
        let _loc2_: any = param1.type;
        if ("RWEBDUE_PACKAGEINFO" === _loc2_) {
            this.hideInterface();
        }
    };

    private showCustomIcon(param1: string): void {
        let _loc2_: BitmapData = null;
        let _loc3_: BitmapDataAsset = asInstanceOf(this.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc3_ != null) {
            _loc2_ = asInstanceOf(_loc3_.content, BitmapData);
        }
        this.showIcon(_loc2_);
    }

    private showIcon(param1: BitmapData): void {
        if (param1 == null) {
            param1 = new BitmapData(1, 1);
        }
        if (this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("gift_image"), isIBitmapWrapperWindow);
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.bitmap != null) {
            _loc2_.bitmap.dispose();
        }
        _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
        let _loc3_: Point = new Point((_loc2_.width - param1.width) / 2, (_loc2_.height - param1.height) / 2);
        _loc2_.bitmap.copyPixels(param1, param1.rect, _loc3_);
    }

    private showGiftOpenedInterface(): void {
        let _loc11_: string = null;
        let _loc3_: BitmapDataAsset = null;
        let _loc1_: BitmapData = null;
        let _loc2_: string = null;
        let _loc10_: boolean = false;
        let _loc4_: string = null;
        if (this._objectId < 0) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
        }
        let _loc9_: XmlAsset = asInstanceOf(this.assets.getAssetByName("packagecard_new_opened"), XmlAsset);
        this._window = asGuarded(this.windowManager.buildFromXML(asInstanceOf(_loc9_.content, XML)), isIFrameWindow);
        this._window.center();
        if (!this.isUnknownSender()) {
            _loc11_ = "widget.furni.present.window.title_from";
            this._SafeStr_2259.registerParameter(_loc11_, "name", this._senderName);
            this._window.caption = this._SafeStr_2259.getLocalization(_loc11_, this._senderName);
        }
        let _loc6_: IWindow = this._window.findChildByName("header_button_close");
        if (_loc6_ != null) {
            _loc6_.addEventListener("WME_CLICK", this.onClose);
        }
        let _loc7_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("image_bg"), isIBitmapWrapperWindow);
        if (_loc7_ != null) {
            _loc3_ = asInstanceOf(this.assets.getAssetByName("gift_icon_background"), BitmapDataAsset);
            if (_loc3_ != null) {
                _loc1_ = asInstanceOf(_loc3_.content, BitmapData);
                if (_loc7_.bitmap) {
                    _loc7_.bitmap.dispose();
                }
                _loc7_.bitmap = _loc1_.clone();
            }
        }
        let _loc5_: ITextWindow = asGuarded(this._window.findChildByName("gift_message"), isITextWindow);
        if (_loc5_ != null) {
            _loc5_.text = "";
            if (this._text != null) {
                _loc2_ = "widget.furni.present.message_opened";
                _loc10_ = this.isSpacesItem();
                if (_loc10_) {
                    _loc2_ = "widget.furni.present.spaces.message_opened";
                }
                this._SafeStr_2259.registerParameter(_loc2_, "product", this._text);
                if (this._itemType == "h") {
                    _loc5_.text = this._text;
                } else {
                    _loc5_.text = this._SafeStr_2259.getLocalization(_loc2_, this._text);
                }
            } else {
                _loc5_.visible = false;
            }
        }
        let _loc8_: IWindow = this._window.findChildByName("give_gift_button");
        if (_loc8_ != null) {
            if (!this.isUnknownSender()) {
                _loc4_ = "widget.furni.present.give_gift";
                this._SafeStr_2259.registerParameter(_loc4_, "name", this._senderName);
                _loc8_.caption = this._SafeStr_2259.getLocalization(_loc4_, this._senderName);
                _loc8_.addEventListener("WME_CLICK", this.onGiveGiftOpened);
            } else {
                _loc8_.visible = false;
            }
        }
        this.prepareAvatarImageContainer();
        this.updateGiftDialogAvatarImage(this._senderFigure);
        this.updateRoomAndInventoryButtons();
        this.selectGiftedObject();
    }

    private isSpacesItem(): boolean {
        let _loc2_: IFurnitureData = null;
        let _loc3_: string = null;
        let _loc1_: boolean = false;
        if (this._itemType == "i") {
            _loc2_ = (this._SafeStr_2143 instanceof FurniturePresentWidgetHandler ? this._SafeStr_2143 : null).container.sessionDataManager.getWallItemData(this._classId);
            if (_loc2_ != null) {
                _loc3_ = _loc2_.className;
                _loc1_ = _loc3_ == "floor" || _loc2_.className == "landscape" || _loc2_.className == "wallpaper";
            }
        }
        return _loc1_;
    }

    private isClubItem(): boolean {
        return this._itemType == "h";
    }

    private updateRoomAndInventoryButtons(): void {
        if (this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        let _loc4_: boolean = this.isSpacesItem();
        let _loc7_: boolean = this.isClubItem();
        let _loc10_: IWindow = this._window.findChildByName("keep_in_room_button");
        if (_loc10_ != null) {
            _loc10_.addEventListener("WME_CLICK", this.onKeepInRoom);
            _loc10_.visible = this._placedInRoom;
            if (_loc4_ || _loc7_) {
                _loc10_.visible = false;
            }
        }
        let _loc1_: IWindow = this._window.findChildByName("place_in_room_button");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.onPlaceInRoom);
            _loc1_.visible = !this._placedInRoom;
            if (_loc4_) {
                _loc1_.disable();
            }
            if (_loc4_ || _loc7_) {
                _loc1_.visible = false;
            }
        }
        let _loc2_: IWindow = this._window.findChildByName("put_in_inventory_button");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onPutInInventory);
            _loc2_.enable();
            if (_loc4_ || _loc7_) {
                _loc2_.visible = false;
            }
        }
        let _loc8_: IWindow = this._window.findChildByName("separator");
        if (_loc8_ != null) {
            _loc8_.visible = this.isUnknownSender();
        }
        let _loc5_: IWindow = asGuarded(this._window.findChildByName("give_container"), isIWindow);
        if (_loc5_ != null) {
            _loc5_.visible = !this.isUnknownSender();
        }
        let _loc6_: IItemListWindow = asGuarded(this._window.findChildByName("button_list"), isIItemListWindow);
        if (_loc6_ != null) {
            _loc6_.arrangeListItems();
        }
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("give_element_list"), isIItemListWindow);
        if (_loc3_ != null) {
            _loc3_.arrangeListItems();
        }
        let _loc9_: IItemListWindow = asGuarded(this._window.findChildByName("element_list"), isIItemListWindow);
        if (_loc9_ != null) {
            _loc9_.arrangeListItems();
        }
        this._window.resizeToFitContent();
    }

    private resetAndHideInterface(): void {
        this._SafeStr_2538 = false;
        this._placedItemId = -1;
        this._placedInRoom = false;
        this.hideInterface();
    }

    private onKeepInRoom = (param1: WindowEvent): void => {
        this.resetAndHideInterface();
    };

    private onPlaceInRoom = (param1: WindowEvent): void => {
        let _loc3_: IFurnitureItem = null;
        let _loc2_: IWindow = param1.target;
        _loc2_.disable();
        if (this._placedItemId > 0 && !this._placedInRoom) {
            _loc3_ = null;
            switch (this._placedItemType) {
                case "s":
                    _loc3_ = this._inventory.getFloorItemById(-this._placedItemId);
                    if (this.requestSelectedFurniPlacement(_loc3_)) {
                        this._inventory.removeUnseenFurniCounter(this._placedItemId);
                    }
                    break;
                case "i":
                    _loc3_ = this._inventory.getWallItemById(this._placedItemId);
                    if (this.requestSelectedFurniPlacement(_loc3_)) {
                        this._inventory.removeUnseenFurniCounter(this._placedItemId);
                    }
                    break;
                case "p":
                    if (this._inventory.placePetToRoom(this._placedItemId, false)) {
                        this._inventory.removeUnseenPetCounter(this._placedItemId);
                    }
            }
        }
        this.resetAndHideInterface();
    };

    public requestSelectedFurniPlacement(param1: IFurnitureItem): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc2_: boolean = false;
        if (param1.category == 3 || param1.category == 2 || param1.category == 4) {
            _loc2_ = false;
        } else {
            _loc2_ = this._inventory.requestSelectedFurniToMover(param1);
        }
        return _loc2_;
    }

    private onPutInInventory = (param1: WindowEvent): void => {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: IRoomObject = null;
        let _loc2_: IWindow = param1.target;
        _loc2_.disable();
        if (this._placedItemId > 0 && this._placedInRoom) {
            if (this._placedItemType == "p") {
                (this._SafeStr_2143 instanceof FurniturePresentWidgetHandler ? this._SafeStr_2143 : null).container.roomSession.pickUpPet(this._placedItemId);
            } else {
                _loc4_ = (this._SafeStr_2143 instanceof FurniturePresentWidgetHandler ? this._SafeStr_2143 : null).container.roomSession.roomId;
                _loc5_ = 10;
                _loc3_ = this._roomEngine.getRoomObject(_loc4_, this._placedItemId, _loc5_);
                if (_loc3_ != null) {
                    this._roomEngine.modifyRoomObject(_loc3_.getId(), _loc5_, "OBJECT_PICKUP");
                }
            }
        }
        this.resetAndHideInterface();
    };

    private showInterface(): void {
        let _loc7_: string = null;
        let _loc15_: string = null;
        let _loc9_: IBorderWindow = null;
        let _loc14_: IStaticBitmapWrapperWindow = null;
        let _loc13_: string = null;
        let _loc16_: ITextWindow = null;
        let _loc3_: IStaticBitmapWrapperWindow = null;
        let _loc2_: string = null;
        let _loc4_: IWindow = null;
        let _loc10_: string = null;
        let _loc8_: IWindow = null;
        if (this._objectId < 0) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
        }
        let _loc12_: XmlAsset = asInstanceOf(this.assets.getAssetByName("packagecard_new"), XmlAsset);
        this._window = asGuarded(this.windowManager.buildFromXML(asInstanceOf(_loc12_.content, XML)), isIFrameWindow);
        this._window.center();
        if (!this.isUnknownSender()) {
            _loc7_ = "widget.furni.present.window.title_from";
            this._SafeStr_2259.registerParameter(_loc7_, "name", this._senderName);
            this._window.caption = this._SafeStr_2259.getLocalization(_loc7_, this._senderName);
        }
        let _loc11_: IWindow = this._window.findChildByName("header_button_close");
        if (_loc11_ != null) {
            _loc11_.addEventListener("WME_CLICK", this.onClose);
        }
        let _loc6_: IStaticBitmapWrapperWindow = asGuarded(this._window.findChildByName("gift_card"), isIStaticBitmapWrapperWindow);
        if (_loc6_) {
            _loc15_ = this._SafeStr_5124.getProperty("catalog.gift_wrapping_new.gift_card");
            if (_loc15_ != "") {
                _loc6_.assetUri = "${image.library.url}Giftcards/" + _loc15_ + ".png";
            }
        }
        this.prepareAvatarImageContainer();
        if (this.isUnknownSender()) {
            this.updateUnknownSenderAvatarImage();
        } else {
            this.updateGiftDialogAvatarImage(this._senderFigure);
        }
        if (!this._trustedSender) {
            _loc9_ = asGuarded(this._window.findChildByName("warning_foreground_border"), isIBorderWindow);
            if (_loc9_ != null) {
                _loc9_.color = 11599948;
            }
            _loc14_ = asGuarded(this._window.findChildByName("warning_icon"), isIStaticBitmapWrapperWindow);
            if (_loc14_ != null) {
                _loc14_.assetUri = "catalogue_icon_alert_s";
                _loc14_.width = 26;
                _loc14_.height = 26;
                _loc14_.x = 22;
                _loc14_.y = 12;
            }
            _loc13_ = "gift.untrusted.banner.text";
            this._SafeStr_2259.registerParameter(_loc13_, "name", "not trusted gift sender");
            _loc16_ = asGuarded(this._window.findChildByName("warning_text"), isITextWindow);
            if (_loc16_ != null) {
                _loc16_.text = this._SafeStr_2259.getLocalization(_loc13_, this._senderName);
            }
        } else {
            _loc3_ = asGuarded(this._window.findChildByName("gift_card"), isIStaticBitmapWrapperWindow);
            _loc3_.assetUri = "catalogue_giftcard_staff";
        }
        let _loc1_: ITextWindow = asGuarded(this._window.findChildByName("message_text"), isITextWindow);
        if (_loc1_ != null) {
            _loc1_.text = this._text;
        }
        let _loc18_: ITextWindow = asGuarded(this._window.findChildByName("message_from"), isITextWindow);
        if (_loc18_ != null) {
            _loc18_.text = "";
            if (!this.isUnknownSender()) {
                _loc2_ = "widget.furni.present.message_from";
                this._SafeStr_2259.registerParameter(_loc2_, "name", this._senderName);
                _loc18_.text = this._SafeStr_2259.getLocalization(_loc2_, this._senderName);
                _loc18_.addEventListener("WME_CLICK", this.onSenderNameClick);
            } else {
                _loc18_.visible = false;
            }
        }
        let _loc5_: IItemListWindow = asGuarded(this._window.findChildByName("button_list"), isIItemListWindow);
        if (_loc5_ != null) {
            _loc4_ = _loc5_.getListItemByName("give_gift_button");
            if (_loc4_ != null) {
                if (!this.isUnknownSender()) {
                    _loc10_ = "widget.furni.present.give_gift";
                    this._SafeStr_2259.registerParameter(_loc10_, "name", this._senderName);
                    _loc4_.caption = this._SafeStr_2259.getLocalization(_loc10_, this._senderName);
                }
                if (this._controller) {
                    _loc4_.addEventListener("WME_CLICK", this.onGiveGift);
                }
                if (!this._controller || this.isUnknownSender()) {
                    _loc4_.visible = false;
                }
            }
            _loc8_ = this._window.findChildByName("open_gift_button");
            if (_loc8_ != null) {
                if (this._controller) {
                    _loc8_.addEventListener("WME_CLICK", this.onOpenGift);
                } else {
                    _loc8_.visible = false;
                }
            }
            _loc5_.arrangeListItems();
        }
        let _loc17_: IItemListWindow = asGuarded(this._window.findChildByName("element_list"), isIItemListWindow);
        _loc17_.x = _loc17_.spacing;
        this._window.resizeToFitContent();
        _loc17_.parent.height = _loc17_.x + _loc17_.height;
    }

    private isUnknownSender(): boolean {
        return this._senderName == null || this._senderName.length == 0;
    }

    private onClose = (param1: WindowEvent): void => {
        this._SafeStr_2538 = false;
        this.hideInterface();
    };

    private onGiveGift = (param1: WindowEvent): void => {
        this.openGiftShop();
        HabboTracking.getInstance().trackEventLog("Catalog", "click", "client.return_gift_from_open_giftcard.clicked");
    };

    private onGiveGiftOpened = (param1: WindowEvent): void => {
        this.openGiftShop();
        HabboTracking.getInstance().trackEventLog("Catalog", "click", "client.return_gift_from_opened_present.clicked");
    };

    private openGiftShop(): void {
        if (!this.isUnknownSender()) {
            this._catalog.giftReceiver = this._senderName;
        }
        this._catalog.openCatalogPage("gift_shop");
    }

    private send(param1: IMessageComposer): void {
        let _loc2_: IConnection = null;
        if (this._catalog != null) {
            _loc2_ = this._catalog.connection;
            if (_loc2_ != null) {
                _loc2_.send(param1);
            }
        }
    }

    private getExtendedProfile(): void {
        if (!this.isUnknownSender()) {
            this.send(new GetExtendedProfileByNameMessageComposer(this._senderName));
        }
    }

    private onSenderImageClick = (param1: WindowEvent): void => {
        this.getExtendedProfile();
    };

    private onSenderNameClick = (param1: WindowEvent): void => {
        this.getExtendedProfile();
    };

    private onOpenGift = (param1: WindowEvent): void => {
        this.sendOpen();
    };

    public getAvatarFaceBitmap(param1: string): BitmapData {
        let _loc3_: IAvatarRenderManager = (this._SafeStr_2143 instanceof FurniturePresentWidgetHandler ? this._SafeStr_2143 : null).container.avatarRenderManager;
        if (_loc3_ == null || param1 == null || param1.length == 0) {
            return null;
        }
        let _loc2_: BitmapData = null;
        let _loc4_: IAvatarImage = _loc3_.createAvatarImage(param1, "h", null, this);
        if (_loc4_ != null) {
            _loc2_ = _loc4_.getCroppedImage("head");
            _loc4_.dispose();
        }
        return _loc2_;
    }

    public avatarImageReady(param1: string): void {
        if (this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        if (param1 == this._senderFigure) {
            this.updateGiftDialogAvatarImage(param1);
        }
    }

    private prepareAvatarImageContainer(): void {
        let _loc1_: IRegionWindow = asGuarded(this._window.findChildByName("avatar_image_region"), isIRegionWindow);
        if (_loc1_ != null) {
            if (!this.isUnknownSender()) {
                _loc1_.addEventListener("WME_CLICK", this.onSenderImageClick);
            } else {
                _loc1_.disable();
            }
        }
    }

    private updateGiftDialogAvatarImage(param1: string): void {
        let _loc2_: BitmapData = this.getAvatarFaceBitmap(param1);
        if (_loc2_ != null) {
            this.updateAvatarImageContainer(_loc2_);
        }
    }

    private updateUnknownSenderAvatarImage(): void {
        let _loc1_: BitmapData = null;
        let _loc2_: BitmapDataAsset = asInstanceOf(this._assets.getAssetByName("gift_incognito"), BitmapDataAsset);
        if (_loc2_ != null) {
            _loc1_ = asInstanceOf(_loc2_.content, BitmapData);
            if (_loc1_ != null) {
                this.updateAvatarImageContainer(_loc1_.clone());
            }
        }
    }

    private updateAvatarImageContainer(param1: BitmapData): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("avatar_image"), isIBitmapWrapperWindow);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this._window.findChildByName("staff_image"), isIWindowContainer);
        let _loc4_: IWindowContainer = asGuarded(this._window.findChildByName("avatar_image_container"), isIWindowContainer);
        if (this._trustedSender && this.isUnknownSender()) {
            _loc3_.disable();
            if (_loc2_ != null) {
                _loc2_.y = _loc4_.height / 2 - _loc3_.height / 2 | 0;
            }
        } else {
            _loc3_.bitmap = param1;
            _loc3_.width = param1.width;
            _loc3_.height = param1.height;
            _loc3_.x = _loc4_.width / 2 - _loc3_.width / 2 | 0;
            _loc3_.y = _loc4_.height / (this._trustedSender ? 1.5 : 2) - _loc3_.height / 2 | 0;
        }
        if (!this._trustedSender) {
            if (_loc2_ != null) {
                (asGuarded(_loc2_.parent, isIWindowContainer)).removeChild(_loc2_);
            }
        }
    }

    private hideInterface(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (!this._SafeStr_2538) {
            this._objectId = -1;
        }
        this._text = "";
        this._controller = false;
    }

    private sendOpen(): void {
        let _loc1_: RoomWidgetPresentOpenMessage = null;
        if (this._SafeStr_2538 || this._objectId == -1 || !this._controller) {
            return;
        }
        this._SafeStr_2538 = true;
        this.hideInterface();
        if (this.messageListener != null) {
            _loc1_ = new RoomWidgetPresentOpenMessage("RWPOM_OPEN_PRESENT", this._objectId);
            this.messageListener.processWidgetMessage(_loc1_);
        }
    }

    private selectGiftedObject(): void {
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: IRoomObject = null;
        let _loc1_: IUserData = null;
        if (this._placedItemId > 0 && this._placedInRoom) {
            _loc5_ = this._roomEngine.activeRoomId;
            if (this._placedItemType == "p") {
                _loc3_ = this._roomEngine.getRoomObjectCount(_loc5_, 100);
                _loc4_ = 0;
                while (_loc4_ < _loc3_) {
                    _loc2_ = this._roomEngine.getRoomObjectWithIndex(_loc5_, _loc4_, 100);
                    _loc1_ = (this._SafeStr_2143 instanceof FurniturePresentWidgetHandler ? this._SafeStr_2143 : null).container.roomSession.userDataManager.getUserDataByIndex(_loc2_.getId());
                    if (_loc1_ != null && _loc1_.webID == this._placedItemId) {
                        this._roomEngine.selectRoomObject(_loc5_, _loc1_.roomObjectId, 100);
                        break;
                    }
                    _loc4_++;
                }
            } else {
                this._roomEngine.selectRoomObject(_loc5_, this._placedItemId, 10);
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }
}

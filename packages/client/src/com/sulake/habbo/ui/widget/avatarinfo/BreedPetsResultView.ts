import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoWidget';
import type { BreedPetsResultData } from '@/com/sulake/habbo/ui/widget/avatarinfo/BreedPetsResultData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class BreedPetsResultView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::BreedPetsResultView'); }

    private static readonly ELEM_LIST: string = "element_list";
    private static readonly PREVIEW_LIST: string = "preview_list";
    private static readonly PREVIEW_BUTTONLIST: string = "preview_buttonlist";
    private static readonly ELEM_SEED1_ITEMLIST: string = "seed1_itemlist";
    private static readonly ELEM_SEED2_ITEMLIST: string = "seed2_itemlist";
    private static readonly ELEM_SEED1_BUTTONLIST: string = "seed1_buttonlist";
    private static readonly ELEM_SEED2_BUTTONLIST: string = "seed2_buttonlist";
    private static readonly _SafeStr_8036: string = "header_button_close";
    private static readonly _SafeStr_7716: string = "close_button";
    private static readonly _SafeStr_7593: string = "save_button";
    private static readonly ELEM_PLACE_BUTTON1: string = "place_button1";
    private static readonly ELEM_PLACE_BUTTON2: string = "place_button2";
    private static readonly ELEM_PICK_BUTTON1: string = "pick_button1";
    private static readonly ELEM_PICK_BUTTON2: string = "pick_button2";
    private static readonly ELEM_PREVIEW_IMAGE: string = "preview_image";
    private static readonly ELEM_PREVIEW_IMAGE2: string = "preview_image2";
    private static readonly _SafeStr_8186: string = "preview_image_region";
    private static readonly ELEM_PREVIEW_IMAGE_REGION2: string = "preview_image_region2";
    private static readonly ELEM_BUTTON_LIST: string = "button_list";
    private static readonly _SafeStr_7878: string = "description";
    private static readonly _SafeStr_8651: string = "description_sorry";
    private static readonly ELEM_INFO: string = "info";
    private static readonly _SafeStr_8743: string = "info_sorry";
    private static readonly ELEM_INFO_MUTATE1: string = "info_mutate1";
    private static readonly ELEM_INFO_MUTATE2: string = "info_mutate2";
    private static readonly _SafeStr_7683: string = "ok_button";

    constructor(param1: AvatarInfoWidget) {
        this._widget = param1;
        this._windowManager = param1.windowManager;
        this._assets = this._widget.assets;
        this._SafeStr_3587 = new UtilsMap();
    }

    declare private _window: IFrameWindow;

    private _disposed: boolean = false;

    declare private _widget: AvatarInfoWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_3587: UtilsMap;

    declare private _resultData: BreedPetsResultData;

    declare private _resultData2: BreedPetsResultData;

    declare private _SafeStr_3706: boolean;
    static { (this.prototype as any)._SafeStr_3706 = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._disposed = true;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_3587 != null) {
            this._SafeStr_3587.dispose();
        }
        this._SafeStr_3587 = null;
    }

    public open(param1: BreedPetsResultData, param2: BreedPetsResultData): void {
        this._resultData = param1;
        this._resultData2 = param2;
        this.setWindowContent();
        this.show();
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed) {
            return;
        }
        let _loc3_: string = stringOrNull(this._SafeStr_3587.getValue(param1));
        if (_loc3_ != null) {
            this.updatePreviewImage(param2, _loc3_);
        }
    }

    public imageFailed(param1: number): void {
    }

    public close(): void {
        if (this._widget) {
            this._widget.removeBreedPetsResultView(this);
        }
    }

    public show(): void {
        this._SafeStr_3706 = false;
        if (this._window) {
            this._window.visible = true;
        }
    }

    public roomObjectRemoved(param1: number): void {
        if (this._resultData == null || this._resultData2 == null) {
            return;
        }
        if (this._resultData.stuffId == param1 || this._resultData2.stuffId == param1) {
            this.updatePlacingButtons();
            this.show();
        }
    }

    public roomObjectAdded(param1: number): void {
        if (this._resultData == null || this._resultData2 == null) {
            return;
        }
        if (this._resultData.stuffId == param1 || this._resultData2.stuffId == param1) {
            this.updatePlacingButtons();
            this.show();
        }
    }

    public updatePlacingButtons(): void {
        this.updateButtons(this._resultData, "place_button1", "pick_button1");
        this.updateButtons(this._resultData2, "place_button2", "pick_button2");
        this.arrangeListItems();
    }

    private resolvePreviewImage(param1: number, param2: string): BitmapData {
        let _loc5_: BitmapData = null;
        let _loc4_: number = 0;
        let _loc3_: ImageResult = this._widget.handler.container.roomEngine.getFurnitureImage(param1, new Vector3d(90, 0, 0), 64, this, 0, null, -1, -1, null);
        if (_loc3_ != null) {
            _loc4_ = _loc3_.id;
            if (_loc4_ > 0) {
                this._SafeStr_3587.add(_loc4_, param2);
            }
            _loc5_ = _loc3_.data;
        }
        return _loc5_;
    }

    private setWindowContent(): void {
        let _loc3_: string = null;
        let _loc1_: IFurnitureData = this._widget.handler.container.sessionDataManager.getFloorItemData(this._resultData.classId);
        let _loc4_: IFurnitureData = this._widget.handler.container.sessionDataManager.getFloorItemData(this._resultData2.classId);
        this._widget.localizations.registerParameter("breedpetsresult.widget.seed1.name", "name", _loc1_ != null ? _loc1_.localizedName : "");
        this._widget.localizations.registerParameter("breedpetsresult.widget.seed2.name", "name", _loc4_ != null ? _loc4_.localizedName : "");
        this._widget.localizations.registerParameter("breedpetsresult.widget.seed1.description", "name", this._resultData.userName);
        this._widget.localizations.registerParameter("breedpetsresult.widget.seed2.description", "name", this._resultData2.userName);
        this._widget.localizations.registerParameter("breedpetsresult.widget.seed1.raritylevel", "level", this._resultData.rarityLevel.toString());
        this._widget.localizations.registerParameter("breedpetsresult.widget.seed2.raritylevel", "level", this._resultData2.rarityLevel.toString());
        let _loc7_: number = this._widget.handler.container.sessionDataManager.userId;
        let _loc5_: any = this._resultData.userId == _loc7_;
        let _loc6_: any = this._resultData2.userId == _loc7_;
        let _loc2_: boolean = !!(_loc5_ || _loc6_);
        if (!_loc2_) {
            _loc3_ = "";
            if (this._resultData.userName != null && this._resultData.userName != "") {
                _loc3_ = this._resultData.userName;
            } else if (this._resultData2.userName != null && this._resultData2.userName != "") {
                _loc3_ = this._resultData2.userName;
            }
            this._widget.localization.registerParameter("breedpetsresult.widget.text.sorry", "name", _loc3_);
        }
        if (!this._window) {
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName("breed_pets_result_xml").content, XML)), isIFrameWindow);
            this.addClickListener("header_button_close");
        }
        this._window.center();
        this._window.visible = true;
        this.enableElement("seed1_buttonlist", false);
        this.enableElement("seed2_buttonlist", false);
        this.enableElement("place_button1", false);
        this.enableElement("pick_button1", false);
        this.enableElement("place_button2", false);
        this.enableElement("pick_button2", false);
        this.enableElement("close_button", false);
        if (_loc5_) {
            this.enableElement("place_button1", true);
            this.enableElement("seed1_buttonlist", true);
        }
        if (_loc6_) {
            this.enableElement("place_button2", true);
            this.enableElement("seed2_buttonlist", true);
        }
        if (_loc2_) {
            this.enableElement("preview_buttonlist", true);
        }
        this.enableElement("seed2_itemlist", true);
        if (this._resultData2.stuffId == -1) {
            this.enableElement("seed2_itemlist", false);
        }
        this.enableElement("description", true);
        this.enableElement("info", true);
        this.enableElement("description_sorry", false);
        this.enableElement("info", false);
        this.enableElement("button_list", false);
        this.enableElement("close_button", false);
        if (!_loc2_) {
            this.enableElement("preview_buttonlist", false);
            this.enableElement("description", false);
            this.enableElement("info", false);
            this.enableElement("save_button", false);
            this.enableElement("place_button1", false);
            this.enableElement("pick_button1", false);
            this.enableElement("place_button2", false);
            this.enableElement("pick_button2", false);
            this.enableElement("button_list", true);
            this.enableElement("description_sorry", true);
            this.enableElement("info_sorry", true);
            this.enableElement("close_button", true);
        }
        this.enableElement("info_mutate1", false);
        this.enableElement("info_mutate2", false);
        if (this._resultData.hasMutation) {
            this.enableElement("info_mutate1", true);
        }
        if (this._resultData2.hasMutation) {
            this.enableElement("info_mutate2", true);
        }
        this.addClickListener("save_button");
        this.addClickListener("header_button_close");
        this.addClickListener("close_button");
        this.addClickListener("place_button1");
        this.addClickListener("place_button2");
        this.addClickListener("pick_button1");
        this.addClickListener("pick_button2");
        this.addClickListener("preview_image_region");
        this.addClickListener("preview_image_region2");
        let _loc8_: BitmapData = this.resolvePreviewImage(_loc1_.id, "preview_image");
        this.updatePreviewImage(_loc8_ != null ? _loc8_ : new BitmapData(10, 10), "preview_image");
        _loc8_ = this.resolvePreviewImage(_loc1_.id, "preview_image2");
        this.updatePreviewImage(_loc8_ != null ? _loc8_ : new BitmapData(10, 10), "preview_image2");
        this.arrangeListItems();
        this._window.invalidate();
    }

    private enableElement(param1: string, param2: boolean): void {
        let _loc3_: IWindow = this._window.findChildByName(param1);
        if (_loc3_ != null) {
            _loc3_.visible = param2;
        }
    }

    private arrangeListItems(): void {
        this.arrangeListItem("seed1_itemlist");
        this.arrangeListItem("seed2_itemlist");
        this.arrangeListItem("seed1_buttonlist");
        this.arrangeListItem("seed2_buttonlist");
        this.arrangeListItem("preview_buttonlist");
        this.arrangeListItem("button_list");
        this.arrangeListItem("preview_list");
        this.arrangeListItem("element_list");
        this._window.resizeToFitContent();
    }

    private arrangeListItem(param1: string): void {
        let _loc2_: IItemListWindow = asGuarded(this._window.findChildByName(param1), isIItemListWindow);
        if (_loc2_ != null) {
            _loc2_.arrangeListItems();
        }
    }

    private updatePreviewImage(param1: BitmapData, param2: string): void {
        let _loc5_: BitmapData = null;
        if (!this._window || !param1) {
            return;
        }
        let _loc6_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName(param2), isIBitmapWrapperWindow);
        _loc6_.bitmap = new BitmapData(_loc6_.width, _loc6_.height);
        let _loc3_: IAsset = asGuarded(this._assets.getAssetByName("breed_pets_preview_bg_png"), isIAsset);
        if (_loc3_) {
            _loc5_ = asInstanceOf(_loc3_.content, BitmapData);
            _loc6_.bitmap.copyPixels(_loc5_, _loc5_.rect, new Point(0, 0));
        }
        let _loc4_: Point = new Point((_loc6_.width - param1.width) / 2, (_loc6_.height - param1.height) / 2);
        _loc6_.bitmap.copyPixels(param1, param1.rect, _loc4_, null, null, true);
    }

    private hide(): void {
        if (this._window) {
            this._window.visible = false;
        }
    }

    private addClickListener(param1: string): void {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseClick);
        }
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        switch (param1.target.name) {
            case "header_button_close":
            case "close_button":
                this.close();
                break;
            case "place_button1":
                this._SafeStr_3706 = this.placeItemToRoom(this._resultData.stuffId);
                if (this._SafeStr_3706) {
                    this.close();
                }
                break;
            case "place_button2":
                this._SafeStr_3706 = this.placeItemToRoom(this._resultData2.stuffId);
                if (this._SafeStr_3706) {
                    this.close();
                }
                break;
            case "pick_button1":
                this.pickItemFromRoom(this._resultData.stuffId);
                break;
            case "pick_button2":
                this.pickItemFromRoom(this._resultData2.stuffId);
                break;
            case "preview_image_region":
                this.selectItemFromInventoryOrRoom(this._resultData.stuffId);
                break;
            case "preview_image_region2":
                this.selectItemFromInventoryOrRoom(this._resultData2.stuffId);
                break;
            case "ok_button":
                this.hide();
                break;
            case "save_button":
                this.hide();
        }
    };

    private selectItemFromInventoryOrRoom(param1: number): boolean {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: IFurnitureItem = this.findInventoryFloorItemById(param1);
        if (_loc2_ != null) {
            this._widget.handler.container.inventory.toggleInventoryPage("furni");
            return true;
        }
        let _loc3_: IRoomObject = this.findRoomObject(param1);
        if (_loc3_ != null) {
            _loc4_ = this._widget.handler.container.roomSession.roomId;
            _loc5_ = 10;
            this._widget.handler.container.roomEngine.selectRoomObject(_loc4_, _loc3_.getId(), _loc5_);
            return true;
        }
        return false;
    }

    private pickItemFromRoom(param1: number): boolean {
        let _loc2_: IRoomObject = this.findRoomObject(param1);
        if (_loc2_ != null) {
            this._widget.handler.container.roomEngine.modifyRoomObject(_loc2_.getId(), 10, "OBJECT_PICKUP");
            return true;
        }
        return false;
    }

    private placeItemToRoom(param1: number): boolean {
        let _loc2_: IFurnitureItem = this.findInventoryFloorItemById(param1);
        return this.requestSelectedFurniPlacement(_loc2_);
    }

    private findRoomObject(param1: number): IRoomObject {
        let _loc3_: number = this._widget.handler.container.roomSession.roomId;
        let _loc4_: number = 10;
        return this._widget.handler.container.roomEngine.getRoomObject(_loc3_, param1, _loc4_);
    }

    private findInventoryFloorItemById(param1: number): IFurnitureItem {
        if (this._widget == null) {
            return null;
        }
        let _loc3_: IHabboInventory = this._widget.handler.container.inventory;
        if (_loc3_ == null) {
            return null;
        }
        return _loc3_.getFloorItemById(-param1);
    }

    private requestSelectedFurniPlacement(param1: IFurnitureItem): boolean {
        if (param1 == null || this._widget == null) {
            return false;
        }
        let _loc3_: IHabboInventory = this._widget.handler.container.inventory;
        if (_loc3_ == null) {
            return false;
        }
        let _loc2_: boolean = false;
        if (param1.category == 3 || param1.category == 2 || param1.category == 4) {
            _loc2_ = false;
        } else {
            _loc2_ = _loc3_.requestSelectedFurniToMover(param1);
        }
        return _loc2_;
    }

    private updateButtons(param1: BreedPetsResultData, param2: string, param3: string): void {
        let _loc5_: IFurnitureItem = null;
        if (this._window == null || param1 == null) {
            return;
        }
        let _loc10_: number = this._widget.handler.container.sessionDataManager.userId;
        let _loc4_: any = param1.userId == _loc10_;
        let _loc9_: boolean = false;
        let _loc8_: boolean = false;
        let _loc7_: IRoomObject = this.findRoomObject(param1.stuffId);
        if (_loc7_ != null) {
            _loc8_ = true;
        }
        if (!_loc8_) {
            _loc5_ = this.findInventoryFloorItemById(param1.stuffId);
            if (_loc5_ != null) {
                _loc9_ = true;
            }
        }
        let _loc6_: IWindow = this._window.findChildByName(param2);
        let _loc11_: IWindow = this._window.findChildByName(param3);
        if (_loc6_ != null) {
            _loc6_.visible = false;
            if (_loc4_) {
                if (_loc9_) {
                    _loc6_.visible = true;
                }
                if (!_loc9_ && !_loc8_) {
                    _loc6_.visible = true;
                }
            }
        }
        if (_loc11_ != null) {
            _loc11_.visible = false;
            if (_loc4_) {
                if (_loc8_) {
                    _loc11_.visible = true;
                }
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}

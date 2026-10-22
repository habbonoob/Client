import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class BreedMonsterPlantsConfirmationView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::BreedMonsterPlantsConfirmationView'); }

    private static readonly STATE_NORMAL: number = 0;
    private static readonly STATE_REQUESTED: number = 1;
    private static readonly ELEM_LIST: string = "element_list";
    private static readonly PREVIEW_LIST: string = "preview_list";
    private static readonly ELEM_PLANT1_ITEMLIST: string = "plant1_itemlist";
    private static readonly ELEM_PLANT2_ITEMLIST: string = "plant2_itemlist";
    private static readonly _SafeStr_7878: string = "description";
    private static readonly ELEM_REQUEST: string = "request";
    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7593: string = "save_button";
    private static readonly _SafeStr_8418: string = "accept_button";
    private static readonly _SafeStr_7763: string = "cancel_button";
    private static readonly _SafeStr_7683: string = "ok_button";
    private static readonly BUTTON_LIST: string = "button_list";

    declare private _window: IFrameWindow;

    private _disposed: boolean = false;

    declare private _widget: AvatarInfoWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_3587: UtilsMap;

    declare private _requestRoomObjectId: number;
    static { (this.prototype as any)._requestRoomObjectId = 0; }

    declare private _targetRoomObjectId: number;
    static { (this.prototype as any)._targetRoomObjectId = 0; }

    declare private _SafeStr_2395: IUserData;

    declare private _petData2: IUserData;

    private _state: number = 0;

    constructor(param1: AvatarInfoWidget) {
        this._widget = param1;
        this._windowManager = param1.windowManager;
        this._assets = this._widget.assets;
        this._SafeStr_3587 = new UtilsMap();
    }

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

    public get requestRoomObjectId(): number {
        return this._requestRoomObjectId;
    }

    public get targetRoomObjectId(): number {
        return this._targetRoomObjectId;
    }

    public open(param1: number, param2: number, param3: boolean): void {
        this._requestRoomObjectId = param1;
        this._targetRoomObjectId = param2;
        this._SafeStr_2395 = this._widget.handler.roomSession.userDataManager.getUserDataByIndex(param1);
        this._petData2 = this._widget.handler.roomSession.userDataManager.getUserDataByIndex(param2);
        this._state = param3 ? 1 : 0;
        this.setWindowContent();
        this._window.visible = true;
    }

    private resolvePreviewImage(param1: string, param2: string): BitmapData {
        let _loc7_: BitmapData = null;
        let _loc6_: number = 0;
        let _loc3_: PetFigureData = new PetFigureData(param1);
        let _loc4_: string = "std";
        let _loc5_: ImageResult = this._widget.handler.roomEngine.getPetImage(_loc3_.typeId, _loc3_.paletteId, _loc3_.color, new Vector3d(90), 64, this, true, 0, _loc3_.customParts, _loc4_);
        if (_loc5_ != null) {
            _loc6_ = _loc5_.id;
            if (_loc6_ > 0) {
                this._SafeStr_3587.add(_loc6_, param2);
            }
            _loc7_ = _loc5_.data;
        }
        return _loc7_;
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

    private setWindowContent(): void {
        this._widget.localizations.registerParameter("breedpets.widget.title", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("breedpets.widget.plant1.name", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("breedpets.widget.plant2.name", "name", this._petData2.name);
        this._widget.localizations.registerParameter("breedpets.widget.plant1.description", "name", this._SafeStr_2395.ownerName);
        this._widget.localizations.registerParameter("breedpets.widget.plant2.description", "name", this._petData2.ownerName);
        this._widget.localizations.registerParameter("breedpets.widget.plant1.raritylevel", "level", this._SafeStr_2395.rarityLevel.toString());
        this._widget.localizations.registerParameter("breedpets.widget.plant2.raritylevel", "level", this._petData2.rarityLevel.toString());
        this._widget.localizations.registerParameter("breedpets.widget.request", "name", this._petData2.ownerName);
        if (!this._window) {
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName("breed_pets_confirmation_xml").content, XML)), isIFrameWindow);
            this.addClickListener("header_button_close");
        }
        this._window.center();
        this._window.visible = true;
        this.addClickListener("save_button");
        this.addClickListener("accept_button");
        this.addClickListener("cancel_button");
        this.enableElement("description", false);
        this.enableElement("request", false);
        this.enableElement("save_button", false);
        this.enableElement("save_button", false);
        this.enableElement("accept_button", false);
        this.enableElement("cancel_button", true);
        this.enableElement("cancel_button", true);
        switch (this._state) {
            case 0:
                this.enableElement("description", true);
                this.enableElement("save_button", true);
                break;
            case 1:
                this.enableElement("request", true);
                this.enableElement("accept_button", true);
        }
        let _loc1_: BitmapData = this.resolvePreviewImage(this._SafeStr_2395.figure, "preview_image");
        this.updatePreviewImage(_loc1_ ?? new BitmapData(10, 10), "preview_image");
        _loc1_ = this.resolvePreviewImage(this._petData2.figure, "preview_image2");
        this.updatePreviewImage(_loc1_ ?? new BitmapData(10, 10), "preview_image2");
        this.arrangeListItems();
        this._window.invalidate();
    }

    private arrangeListItems(): void {
        this.arrangeListItem("button_list");
        this.arrangeListItem("plant1_itemlist");
        this.arrangeListItem("plant2_itemlist");
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

    private close(): void {
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

    private enableElement(param1: string, param2: boolean): void {
        let _loc3_: IWindow = this._window.findChildByName(param1);
        if (_loc3_ != null) {
            _loc3_.visible = param2;
        }
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel_button":
                this._widget.cancelBreedPets(this._requestRoomObjectId, this._targetRoomObjectId);
                this.close();
                break;
            case "ok_button":
                this.close();
                break;
            case "accept_button":
                this.close();
                this._widget.acceptBreedPets(this._requestRoomObjectId, this._targetRoomObjectId);
                break;
            case "save_button":
                this._widget.breedPets(this._requestRoomObjectId, this._targetRoomObjectId);
                if (this._SafeStr_2395.ownerId != this._petData2.ownerId) {
                    this._widget.showBreedingPetsWaitingConfirmationAlert(this.requestRoomObjectId, this._targetRoomObjectId);
                }
                this.close();
        }
    };

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}

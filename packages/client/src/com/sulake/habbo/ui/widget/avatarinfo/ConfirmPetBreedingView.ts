import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
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
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class ConfirmPetBreedingView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::ConfirmPetBreedingView'); }

    private static readonly ELEM_LIST: string = "element_list";
    private static readonly PREVIEW_LIST: string = "preview_list";
    private static readonly ELEM_PET1_ITEMLIST: string = "pet1_itemlist";
    private static readonly ELEM_PET2_ITEMLIST: string = "pet2_itemlist";
    private static readonly _SafeStr_7878: string = "description";
    private static readonly ELEM_REQUEST: string = "request";
    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7593: string = "save_button";
    private static readonly _SafeStr_8418: string = "accept_button";
    private static readonly _SafeStr_7763: string = "cancel_button";
    private static readonly _SafeStr_7683: string = "ok_button";
    private static readonly BUTTON_LIST: string = "button_list";

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

    declare private _requestRoomObjectId: number;
    static { (this.prototype as any)._requestRoomObjectId = 0; }

    declare private _targetRoomObjectId: number;
    static { (this.prototype as any)._targetRoomObjectId = 0; }

    declare private _SafeStr_2395: IUserData;

    declare private _petData2: IUserData;

    private _SafeStr_8645: boolean = false;

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    declare private _rarityCategories: any[];

    declare private _resultPetTypeId: number;
    static { (this.prototype as any)._resultPetTypeId = 0; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get requestRoomObjectId(): number {
        return this._requestRoomObjectId;
    }

    public get targetRoomObjectId(): number {
        return this._targetRoomObjectId;
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

    public open(param1: number, param2: number, param3: number, param4: any[], param5: number, param6: number, param7: number): void {
        this._requestRoomObjectId = param1;
        this._targetRoomObjectId = param2;
        this._SafeStr_2395 = this._widget.handler.roomSession.userDataManager.getUserDataByIndex(param1);
        this._petData2 = this._widget.handler.roomSession.userDataManager.getUserDataByIndex(param2);
        this._SafeStr_2395.petLevel = param6;
        this._petData2.petLevel = param7;
        this._rarityCategories = param4;
        this._resultPetTypeId = param5;
        this._stuffId = param3;
        this.setWindowContent();
        this._window.visible = true;
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
        if (this._window) {
            this._window.visible = false;
        }
    }

    public enable(): void {
        this.enableElement("description", false, false);
        this.enableElement("request", false, false);
        this.enableElement("cancel_button", true, true);
        this.enableElement("description", true, true);
        this.enableElement("save_button", true, true);
    }

    private resolvePreviewImage(param1: string, param2: string, param3: number = 64): BitmapData {
        let _loc8_: BitmapData = null;
        let _loc7_: number = 0;
        let _loc4_: PetFigureData = new PetFigureData(param1);
        let _loc5_: string = "std";
        let _loc6_: ImageResult = this._widget.handler.roomEngine.getPetImage(_loc4_.typeId, _loc4_.paletteId, _loc4_.color, new Vector3d(90), param3, this, true, 0, _loc4_.customParts, _loc5_);
        if (_loc6_ != null) {
            _loc7_ = _loc6_.id;
            if (_loc7_ > 0) {
                this._SafeStr_3587.add(_loc7_, param2);
            }
            _loc8_ = _loc6_.data;
        }
        return _loc8_;
    }

    private setWindowContent(): void {
        let _loc7_: any;
        let _loc8_: IItemListWindow = null;
        let _loc1_: PetFigureData = null;
        let _loc5_: IBitmapWrapperWindow = null;
        this._widget.localizations.registerParameter("breedpets.widget.title", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("breedpets.widget.pet1.name", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("breedpets.widget.pet2.name", "name", this._petData2.name);
        this._widget.localizations.registerParameter("breedpets.widget.pet1.description", "name", this._SafeStr_2395.ownerName);
        this._widget.localizations.registerParameter("breedpets.widget.pet2.description", "name", this._petData2.ownerName);
        this._widget.localizations.registerParameter("breedpets.widget.pet1.level", "level", this._SafeStr_2395.petLevel.toString());
        this._widget.localizations.registerParameter("breedpets.widget.pet2.level", "level", this._petData2.petLevel.toString());
        this._widget.localizations.registerParameter("breedpets.widget.request", "name", this._petData2.ownerName);
        if (!this._window) {
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName("confirm_pet_breeding_xml").content, XML)), isIFrameWindow);
            this.addClickListener("header_button_close");
        }
        this._window.center();
        this._window.visible = true;
        this.addClickListener("save_button");
        this.addClickListener("cancel_button");
        this.enable();
        let _loc6_: BitmapData = this.resolvePreviewImage(this._SafeStr_2395.figure, "preview_image");
        this.updatePreviewImage(_loc6_ != null ? _loc6_ : new BitmapData(10, 10), "preview_image");
        _loc6_ = this.resolvePreviewImage(this._petData2.figure, "preview_image2");
        this.updatePreviewImage(_loc6_ != null ? _loc6_ : new BitmapData(10, 10), "preview_image2");
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName("pet_breeding_pet_preview_xml").content, XML)), isIBitmapWrapperWindow);
        let _loc2_: number = 1;
        for (const _loc3_ of this._rarityCategories ?? []) {
            this._widget.localizations.registerParameter("breedpets.confirmation.widget.raritycategory." + _loc2_, "percent", stringOrNull(_loc3_.chance.toString()));
            _loc8_ = asGuarded(this._window.findChildByName("breeds" + _loc2_), isIItemListWindow);
            _loc8_.removeListItems();
            for (_loc7_ of valuesOf(_loc3_.breeds)) {
                _loc1_ = new PetFigureData([this._resultPetTypeId, _loc7_].join(" "));
                _loc5_ = asGuarded(_loc4_.clone(), isIBitmapWrapperWindow);
                _loc5_.name = "breed." + _loc7_;
                _loc5_.bitmap = new BitmapData(_loc5_.width, _loc5_.height, true, 16777215);
                if (_loc8_) {
                    _loc8_.addListItem(_loc5_);
                }
                _loc6_ = this.resolvePreviewImage(_loc1_.figureString, _loc5_.name, 64);
                this.updatePreviewImage(_loc6_ != null ? _loc6_ : new BitmapData(25, 25, true, 16777215), _loc5_.name);
            }
            _loc2_++;
        }
        this.arrangeListItems();
        (asGuarded(this._window.findChildByName("puppy.name.input"), isITextFieldWindow)).setSelection(0, 0);
        this._window.invalidate();
    }

    private arrangeListItems(): void {
        this.arrangeListItem("button_list");
        this.arrangeListItem("pet1_itemlist");
        this.arrangeListItem("pet2_itemlist");
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
        if (!this._window || !param1) {
            return;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName(param2), isIBitmapWrapperWindow);
        _loc4_.bitmap = new BitmapData(_loc4_.width, _loc4_.height, true, 16777215);
        let _loc3_: Point = new Point((_loc4_.width - param1.width) / 2, (_loc4_.height - param1.height) / 2);
        _loc4_.bitmap.copyPixels(param1, param1.rect, _loc3_, null, null, true);
    }

    private disable(): void {
        this.enableElement("description", false, false);
        this.enableElement("request", false, false);
        this.enableElement("cancel_button", false, true);
        this.enableElement("description", false, true);
        this.enableElement("save_button", false, true);
    }

    private addClickListener(param1: string): void {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseClick);
        }
    }

    private enableElement(param1: string, param2: boolean, param3: boolean): void {
        let _loc4_: IWindow = this._window.findChildByName(param1);
        if (_loc4_ != null) {
            _loc4_.visible = param3;
            if (param2) {
                _loc4_.enable();
            } else {
                _loc4_.disable();
            }
        }
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        let _loc2_: string = null;
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel_button":
                this._widget.cancelPetBreeding(this._stuffId);
                this.close();
                break;
            case "ok_button":
                this.disable();
                break;
            case "save_button":
                _loc2_ = this._window.findChildByName("puppy.name.input").caption;
                if (_loc2_.length == 0) {
                    this._windowManager.simpleAlert("${breedpets.confirmation.alert.title}", "${breedpets.confirmation.alert.name.required.head}", "${breedpets.confirmation.alert.name.required.desc}");
                    break;
                }
                this._widget.confirmPetBreeding(this._stuffId, _loc2_, this._SafeStr_2395.webID, this._petData2.webID);
                this.disable();
        }
    };

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}

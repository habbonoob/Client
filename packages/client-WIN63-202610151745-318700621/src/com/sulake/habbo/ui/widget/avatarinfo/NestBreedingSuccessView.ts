import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
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
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class NestBreedingSuccessView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::NestBreedingSuccessView'); }

    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7763: string = "cancel_button";
    private static readonly _SafeStr_7683: string = "button.ok";

    declare private _window: IFrameWindow;

    private _disposed: boolean = false;

    declare private _widget: AvatarInfoWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_2395: IUserData;

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _SafeStr_3587: UtilsMap;

    declare private _rarityCategory: number;
    static { (this.prototype as any)._rarityCategory = 0; }

    constructor(param1: AvatarInfoWidget) {
        this._widget = param1;
        this._windowManager = param1.windowManager;
        this._assets = this._widget.assets;
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
    }

    public open(param1: number, param2: number): void {
        this._petId = param1;
        this._SafeStr_2395 = this._widget.handler.roomSession.userDataManager.getUserDataByIndex(param1);
        if (this._SafeStr_2395 == null) {
            Logger.log("Couldn\'t find the correct pet.");
            return;
        }
        this._rarityCategory = param2;
        this.setWindowContent();
        this._window.visible = true;
    }

    private setWindowContent(): void {
        if (!this._window) {
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName("nestBreedingSuccess_xml").content, XML)), isIFrameWindow);
            this.addClickListener("header_button_close");
        }
        this._window.center();
        this._window.visible = true;
        this.addClickListener("button.ok");
        this._window.findChildByName("pet.name").caption = this._SafeStr_2395.name;
        this._window.findChildByName("pet.raritycategory").caption = "${breedpets.nestbreeding.success.raritycategory." + this._rarityCategory + "}";
        let _loc1_: BitmapData = this.resolvePreviewImage(this._SafeStr_2395.figure, "pet_image");
        this.updatePreviewImage(_loc1_ ?? new BitmapData(10, 10), "pet_image");
        this._window.invalidate();
    }

    public close(): void {
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
            case "cancel_button":
                this.close();
                break;
            case "button.ok":
                this.close();
        }
    };

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

    private updatePreviewImage(param1: BitmapData, param2: string): void {
        if (!this._window || !param1) {
            return;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName(param2), isIBitmapWrapperWindow);
        _loc4_.bitmap = new BitmapData(_loc4_.width, _loc4_.height, true, 16777215);
        let _loc3_: Point = new Point((_loc4_.width - param1.width) / 2, (_loc4_.height - param1.height) / 2);
        _loc4_.bitmap.copyPixels(param1, param1.rect, _loc3_, null, null, true);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}

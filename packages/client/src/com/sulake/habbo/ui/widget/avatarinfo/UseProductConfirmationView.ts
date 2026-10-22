import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { PetColorResult } from '@/com/sulake/habbo/room/PetColorResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIAsset } from '@/com/sulake/core/assets/IAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { PetCustomPart } from '@/com/sulake/habbo/avatar/pets/PetCustomPart';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { RoomWidgetUseProductMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUseProductMessage';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class UseProductConfirmationView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::UseProductConfirmationView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        UseProductConfirmationView.#initStatics();
        return UseProductConfirmationView._log;
    }

    private static readonly PRODUCT_PAGE_UKNOWN: number = -1;
    private static readonly PRODUCT_PAGE_SHAMPOO: number = 0;
    private static readonly PRODUCT_PAGE_CUSTOM_PART: number = 1;
    private static readonly PRODUCT_PAGE_CUSTOM_PART_SHAMPOO: number = 2;
    private static readonly PRODUCT_PAGE_SADDLE: number = 3;
    private static readonly PRODUCT_PAGE_REVIVE: number = 4;
    private static readonly PRODUCT_PAGE_REBREED: number = 5;
    private static readonly PRODUCT_PAGE_FERTILIZE: number = 6;
    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7593: string = "save_button";
    private static readonly _SafeStr_7595: string = "cancel_text";
    private static readonly _SafeStr_7683: string = "ok_button";
    private static readonly _SafeStr_8186: string = "preview_image_region";

    constructor(param1: AvatarInfoWidget) {
        this._widget = param1;
        this._windowManager = param1.windowManager;
        this._assets = this._widget.assets;
    }

    declare private _window: IWindowContainer;

    private _disposed: boolean = false;

    declare private _widget: AvatarInfoWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    private _requestObjectId: number = -1;
    private _targetRoomObjectId: number = -1;

    declare private _previewCallbackId: number;
    static { (this.prototype as any)._previewCallbackId = 0; }

    declare private _furnitureData: IFurnitureData;

    declare private _SafeStr_2395: IUserData;

    public get requestObjectId(): number {
        return this._requestObjectId;
    }

    public get targetRoomObjectId(): number {
        return this._targetRoomObjectId;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._disposed = true;
        this._furnitureData = null;
        this._SafeStr_2395 = null;
    }

    public open(param1: number, param2: number, param3: number): void {
        let _loc5_: number = this._widget.handler.roomSession.roomId;
        let _loc6_: IRoomObject = this._widget.handler.roomEngine.getRoomObject(_loc5_, param1, 10);
        if (_loc6_ != null) {
            this._furnitureData = this._widget.handler.getFurniData(_loc6_);
            this._requestObjectId = _loc6_.getId();
        } else {
            this._furnitureData = this._widget.handler.container.sessionDataManager.getFloorItemData(param1);
            this._requestObjectId = param3;
        }
        this._targetRoomObjectId = param2;
        this._SafeStr_2395 = this._widget.handler.roomSession.userDataManager.getUserDataByIndex(param2);
        let _loc4_: number = -1;
        switch (this._furnitureData.category - 13) {
            case 0:
                _loc4_ = 0;
                break;
            case 1:
                _loc4_ = 1;
                break;
            case 2:
                _loc4_ = 2;
                break;
            case 3:
                _loc4_ = 3;
                break;
            case 7:
                _loc4_ = 4;
                break;
            case 8:
                _loc4_ = 5;
                break;
            case 9:
                _loc4_ = 6;
                break;
            default:
                UseProductConfirmationView._log.warn("[UseProductConfirmationView.open()] Unsupported furniture category: " + this._furnitureData.category);
        }
        this.setWindowContent(_loc4_);
        this._window.center();
        this._window.visible = true;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed) {
            return;
        }
        if (this._previewCallbackId == param1) {
            this.updatePreviewImage(param2);
            this._previewCallbackId = 0;
        }
    }

    public imageFailed(param1: number): void {
    }

    private setWindowContent(param1: number): void {
        let _loc3_: string = null;
        let _loc2_: BitmapData = new BitmapData(10, 10);
        this._widget.localizations.registerParameter("useproduct.widget.title", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("useproduct.widget.title.monsterplant", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("useproduct.widget.title.monsterplant_rebreed", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("useproduct.widget.title.monsterplant_fertilize", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("useproduct.widget.title.monsterplant_rebreed", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("useproduct.widget.monsterplant.plant.name", "name", this._SafeStr_2395.name);
        this._widget.localizations.registerParameter("useproduct.widget.monsterplant.plant.raritylevel", "level", this._SafeStr_2395.rarityLevel.toString());
        this._widget.localizations.registerParameter("useproduct.widget.monsterplant.plant.description", "name", this._SafeStr_2395.ownerName);
        if (!this._window) {
            _loc3_ = "use_product_widget_frame_xml";
            switch (param1 - 4) {
                case 0:
                    _loc3_ = "use_product_widget_frame_monsterplant_xml";
                    break;
                case 1:
                    _loc3_ = "use_product_widget_frame_monsterplant_rebreed_xml";
                    break;
                case 2:
                    _loc3_ = "use_product_widget_frame_monsterplant_fertilize_xml";
                    break;
                default:
                    _loc3_ = "use_product_widget_frame_xml";
            }
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName(_loc3_).content, XML)), isIWindowContainer);
            this.addClickListener("header_button_close");
        }
        this._widget.localizations.registerParameter("useproduct.widget.text.saddle", "productName", this._furnitureData.localizedName);
        this._widget.localizations.registerParameter("useproduct.widget.text.custompart", "productName", this._furnitureData.localizedName);
        this._widget.localizations.registerParameter("useproduct.widget.text.custompartshampoo", "productName", this._furnitureData.localizedName);
        this._widget.localizations.registerParameter("useproduct.widget.text.shampoo", "productName", this._furnitureData.localizedName);
        this._widget.localizations.registerParameter("useproduct.widget.text.revive_monsterplant", "productName", this._furnitureData.localizedName);
        (isIFrameWindow(this._window) ? this._window : null).content.removeChildAt(0);
        let _loc4_: IWindow = this.createWindow(param1);
        (isIFrameWindow(this._window) ? this._window : null).content.addChild(_loc4_);
        (isIFrameWindow(this._window) ? this._window : null).resizeToFitContent();
        switch (param1) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                this.addClickListener("preview_image_region");
                this.addClickListener("save_button");
                this.addClickListener("cancel_text");
                _loc2_ = this.resolvePreviewImage(this._furnitureData);
                this.updatePreviewImage(_loc2_);
                this._window.invalidate();
                return;
            default:
                throw new Error("Invalid type for use product confirmation content apply: " + param1);
        }
    }

    private createWindow(param1: number): IWindow {
        let _loc2_: IAsset = null;
        let _loc3_: any = null;
        switch (param1) {
            case 0:
                _loc2_ = this._assets.getAssetByName("use_product_controller_shampoo_xml");
                break;
            case 1:
                _loc2_ = this._assets.getAssetByName("use_product_controller_custom_part_xml");
                break;
            case 2:
                _loc2_ = this._assets.getAssetByName("use_product_controller_custom_part_shampoo_xml");
                break;
            case 3:
                _loc2_ = this._assets.getAssetByName("use_product_controller_saddle_xml");
                break;
            case 4:
                _loc2_ = this._assets.getAssetByName("use_product_controller_revive_monsterplant_xml");
                break;
            case 5:
                _loc2_ = this._assets.getAssetByName("use_product_controller_rebreed_monsterplant_xml");
                break;
            case 6:
                _loc2_ = this._assets.getAssetByName("use_product_controller_fertilize_monsterplant_xml");
                break;
            default:
                throw new Error("Invalid type for Use Product View content creation: " + param1);
        }
        return asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindow);
    }

    private resolvePreviewImage(param1: IFurnitureData): BitmapData {
        let _loc7_: ImageResult = null;
        let _loc21_: any[] = null;
        let _loc16_: any[] = null;
        let _loc18_: any[] = null;
        let _loc9_: number = 0;
        let _loc23_: BitmapData = null;
        let _loc2_: number = 0;
        let _loc14_: number = 0;
        let _loc5_: number = 0;
        let _loc20_: PetCustomPart = null;
        let _loc19_: string = null;
        let _loc11_: any[] = null;
        let _loc10_: PetColorResult = null;
        let _loc8_: string = null;
        let _loc15_: IRoomObject = null;
        let _loc6_: number = 0;
        if (!param1) {
            return null;
        }
        let _loc12_: PetFigureData = new PetFigureData(this._SafeStr_2395.figure);
        let _loc3_: any[] = param1.customParams.split(" ");
        let _loc17_: number = _loc3_[0] | 0;
        let _loc22_: any[] = [];
        switch (param1.category - 13) {
            case 0:
                if (_loc3_.length < 2) {
                    UseProductConfirmationView._log.warn("Invalid custom params: " + _loc3_);
                    break;
                }
                _loc19_ = stringOrNull(_loc3_[1]);
                _loc11_ = this._widget.handler.roomEngine.getPetColorsByTag(_loc17_, _loc19_);
                _loc10_ = this._widget.handler.roomEngine.getPetColor(_loc17_, _loc12_.paletteId);
                for (const _loc4_ of _loc11_ ?? []) {
                    if (_loc4_.breed == _loc10_.breed) {
                        _loc2_ = _loc4_.id | 0;
                        break;
                    }
                }
                _loc7_ = this._widget.handler.roomEngine.getPetImage(_loc12_.typeId, _loc2_, _loc12_.color, new Vector3d(90), 64, this, true, 0, _loc12_.customParts);
                break;
            case 1:
                if (_loc3_.length < 4) {
                    UseProductConfirmationView._log.warn("Invalid custom params: " + _loc3_);
                    break;
                }
                _loc21_ = (asGuarded(_loc3_[1], isString)).split(",");
                _loc16_ = (asGuarded(_loc3_[2], isString)).split(",");
                _loc18_ = (asGuarded(_loc3_[3], isString)).split(",");
                _loc9_ = 0;
                while (_loc9_ < _loc21_.length) {
                    _loc14_ = _loc21_[_loc9_] | 0;
                    _loc20_ = _loc12_.getCustomPart(_loc14_);
                    _loc2_ = _loc18_[_loc9_] | 0;
                    if (_loc20_ != null) {
                        _loc2_ = _loc20_.paletteId;
                    }
                    _loc22_.push(new PetCustomPart(_loc14_, _loc16_[_loc9_] | 0, _loc2_));
                    _loc9_++;
                }
                _loc7_ = this._widget.handler.roomEngine.getPetImage(_loc12_.typeId, _loc12_.paletteId, _loc12_.color, new Vector3d(90), 64, this, true, 0, _loc22_);
                break;
            case 2:
                if (_loc3_.length < 3) {
                    UseProductConfirmationView._log.warn("Invalid custom params: " + _loc3_);
                    break;
                }
                _loc21_ = (asGuarded(_loc3_[1], isString)).split(",");
                _loc18_ = (asGuarded(_loc3_[2], isString)).split(",");
                _loc9_ = 0;
                while (_loc9_ < _loc21_.length) {
                    _loc14_ = _loc21_[_loc9_] | 0;
                    _loc20_ = _loc12_.getCustomPart(_loc14_);
                    _loc5_ = -1;
                    if (_loc20_ != null) {
                        _loc5_ = _loc20_.partId;
                    }
                    _loc22_.push(new PetCustomPart(_loc21_[_loc9_] | 0, _loc5_, _loc18_[_loc9_] | 0));
                    _loc9_++;
                }
                _loc7_ = this._widget.handler.roomEngine.getPetImage(_loc12_.typeId, _loc12_.paletteId, _loc12_.color, new Vector3d(90), 64, this, true, 0, _loc22_);
                break;
            case 3:
                if (_loc3_.length < 4) {
                    UseProductConfirmationView._log.warn("Invalid custom params: " + _loc3_);
                    break;
                }
                _loc21_ = (asGuarded(_loc3_[1], isString)).split(",");
                _loc16_ = (asGuarded(_loc3_[2], isString)).split(",");
                _loc18_ = (asGuarded(_loc3_[3], isString)).split(",");
                _loc9_ = 0;
                while (_loc9_ < _loc21_.length) {
                    _loc22_.push(new PetCustomPart(_loc21_[_loc9_] | 0, _loc16_[_loc9_] | 0, _loc18_[_loc9_] | 0));
                    _loc9_++;
                }
                for (const _loc13_ of _loc12_.customParts ?? []) {
                    if (_loc21_.indexOf(_loc13_.layerId) == -1) {
                        _loc22_.push(_loc13_);
                    }
                }
                _loc7_ = this._widget.handler.roomEngine.getPetImage(_loc12_.typeId, _loc12_.paletteId, _loc12_.color, new Vector3d(90), 64, this, true, 0, _loc22_);
                break;
            case 7:
            case 8:
            case 9:
                _loc8_ = null;
                if (this._SafeStr_2395 != null) {
                    _loc8_ = "rip";
                    _loc15_ = this.getRoomUserObject(this._SafeStr_2395.roomObjectId);
                    if (_loc15_ != null) {
                        _loc8_ = _loc15_.getModel().getString("figure_posture");
                        if (_loc8_ == "rip") {
                            _loc6_ = this._SafeStr_2395.petLevel;
                            if (_loc6_ < 7) {
                                _loc8_ = "grw" + _loc6_;
                            } else {
                                _loc8_ = "std";
                            }
                        }
                    }
                }
                _loc7_ = this._widget.handler.roomEngine.getPetImage(_loc12_.typeId, _loc12_.paletteId, _loc12_.color, new Vector3d(90), 64, this, true, 0, _loc12_.customParts, _loc8_);
                break;
            default:
                UseProductConfirmationView._log.warn("Unsupported furniture category: " + param1.category);
        }
        if (_loc7_ != null) {
            this._previewCallbackId = _loc7_.id;
            _loc23_ = _loc7_.data;
        }
        return _loc23_;
    }

    private getRoomUserObject(param1: number): IRoomObject {
        return this._widget.handler.roomEngine.getRoomObject(this._widget.handler.roomEngine.activeRoomId, param1, 100);
    }

    private updatePreviewImage(param1: BitmapData): void {
        let _loc4_: BitmapData = null;
        if (!this._window || !param1) {
            return;
        }
        let _loc5_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("preview_image"), isIBitmapWrapperWindow);
        if (_loc5_.bitmap == null) {
            _loc5_.bitmap = new BitmapData(_loc5_.width, _loc5_.height);
        }
        let _loc2_: IAsset = asGuarded(this._assets.getAssetByName("use_product_preview_bg_png"), isIAsset);
        if (_loc2_) {
            _loc4_ = asInstanceOf(_loc2_.content, BitmapData);
            _loc5_.bitmap.copyPixels(_loc4_, _loc4_.rect, new Point(0, 0));
        }
        let _loc3_: Point = new Point((_loc5_.width - param1.width) / 2, (_loc5_.height - param1.height) / 2);
        _loc5_.bitmap.copyPixels(param1, param1.rect, _loc3_, null, null, true);
    }

    private close(): void {
        this._window.visible = false;
    }

    private addClickListener(param1: string): void {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseClick);
        }
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        let _loc2_: RoomWidgetMessage = null;
        switch (param1.target.name) {
            case "preview_image_region":
                if (this._SafeStr_2395 != null) {
                    this.selectItemFromRoom(this._SafeStr_2395.roomObjectId, 100);
                }
                break;
            case "header_button_close":
            case "cancel_text":
            case "ok_button":
                this.close();
                break;
            case "save_button":
                _loc2_ = new RoomWidgetUseProductMessage("RWUPM_PET_PRODUCT", this._requestObjectId, this._SafeStr_2395.webID);
                this.close();
        }
        if (_loc2_) {
            this._widget.messageListener.processWidgetMessage(_loc2_);
        }
    };

    private selectItemFromRoom(param1: number, param2: number): boolean {
        let _loc4_: number = 0;
        let _loc3_: IRoomObject = this.findRoomObject(param1, param2);
        if (_loc3_ != null) {
            _loc4_ = this._widget.handler.container.roomSession.roomId;
            this._widget.handler.container.roomEngine.selectRoomObject(_loc4_, _loc3_.getId(), param2);
            return true;
        }
        return false;
    }

    private findRoomObject(param1: number, param2: number): IRoomObject {
        let _loc4_: number = this._widget.handler.container.roomSession.roomId;
        return this._widget.handler.container.roomEngine.getRoomObject(_loc4_, param1, param2);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (UseProductConfirmationView.#staticsReady) return;
        UseProductConfirmationView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(UseProductConfirmationView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.avatarinfo.UseProductConfirmationView"));
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}

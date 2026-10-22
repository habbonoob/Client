import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { RoomWidgetUseProductMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUseProductMessage';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class MonsterPlantSeedConfirmationView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.contextmenu::MonsterPlantSeedConfirmationView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        MonsterPlantSeedConfirmationView.#initStatics();
        return MonsterPlantSeedConfirmationView._log;
    }

    private static readonly PRODUCT_PAGE_UKNOWN: number = -1;
    private static readonly PRODUCT_PAGE_SEED: number = 0;
    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7593: string = "save_button";
    private static readonly _SafeStr_7595: string = "cancel_text";
    private static readonly _SafeStr_7683: string = "ok_button";

    constructor(param1: FurnitureContextMenuWidget) {
        this._widget = param1;
        this._windowManager = param1.windowManager;
        this._assets = this._widget.assets;
    }

    declare private _window: IWindowContainer;

    private _disposed: boolean = false;

    declare private _widget: FurnitureContextMenuWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    private _requestObjectId: number = -1;

    declare private _previewCallbackId: number;
    static { (this.prototype as any)._previewCallbackId = 0; }

    declare private _furnitureData: IFurnitureData;

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
        this._furnitureData = null;
    }

    public open(param1: number): void {
        let _loc3_: number = this._widget.handler.roomSession.roomId;
        let _loc4_: IRoomObject = this._widget.handler.roomEngine.getRoomObject(_loc3_, param1, 10);
        if (_loc4_ != null) {
            this._furnitureData = this._widget.handler.getFurniData(_loc4_);
            this._requestObjectId = _loc4_.getId();
        }
        let _loc2_: number = -1;
        switch (this._furnitureData.category - 19) {
            case 0:
                _loc2_ = 0;
                break;
            default:
                MonsterPlantSeedConfirmationView._log.warn("[PlantSeedConfirmationView.open()] Unsupported furniture category: " + this._furnitureData.category);
        }
        this.setWindowContent(_loc2_);
        this._window.visible = true;
    }

    public close(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
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
        let _loc4_: string = null;
        let _loc3_: BitmapData = new BitmapData(10, 10);
        this._widget.localizations.registerParameter("useproduct.widget.title.plant_seed", "name", this._furnitureData.localizedName);
        if (!this._window) {
            _loc4_ = "use_product_widget_frame_plant_seed_xml";
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName(_loc4_).content, XML)), isIWindowContainer);
            this.addClickListener("header_button_close");
            this._window.center();
        }
        this._widget.localizations.registerParameter("useproduct.widget.text.plant_seed", "productName", this._furnitureData.localizedName);
        let _loc2_: IFrameWindow = isIFrameWindow(this._window) ? this._window : null;
        _loc2_.content.removeChildAt(0);
        let _loc5_: IWindowContainer = this.createWindow(param1);
        _loc2_.content.addChild(_loc5_);
        switch (param1) {
            case 0:
                this.addClickListener("save_button");
                this.addClickListener("cancel_text");
                _loc3_ = this.resolvePreviewImage(this._furnitureData);
                this.updatePreviewImage(_loc3_);
                this._window.invalidate();
                return;
            default:
                throw new Error("Invalid type for use product confirmation content apply: " + param1);
        }
    }

    private createWindow(param1: number): IWindowContainer {
        let _loc2_: IAsset = null;
        let _loc3_: any = null;
        switch (param1) {
            case 0:
                _loc2_ = this._assets.getAssetByName("use_product_controller_plant_seed_xml");
                return asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
            default:
                throw new Error("Invalid type for view content creation: " + param1);
        }
    }

    private resolvePreviewImage(param1: IFurnitureData): BitmapData {
        let _loc3_: ImageResult = null;
        let _loc4_: BitmapData = null;
        if (!param1) {
            return null;
        }
        let _loc2_: any[] = param1.customParams.split(" ");
        switch (param1.category - 19) {
            case 0:
                _loc3_ = this._widget.handler.roomEngine.getFurnitureImage(this._furnitureData.id, new Vector3d(90, 0, 0), 64, this, 0, "", -1, -1, null);
                break;
            default:
                MonsterPlantSeedConfirmationView._log.warn("[PlantSeedConfirmationView] Unsupported furniture category: " + param1.category);
        }
        if (_loc3_ != null) {
            this._previewCallbackId = _loc3_.id;
            _loc4_ = _loc3_.data;
        }
        return _loc4_;
    }

    private updatePreviewImage(param1: BitmapData): void {
        if (!this._window || !param1) {
            return;
        }
        this.setPreviewImage("preview_image_bg");
        this.setPreviewImage("preview_image");
    }

    private setPreviewImage(param1: string): void {
        if (!this._window) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName(param1), isIBitmapWrapperWindow);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: BitmapDataAsset = asInstanceOf(this._assets.getAssetByName(_loc2_.bitmapAssetName), BitmapDataAsset);
        if (_loc3_ == null) {
            return;
        }
        _loc2_.disposesBitmap = false;
        _loc2_.bitmap = asInstanceOf(_loc3_.content, BitmapData);
    }

    private addClickListener(param1: string): void {
        this._window.findChildByName(param1).addEventListener("WME_CLICK", this.onMouseClick);
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        let _loc2_: RoomWidgetMessage = null;
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel_text":
            case "ok_button":
                this.close();
                break;
            case "save_button":
                _loc2_ = new RoomWidgetUseProductMessage("RWUPM_MONSTERPLANT_SEED", this._requestObjectId);
                this.close();
        }
        if (_loc2_) {
            this._widget.messageListener.processWidgetMessage(_loc2_);
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MonsterPlantSeedConfirmationView.#staticsReady) return;
        MonsterPlantSeedConfirmationView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MonsterPlantSeedConfirmationView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.furniture.contextmenu.MonsterPlantSeedConfirmationView"));
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}

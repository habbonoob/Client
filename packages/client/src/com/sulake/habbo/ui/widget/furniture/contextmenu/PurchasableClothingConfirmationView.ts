import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UpdateFigureDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/register/UpdateFigureDataMessageComposer';
import { CustomizeAvatarWithFurniMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/CustomizeAvatarWithFurniMessageComposer';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class PurchasableClothingConfirmationView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.contextmenu::PurchasableClothingConfirmationView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        PurchasableClothingConfirmationView.#initStatics();
        return PurchasableClothingConfirmationView._log;
    }

    private static readonly PRODUCT_PAGE_UKNOWN: number = -1;
    private static readonly PRODUCT_PAGE_CLOTHING: number = 0;
    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7593: string = "save_button";
    private static readonly _SafeStr_7595: string = "cancel_text";
    private static readonly _SafeStr_7683: string = "ok_button";
    private static readonly _SafeStr_8139: string = "avatar_preview";

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

    declare private _furnitureData: IFurnitureData;

    declare private _newFigureString: string;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._disposed = true;
    }

    public open(param1: number): void {
        let _loc7_: any[] = null;
        let _loc5_: number = this._widget.handler.roomSession.roomId;
        let _loc6_: IRoomObject = this._widget.handler.roomEngine.getRoomObject(_loc5_, param1, 10);
        if (_loc6_ != null) {
            this._furnitureData = this._widget.handler.getFurniData(_loc6_);
            this._requestObjectId = _loc6_.getId();
        } else {
            return;
        }
        let _loc3_: number = -1;
        let _loc2_: number[] = new Array<number>(0).fill(0);
        switch (this._furnitureData.category) {
            case 23:
                _loc3_ = 0;
                _loc7_ = this._furnitureData.customParams.split(",");
                for (const _loc4_ of _loc7_ ?? []) {
                    if (this._widget.handler.container.avatarRenderManager.isValidFigureSetForGender(parseInt(_loc4_) | 0, this._widget.handler.container.sessionDataManager.gender)) {
                        _loc2_.push(parseInt(_loc4_) | 0);
                    }
                }
                break;
            default:
                PurchasableClothingConfirmationView._log.warn("[PurchasableClothingConfirmationView.open()] Unsupported furniture category: " + this._furnitureData.category);
        }
        this._newFigureString = this._widget.handler.container.avatarRenderManager.getFigureStringWithFigureIds(this._widget.handler.container.sessionDataManager.figure, this._widget.handler.container.sessionDataManager.gender, _loc2_);
        if (this._widget.handler.container.inventory.hasBoundFigureSetFurniture(this._furnitureData.className)) {
            this._widget.handler.container.connection.send(new UpdateFigureDataMessageComposer(this._newFigureString, this._widget.handler.container.sessionDataManager.gender));
        } else {
            this.setWindowContent(_loc3_);
            this._window.visible = true;
        }
    }

    public close(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    private setWindowContent(param1: number): void {
        let _loc3_: string = null;
        this._widget.localizations.registerParameter("useproduct.widget.title.bind_clothing", "name", this._furnitureData.localizedName);
        if (!this._window) {
            _loc3_ = "use_product_widget_frame_plant_seed_xml";
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName(_loc3_).content, XML)), isIWindowContainer);
            this.addClickListener("header_button_close");
            this._window.center();
        }
        this._window.caption = "${useproduct.widget.title.bind_clothing}";
        this._widget.localizations.registerParameter("useproduct.widget.text.bind_clothing", "productName", this._furnitureData.localizedName);
        let _loc2_: IFrameWindow = isIFrameWindow(this._window) ? this._window : null;
        _loc2_.content.removeChildAt(0);
        let _loc4_: IWindowContainer = this.createWindow(param1);
        _loc2_.content.addChild(_loc4_);
        switch (param1) {
            case 0:
                this.addClickListener("save_button");
                this.addClickListener("cancel_text");
                this.refreshAvatar();
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
                _loc2_ = this._assets.getAssetByName("use_product_controller_purchasable_clothing_xml");
                return asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
            default:
                throw new Error("Invalid type for view content creation: " + param1);
        }
    }

    private refreshAvatar(): void {
        let _loc1_: IWidgetWindow = castGuarded(this._window.findChildByName("avatar_preview"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc2_: IAvatarImageWidget = castGuarded(_loc1_.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget");
        _loc2_.figure = this._newFigureString;
    }

    private addClickListener(param1: string): void {
        this._window.findChildByName(param1).addEventListener("WME_CLICK", this.onMouseClick);
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel_text":
            case "ok_button":
                this.close();
                break;
            case "save_button":
                this._widget.handler.container.connection.send(new CustomizeAvatarWithFurniMessageComposer(this._requestObjectId));
                this._widget.handler.container.connection.send(new UpdateFigureDataMessageComposer(this._newFigureString, this._widget.handler.container.sessionDataManager.gender));
                this.close();
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PurchasableClothingConfirmationView.#staticsReady) return;
        PurchasableClothingConfirmationView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PurchasableClothingConfirmationView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.furniture.contextmenu.PurchasableClothingConfirmationView"));
    }

    get [IDisposable](): true {
        return true;
    }
}

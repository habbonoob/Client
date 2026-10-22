import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { CraftingFurnitureItem } from '@/com/sulake/habbo/ui/widget/crafting/utils/CraftingFurnitureItem';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class FurniThumbnailRendererBase implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.renderer::FurniThumbnailRendererBase'); }

    private readonly THUMB_BLEND_ITEMS_AVAILABLE: number = 1;
    private readonly THUMB_BLEND_ITEMS_NOT_AVAILABLE: number = 0.2;

    declare protected _widget: CraftingWidget;

    declare protected _data: CraftingFurnitureItem;

    declare protected _window: IWindowContainer;

    constructor(param1: CraftingFurnitureItem, param2: IWindowContainer, param3: CraftingWidget) {
        this.initInstanceFields();
        this._widget = param3;
        this._window = param2;
        this._data = param1;
        this.requestIconFromRoomEngine(this.furnitureData);
        this.updateItemCount();
        this._window.procedure = this.onMouseDown;
        let _loc4_: IRegionWindow = asGuarded(param2.findChildByName("tooltip"), isIRegionWindow);
        _loc4_.toolTipCaption = param1.furnitureData.localizedName;
    }

    public dispose(): void {
        if (this._window) {
            this._window.removeEventListener("mouseDown", this.onMouseDown);
            this._window.dispose();
            this._window = null;
        }
    }

    private requestIconFromRoomEngine(param1: IFurnitureData): void {
        let _loc2_: ImageResult = null;
        switch (param1.type) {
            case "s":
                _loc2_ = this._widget.handler.container.roomEngine.getFurnitureIcon(param1.id, this);
                break;
            case "i":
                _loc2_ = this._widget.handler.container.roomEngine.getWallItemIcon(param1.id, this);
        }
        if (_loc2_.data) {
            this.imageReady(0, _loc2_.data);
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (!this._window) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByTag("BITMAP"), isIBitmapWrapperWindow);
        if (_loc3_ && param2) {
            _loc3_.bitmap = param2;
        }
    }

    public imageFailed(param1: number): void {
    }

    public updateItemCount(): void {
    }

    protected hideItemCount(): void {
        let _loc1_: IWindow = this._window.findChildByName("number_container");
        if (_loc1_) {
            _loc1_.visible = false;
        }
    }

    protected updateGroupItemCount(param1: number): void {
        let _loc3_: ITextWindow = null;
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("number_container");
        _loc2_.visible = param1 > 0;
        if (param1 > 0) {
            _loc3_ = asGuarded(this._window.findChildByName("number"), isITextWindow);
            _loc3_.text = String(param1);
        }
    }

    protected updateBitmapBlend(param1: boolean): void {
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("bitmap"), isIBitmapWrapperWindow);
        if (param1) {
            _loc2_.blend = 1;
        } else {
            _loc2_.blend = 0.2;
        }
    }

    private onMouseDown = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_DOWN") {
            return;
        }
        this.onTriggered();
    };

    protected onTriggered(): void {
    }

    public get content(): CraftingFurnitureItem {
        return this._data;
    }

    protected get furnitureData(): IFurnitureData {
        return this.content ? this.content.furnitureData : null;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [IGetImageListener](): true {
        return true;
    }
}

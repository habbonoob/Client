import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { IRenderableCollectibleItem } from '@/com/sulake/habbo/catalog/collectibles/IRenderableCollectibleItem';
import { CollectibleProductPreviewer } from '@/com/sulake/habbo/catalog/collectibles/tabs/subviews/CollectibleProductPreviewer';

export class AbstractCollectibleItemRenderer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer::AbstractCollectibleItemRenderer'); }

    declare protected _controller: CollectiblesController;

    declare private _item: IRenderableCollectibleItem;

    declare private _SafeStr_3171: IWindowContainer;

    declare private _SafeStr_4176: CollectibleProductPreviewer;

    private _active: boolean = false;
    private _hovered: boolean = false;

    constructor(param1: CollectiblesController, param2: IRenderableCollectibleItem, param3: IWindowContainer) {
        this.onClick = this.onClick.bind(this);
        this.initInstanceFields();
        this._controller = param1;
        this._item = param2;
        this._SafeStr_3171 = param3;
        this._SafeStr_3171.addEventListener("WME_CLICK", this.onClick);
        this._SafeStr_3171.addEventListener("WME_OVER", this.onOver);
        this._SafeStr_3171.addEventListener("WME_OUT", this.onOut);
        this._SafeStr_4176 = new CollectibleProductPreviewer(this.bitmapWindow, this.badgeImageWindow, this.petImageWindow, this.unknownImageWindow);
        this._controller.previewIcon(this._item, this._SafeStr_4176);
        this.updateVisuals();
        this.updateColoring();
    }

    public updateVisuals(): void {
    }

    protected onClick(param1: WindowMouseEvent): void {
    }

    private updateColoring(): void {
        let _loc2_: any = this.isComplete ? this.completeColoring() : this.incompleteColoring();
        let _loc1_: any = this._hovered ? _loc2_.hovered : (this._active ? _loc2_.active : _loc2_.normal);
        this.borderOutline.color = _loc1_.outline >>> 0;
        this.borderBackground.color = _loc1_.background >>> 0;
    }

    protected incompleteColoring(): any {
        return { "active": { "background": 15132390, "outline": 16777215 }, "hovered": { "background": 14409183, "outline": 16119544 }, "normal": { "background": 13159891, "outline": 9412017 } };
    }

    protected completeColoring(): any {
        return { "active": { "background": 14872032, "outline": 16777215 }, "hovered": { "background": 14346200, "outline": 16119544 }, "normal": { "background": 13820623, "outline": 8823170 } };
    }

    protected get isComplete(): boolean {
        return this._item.amount > 0;
    }

    public activate(): void {
        this._active = true;
        this.updateColoring();
    }

    public deactivate(): void {
        this._active = false;
        this.updateColoring();
    }

    private onOut = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateColoring();
    };

    private onOver = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateColoring();
    };

    public dispose(): void {
        if (this._SafeStr_3171) {
            this._SafeStr_3171.dispose();
            this._SafeStr_3171 = null;
        }
    }

    public get disposed(): boolean {
        return false;
    }

    public get renderableItem(): IRenderableCollectibleItem {
        return this._item;
    }

    public get container(): IWindowContainer {
        return this._SafeStr_3171;
    }

    protected get borderOutline(): IBorderWindow {
        return null;
    }

    protected get borderBackground(): IBorderWindow {
        return null;
    }

    protected get amountText(): ITextWindow {
        return null;
    }

    protected get amountTextBorder(): IBorderWindow {
        return null;
    }

    protected get bitmapWindow(): IBitmapWrapperWindow {
        return null;
    }

    protected get unknownImageWindow(): IStaticBitmapWrapperWindow {
        return null;
    }

    protected get badgeImageWindow(): IWidgetWindow {
        return null;
    }

    protected get petImageWindow(): IWidgetWindow {
        return null;
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }
}

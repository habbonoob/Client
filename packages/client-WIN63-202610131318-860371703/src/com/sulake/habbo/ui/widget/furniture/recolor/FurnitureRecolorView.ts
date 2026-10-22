import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurnitureRecolorController } from '@/com/sulake/habbo/ui/widget/furniture/recolor/FurnitureRecolorController';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurnitureRecolorPaletteView } from '@/com/sulake/habbo/ui/widget/furniture/recolor/FurnitureRecolorPaletteView';
import { FurnitureRecolorPreviewView } from '@/com/sulake/habbo/ui/widget/furniture/recolor/FurnitureRecolorPreviewView';

export class FurnitureRecolorView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.recolor::FurnitureRecolorView'); }

    declare private _controller: FurnitureRecolorController;

    declare private _window: IFrameWindow;

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _preview: FurnitureRecolorPreviewView;

    declare private _SafeStr_14596: FurnitureRecolorPreviewView;

    declare private _SafeStr_14597: IRegionWindow;

    declare private _SafeStr_14598: FurnitureRecolorPaletteView;

    declare private _SafeStr_14599: FurnitureRecolorPaletteView;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: FurnitureRecolorController) {
        this._controller = param1;
        this._window = asGuarded(param1.windowManager.buildFromXML(XML.from(param1.assets.getAssetByName("furniture_recolor_xml").content), 1), isIFrameWindow);
        this._preview = new FurnitureRecolorPreviewView(this.previewContainer, param1.roomEngine);
        this._SafeStr_14596 = new FurnitureRecolorPreviewView(this.originalPreviewContainer, param1.roomEngine);
        this._SafeStr_14597 = asGuarded(this.defaultColors.removeGridItemAt(0), isIRegionWindow);
        this._SafeStr_14598 = new FurnitureRecolorPaletteView(this.defaultColors, this._SafeStr_14597, this.onPaletteColor);
        this._SafeStr_14599 = new FurnitureRecolorPaletteView(this.roomColors, this._SafeStr_14597, this.onPaletteColor);
        this.closeButton.addEventListener("WME_CLICK", this.onClose);
        this.applyButton.addEventListener("WME_CLICK", this.onApply);
        this._window.center();
    }

    public open(param1: IRoomObject, param2: number, param3: any[]): void {
        this._SafeStr_14598.setColors(this._controller.allowedColors);
        this.updateRoomColors(param3);
        this.roomColors.scrollV = 0;
        this._SafeStr_14596.open(param1, param2);
        this._preview.open(param1, param2);
        this.onPaletteColor(param2);
        this.scopeMenu.selection = 0;
        this._window.visible = true;
        this._window.activate();
    }

    public updateOriginalColor(param1: number): void {
        this._SafeStr_14596.setColor(param1);
    }

    public updateRoomColors(param1: any[]): void {
        this._SafeStr_14599.setColors(param1);
    }

    public hide(): void {
        this._window.visible = false;
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    private onApply = (param1: WindowMouseEvent): void => {
        if (this._controller.allowedColors.indexOf(this._color) >= 0) {
            this._controller.apply(this._color, this.scopeMenu.selection);
        }
    };

    private onPaletteColor = (param1: number): void => {
        this._color = param1;
        this._preview.setColor(param1);
        this._SafeStr_14598.selectedColor = param1;
        this._SafeStr_14599.selectedColor = param1;
        if (this._controller.allowedColors.indexOf(param1) >= 0) {
            this.applyButton.enable();
        } else {
            this.applyButton.disable();
        }
    };

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.closeButton.removeEventListener("WME_CLICK", this.onClose);
        this.applyButton.removeEventListener("WME_CLICK", this.onApply);
        this._preview.dispose();
        this._preview = null;
        this._SafeStr_14596.dispose();
        this._SafeStr_14596 = null;
        this._SafeStr_14598.dispose();
        this._SafeStr_14598 = null;
        this._SafeStr_14599.dispose();
        this._SafeStr_14599 = null;
        this._SafeStr_14597.dispose();
        this._SafeStr_14597 = null;
        this._window.dispose();
        this._window = null;
        this._controller = null;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByTag("close");
    }

    private get applyButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("apply"), isIButtonWindow);
    }

    private get scopeMenu(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("scope"), isIDropMenuWindow);
    }

    private get originalPreviewContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("original_preview_section"), isIWindowContainer);
    }

    private get previewContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("preview_section"), isIWindowContainer);
    }

    private get defaultColors(): IItemGridWindow {
        return asGuarded(this._window.findChildByName("default_colors"), isIItemGridWindow);
    }

    private get roomColors(): IItemGridWindow {
        return asGuarded(this._window.findChildByName("room_colors"), isIItemGridWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}

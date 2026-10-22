import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ListScrollParams } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/ListScrollParams';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IListPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/IListPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class ScrollListPreset extends WiredUIPreset implements IListPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::ScrollListPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[], param5: ListScrollParams, param6: boolean = false) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("vertical_scroll_list_view"), isIScrollableListWindow);
        this._center = param6;
        this._scrollParams = param5;
        this._container.spacing = param3.genericVerticalSpacing;
        this._elements = [];
        for (const _loc7_ of param4 ?? []) {
            this._elements.push(_loc7_);
            this._container.addListItem(_loc7_.window);
        }
        this._container.limits.minHeight = param5.minHeight;
        this._container.limits.maxHeight = param5.maxHeight;
        if (param5.alwaysShowScrollbar) {
            this._container.autoHideScrollBar = true;
        }
        this._container.scrollableWindow.addEventListener("WE_RESIZED", this.onScrollableWindowResized);
    }

    private SCROLLBAR_WIDTH: number = 9;
    private SCROLLBAR_MARGIN: number = 3;

    declare private _container: IScrollableListWindow;

    declare private _elements: WiredUIPreset[];

    declare private _center: boolean;
    static { (this.prototype as any)._center = false; }

    declare private _scrollParams: ListScrollParams;

    declare private _cachedWidth: number;
    static { (this.prototype as any)._cachedWidth = 0; }

    declare private _ignoreListeners: boolean;
    static { (this.prototype as any)._ignoreListeners = false; }

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        return WiredUIPreset.toArray(this._elements);
    }

    public get spacing(): number {
        return this._container.spacing;
    }

    public set spacing(param1: number) {
        this._container.spacing = param1;
    }

    public set backgroundColor(param1: number) {
        this._container.background = true;
        this._container.color = (0xFF000000 | param1) >>> 0;
    }

    public override resizeToWidth(param1: number): void {
        this._ignoreListeners = true;
        this._cachedWidth = param1;
        super.resizeToWidth(param1);
        let _loc2_: any = param1;
        let _loc3_: any = param1;
        if (!this._scrollParams.alwaysShowScrollbar) {
            this.resizeChildrenToWidth(_loc2_ | 0);
            this.fixHeight();
        }
        if (this._container.isScrollBarVisible) {
            _loc2_ = param1 - this.SCROLLBAR_WIDTH - this.SCROLLBAR_MARGIN;
            this.resizeChildrenToWidth(_loc2_ | 0);
            _loc3_ = param1 - this.SCROLLBAR_MARGIN;
        }
        this._container.width = _loc3_ | 0;
        this.fixHeight();
        this._ignoreListeners = false;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._elements = null;
    }

    public resizeChildrenToWidth(param1: number): void {
        let _loc3_: any = null;
        let _loc2_: number = 0;
        _loc2_ += this._container.spacing * (this._elements.length - 1);
        for (_loc3_ of this._elements ?? []) {
            _loc3_.resizeToWidth(param1);
            _loc2_ += _loc3_.window.height;
        }
        if (this._center) {
            for (_loc3_ of this._elements ?? []) {
                _loc3_.window.x = param1 / 2 - _loc3_.window.width / 2 | 0;
            }
        }
    }

    private fixHeight(): void {
        this._container.height = Math.min(this._scrollParams.maxHeight, Math.max(this._scrollParams.minHeight, this._container.scrollableRegion.height)) | 0;
    }

    private onScrollableWindowResized = (param1: WindowEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        this.resizeToWidth(this._cachedWidth);
    };
}

import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ExpandedVariablePickerView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/ExpandedVariablePickerView';
import type { TabButtonConfig } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/tabbuttons/TabButtonConfig';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class TabButtonView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker.tabbuttons::TabButtonView'); }

    private static SELECTED_BG: number = 14737632;
    private static _SafeStr_7453: number = 4289374890;
    private static HOVER_BG: number = 15724527;
    private static _SafeStr_7524: number = 4291611852;
    private static NONE_BG: number = 16448250;
    private static NONE_SHADOW: number = 4292730333;

    declare private _parent: ExpandedVariablePickerView;

    declare private _window: IRegionWindow;

    declare private _tabConfig: TabButtonConfig;

    private _disposed: boolean = false;
    private _active: boolean = false;
    private _hovered: boolean = false;

    constructor(param1: ExpandedVariablePickerView, param2: TabButtonConfig, param3: number) {
        this._parent = param1;
        this._tabConfig = param2;
        this._window = asGuarded(param1.tabButtonTemplate.clone(), isIRegionWindow);
        this._window.width = param3;
        this._window.toolTipCaption = this._parent.roomEvents.localization.getLocalization(param2.tooltipCaption);
        this.image.assetUri = param2.assetUri;
        this._window.addEventListener("WME_CLICK", this.onClick);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
        this.updateColoring();
    }

    public set active(param1: boolean) {
        this._active = param1;
        this.updateColoring();
    }

    protected onClick = (param1: WindowMouseEvent): void => {
        this._parent.selectTab(this);
    };

    private onOut = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateColoring();
    };

    private onOver = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateColoring();
    };

    private updateColoring(): void {
        if (this._active) {
            this.buttonBorder.color = TabButtonView.SELECTED_BG;
            this.buttonShadow.color = TabButtonView._SafeStr_7453;
        } else if (this._hovered) {
            this.buttonBorder.color = TabButtonView.HOVER_BG;
            this.buttonShadow.color = TabButtonView._SafeStr_7524;
        } else {
            this.buttonBorder.color = TabButtonView.NONE_BG;
            this.buttonShadow.color = TabButtonView.NONE_SHADOW;
        }
        this.image.blend = this._active ? 0.6 : (this._hovered ? 0.5 : 0.4);
    }

    public get tabConfig(): TabButtonConfig {
        return this._tabConfig;
    }

    public get window(): IRegionWindow {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._parent = null;
        this._window.dispose();
        this._window = null;
        this._tabConfig = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get buttonBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("button_border"), isIBorderWindow);
    }

    private get buttonShadow(): IWindowContainer {
        return asGuarded(this._window.findChildByName("button_shadow"), isIWindowContainer);
    }

    private get image(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("button_img"), isIStaticBitmapWrapperWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}

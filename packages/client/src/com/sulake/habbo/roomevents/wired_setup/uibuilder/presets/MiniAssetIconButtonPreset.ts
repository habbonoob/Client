import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isIInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class MiniAssetIconButtonPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::MiniAssetIconButtonPreset'); }

    private static readonly COLOR_BLUE_CLICKED: number = 4409728;
    private static readonly COLOR_YELLOW_CLICKED: number = 6975025;
    protected static readonly YELLOW_ASSETS: any[] = ["furni_picks_1"];
    protected static readonly BLUE_ASSETS: any[] = ["furni_picks_2"];

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: string, param6: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._assetName = param4;
        this._container = param3.createMiniButton();
        this._onClick = param6;
        this.iconWrapper.assetUri = this.resolveAssetFullName(param4);
        this.clickArea.addEventListener("WME_OVER", this.onHoverStart);
        this.clickArea.addEventListener("WME_OUT", this.onHoverEnd);
        this.clickArea.addEventListener("WME_CLICK", this.iconClicked);
        this.clickArea.toolTipCaption = param5;
        this.updateUI();
    }

    declare protected _container: IWindow;

    declare protected _hovered: boolean;
    static { (this.prototype as any)._hovered = false; }

    declare protected _assetName: string;

    declare private _onClick: (...args: any[]) => any;

    public override get window(): IWindow {
        return this._container;
    }

    public override get staticWidth(): number {
        return this._container.width;
    }

    declare protected _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
        this.updateUI();
    }

    protected get selectedColor(): number {
        if (MiniAssetIconButtonPreset.YELLOW_ASSETS.indexOf(this._assetName) != -1) {
            return 6975025;
        }
        if (MiniAssetIconButtonPreset.BLUE_ASSETS.indexOf(this._assetName) != -1) {
            return 4409728;
        }
        throw new Exception("Color for asset not configured");
    }

    protected get clickArea(): IInteractiveWindow {
        return asGuarded(this._container.findChildByName("mini_button_click"), isIInteractiveWindow);
    }

    private get iconWrapper(): IStaticBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("mini_button_icon"), isIStaticBitmapWrapperWindow);
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._assetName = null;
        this._onClick = null;
    }

    protected updateUI(): void {
    }

    protected iconClicked = (param1: WindowMouseEvent): void => {
        if (this._onClick != null && !this._selected) {
            this._onClick();
        }
    };

    private onHoverEnd = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateUI();
    };

    private onHoverStart = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateUI();
    };
}

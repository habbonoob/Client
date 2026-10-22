import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class AssetButtonPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::AssetButtonPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: string, param6: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._onClick = param6;
        this._container = param3.createAssetButton();
        this.staticBitmap.assetUri = this.resolveAssetFullName(param4);
        this._container.toolTipCaption = param5;
        this._container.addEventListener("WME_CLICK", this.onButtonClicked);
        this._container.addEventListener("WME_OVER", this.onOver);
        this._container.addEventListener("WME_OUT", this.onOut);
        this._container.addEventListener("WME_OUT", this.maybeCancelEvent);
        this._container.addEventListener("WME_UP", this.maybeCancelEvent);
        this._container.addEventListener("WME_DOWN", this.onDown);
    }

    declare private _container: IContainerButtonWindow;

    declare private _onClick: (...args: any[]) => any;

    private _hovered: boolean = false;
    private _pressed: boolean = false;

    public override get window(): IWindow {
        return this._container;
    }

    public override get staticWidth(): number {
        return this._container.width;
    }

    private _selected: boolean = false;

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
        this.updateVisuals();
    }

    public set assetName(param1: string) {
        this.staticBitmap.assetUri = this.resolveAssetFullName(param1);
    }

    private get staticBitmap(): IStaticBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("asset"), isIStaticBitmapWrapperWindow);
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
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
        this._onClick = null;
    }

    private buttonClicked(param1: WindowMouseEvent): void {
        if (this._onClick != null) {
            this._onClick();
        }
    }

    private onOut = (param1: WindowMouseEvent): void => {
        if (!this._container.isEnabled()) {
            return;
        }
        this._hovered = false;
        this.updateVisuals();
    };

    private onOver = (param1: WindowMouseEvent): void => {
        if (!this._container.isEnabled()) {
            return;
        }
        this._hovered = true;
        this.updateVisuals();
    };

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        if (this._onClick != null) {
            this._onClick();
        }
    };

    private maybeCancelEvent = (param1: WindowMouseEvent): void => {
        if (param1.type == "WME_OUT" && this._selected) {
            param1.preventWindowOperation();
        }
        if (param1.type == "WME_UP") {
            this._pressed = false;
            if (this._selected) {
                this.buttonClicked(null);
                param1.preventWindowOperation();
            }
        }
    };

    private onDown = (param1: WindowMouseEvent): void => {
        this._pressed = false;
    };

    private updateVisuals(): void {
        let _loc1_: InteractiveController = castTo(this._container, InteractiveController);
        if (this._SafeStr_2144.isVolter) {
            _loc1_.setStateFlag(16, this._pressed);
            _loc1_.setStateFlag(4, this._hovered || this._selected);
        } else {
            _loc1_.setStateFlag(16, this._selected);
            _loc1_.setStateFlag(4, this._hovered);
        }
    }
}

import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SourceTypePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePicker';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';

export class SourceTypeOption {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.inputsources::SourceTypeOption'); }

    declare private _picker: SourceTypePicker;

    declare private _container: IRegionWindow;

    declare private _option: number;
    static { (this.prototype as any)._option = 0; }

    private _active: boolean = false;
    private _hovered: boolean = false;
    private _disabled: boolean = false;

    constructor(param1: SourceTypePicker, param2: IRegionWindow, param3: number) {
        this._picker = param1;
        this._container = param2;
        this._option = param3;
        this._container.addEventListener("WME_CLICK", this.onClick);
        this._container.addEventListener("WME_OVER", this.onOver);
        this._container.addEventListener("WME_OUT", this.onOut);
        let _loc4_: HabboUserDefinedRoomEvents = param1.roomEvents;
        let _loc5_: string = WiredInputSourcePicker.getTypeNameForSource(param3);
        this._container.toolTipCaption = _loc4_.localization.getLocalization("wiredfurni.params.sourcetype." + _loc5_);
        this.bitmapContainer.bitmap = _loc4_.getButtonImage("icon_source_" + _loc5_);
        this.updateColoring();
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
        if (this._disabled || !this._container.isEnabled()) {
            return;
        }
        this._hovered = false;
        this.updateColoring();
    };

    private onOver = (param1: WindowMouseEvent): void => {
        if (this._disabled || !this._container.isEnabled()) {
            return;
        }
        this._hovered = true;
        this.updateColoring();
    };

    private onClick = (param1: WindowMouseEvent): void => {
        this._picker.onClick(this);
    };

    public backgroundColor(): number {
        let _loc1_: number = NaN;
        let _loc5_: number = NaN;
        let _loc2_: number = NaN;
        if (!this._active && !this._hovered) {
            return 2236962;
        }
        let _loc3_: number = WiredInputSourcePicker.getColorForSourceType(this._option);
        let _loc4_: number = this._disabled ? 0.5 : (this._hovered ? 0.86 : 1);
        if (_loc4_ != 1) {
            _loc1_ = _loc3_ >> 16 & 0xFF;
            _loc5_ = _loc3_ >> 8 & 0xFF;
            _loc2_ = _loc3_ & 0xFF;
            _loc1_ *= _loc4_;
            _loc5_ *= _loc4_;
            _loc2_ *= _loc4_;
            _loc3_ = (_loc1_ << 16) + (_loc5_ << 8) + _loc2_ >>> 0;
        }
        return _loc3_;
    }

    private updateColoring(): void {
        this.elements.color = (0xFF000000 | this.backgroundColor()) >>> 0;
        this._picker.colorHasUpdated(this);
    }

    public get option(): number {
        return this._option;
    }

    public get container(): IRegionWindow {
        return this._container;
    }

    public set disabled(param1: boolean) {
        if (param1) {
            this._container.disable();
        } else {
            this._container.enable();
        }
        let _loc2_: number = param1 ? 0.5 : 1;
        this.elements.blend = _loc2_;
        this.bitmapContainer.blend = _loc2_;
        this._disabled = param1;
        this.updateColoring();
    }

    public dispose(): void {
        if (this._container != null) {
            this._container.dispose();
            this._container = null;
        }
    }

    private get bitmapContainer(): IBitmapWrapperWindow {
        return castGuarded(this._container.findChildByName("type_icon_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
    }

    private get elements(): IItemListWindow {
        return castGuarded(this._container.findChildByName("source_elements"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
    }
}

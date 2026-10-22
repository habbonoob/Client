import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { NewSourceTypePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/newpicker/NewSourceTypePicker';
import { InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';

export class NewSourceTypeOption {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.inputsources.newpicker::NewSourceTypeOption'); }

    declare private _picker: NewSourceTypePicker;

    declare private _container: IContainerButtonWindow;

    declare private _option: number;
    static { (this.prototype as any)._option = 0; }

    private _active: boolean = false;
    private _hovered: boolean = false;

    constructor(param1: NewSourceTypePicker, param2: IContainerButtonWindow, param3: number) {
        this._picker = param1;
        this._container = param2;
        this._option = param3;
        this._container.addEventListener("WME_CLICK", this.onClick);
        this._container.addEventListener("WME_OVER", this.onOver);
        this._container.addEventListener("WME_OUT", this.onOut);
        this._container.addEventListener("WME_OUT", this.maybeCancelEvent);
        this._container.addEventListener("WME_UP", this.maybeCancelEvent);
        let _loc4_: HabboUserDefinedRoomEvents = param1.roomEvents;
        let _loc5_: string = WiredInputSourcePicker.getTypeNameForSource(param3);
        this._container.toolTipCaption = _loc4_.localization.getLocalization("wiredfurni.params.sourcetype." + _loc5_);
        this.typeImage.assetUri = "wired_styles_illumina_icon_source_" + _loc5_;
        this.typeImage.y = (this._container.height + 1) / 2 - (this.typeImage.height + 1) / 2 | 0;
        this.updateVisuals();
    }

    public activate(): void {
        this._active = true;
        this.updateVisuals();
    }

    public deactivate(): void {
        this._active = false;
        this.updateVisuals();
    }

    private updateVisuals(): void {
        let _loc1_: InteractiveController = castTo(this._container, InteractiveController);
        _loc1_.setStateFlag(16, this._active);
        _loc1_.setStateFlag(4, this._hovered);
        if (!this._active && !this._hovered) {
            this._container.color = 16777215;
            this._picker.updateColorings();
            return;
        }
        let _loc2_: number = WiredInputSourcePicker.getColorForSourceType(this._option);
        let _loc3_: number = 1.26;
        if (this._hovered && !this._active) {
            _loc3_ = 1.55;
        }
        _loc2_ = Util.lightenColor(_loc2_, _loc3_);
        this._container.color = _loc2_;
        this._picker.updateColorings();
    }

    public get color(): number {
        return this._container.color;
    }

    private onOut = (param1: WindowMouseEvent): void => {
        if (!this._container.isEnabled()) {
            return;
        }
        this._hovered = false;
        this.updateVisuals();
    };

    private maybeCancelEvent = (param1: WindowMouseEvent): void => {
        if (param1.type == "WME_OUT" && this._active) {
            param1.preventWindowOperation();
        }
        if (param1.type == "WME_UP") {
            this.onClick(null);
            param1.preventWindowOperation();
        }
    };

    private onOver = (param1: WindowMouseEvent): void => {
        if (!this._container.isEnabled()) {
            return;
        }
        this._hovered = true;
        this.updateVisuals();
    };

    private onClick = (param1: WindowMouseEvent): void => {
        this._picker.onClick(this);
    };

    public get option(): number {
        return this._option;
    }

    public get container(): IContainerButtonWindow {
        return this._container;
    }

    public get active(): boolean {
        return this._active;
    }

    public get hovered(): boolean {
        return this._hovered;
    }

    public dispose(): void {
        if (this._container != null) {
            this._container.dispose();
            this._container = null;
        }
    }

    private get typeImage(): IStaticBitmapWrapperWindow {
        return castGuarded(this._container.findChildByName("type_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
    }
}

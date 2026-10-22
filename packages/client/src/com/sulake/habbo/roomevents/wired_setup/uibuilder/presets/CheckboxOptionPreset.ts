import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { StaticBitmapAssetWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/StaticBitmapAssetWrapperPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class CheckboxOptionPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::CheckboxOptionPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: CheckboxOptionParam, param5: boolean = false) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        this._SafeStr_3091 = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._SafeStr_2941 = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._last = param5;
        this._checkbox = param3.createCheckboxView();
        this._checkbox.id = param4.id;
        if (param4.text != null && param4.text != "") {
            this._textPreset = param2.createText(param4.text, new TextParam(param4.extra1 != null ? 0 : 1));
        }
        if (param4.iconAssetName != null && param4.iconAssetName != "") {
            this._iconPreset = param2.createBitmapWrapperPreset(this.resolveAssetFullName(param4.iconAssetName));
        }
        if (param3.checkboxYOffset > 0) {
            if (this._textPreset != null) {
                this._textPreset.window.y = param3.checkboxYOffset;
            }
            if (this._iconPreset != null) {
                this._iconPreset.window.y = param3.checkboxYOffset;
            }
        } else if (param3.checkboxYOffset < 0) {
            this._checkbox.y = -param3.checkboxYOffset;
        }
        this._SafeStr_2941.addListItem(this._checkbox);
        if (this._iconPreset != null) {
            this._SafeStr_2941.addListItem(this._iconPreset.window);
        }
        if (this._textPreset != null) {
            this._SafeStr_2941.addListItem(this._textPreset.window);
        }
        this._SafeStr_2941.spacing = param3.checkboxSpacing;
        if (param4.extra1 != null) {
            this._extra1 = param4.extra1;
            this._SafeStr_2941.addListItem(this._extra1.window);
        }
        this._SafeStr_3091.addListItem(this._SafeStr_2941);
        this._SafeStr_3091.spacing = param3.optionExtraUnderSpacing;
        if (param4.extra2 != null) {
            this._extra2 = param4.extra2;
            this._SafeStr_3091.addListItem(this._extra2.window);
            this._extra2.window.x = param3.optionExtraUnderLeftMargin;
        }
        if (this._extra1 != null || this._extra2 != null) {
            this._checkbox.addEventListener("WE_SELECTED", this.onSelect);
            this._checkbox.addEventListener("WE_UNSELECTED", this.onUnSelect);
            this.onUnSelect(null);
        }
        this._container.addChild(this._SafeStr_3091);
    }

    declare private _container: IWindowContainer;

    declare private _SafeStr_3091: IItemListWindow;

    declare private _SafeStr_2941: IItemListWindow;

    declare private _textPreset: TextPreset;

    declare private _iconPreset: StaticBitmapAssetWrapperPreset;

    declare private _extra1: WiredUIPreset;

    declare private _extra2: WiredUIPreset;

    declare private _last: boolean;
    static { (this.prototype as any)._last = false; }

    public override set disabled(param1: boolean) {
        super.disabled = param1;
        if (!param1 && !this.selected) {
            this.onUnSelect(null);
        }
    }

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        let _loc1_: any[] = [];
        if (this._textPreset != null) {
            _loc1_.push(this._textPreset);
        }
        if (this._iconPreset != null) {
            _loc1_.push(this._iconPreset);
        }
        if (this._extra1 != null) {
            _loc1_.push(this._extra1);
        }
        if (this._extra2 != null) {
            _loc1_.push(this._extra2);
        }
        return _loc1_;
    }

    declare private _checkbox: ICheckBoxWindow;

    public get checkbox(): ICheckBoxWindow {
        return this._checkbox;
    }

    public get selected(): boolean {
        return this._checkbox.isSelected;
    }

    public set selected(param1: boolean) {
        Util.select(this._checkbox, param1);
    }

    public override resizeToWidth(param1: number): void {
        let _loc3_: number = 0;
        super.resizeToWidth(param1);
        this._container.width = param1;
        this._SafeStr_3091.width = param1;
        this._SafeStr_2941.width = param1;
        if (this._textPreset != null && !this._textPreset.canStretch && this._extra1 != null) {
            throw new Error("Illegal UI combination: could not determine width of text");
        }
        if (this._textPreset != null && this._extra1 == null) {
            this._textPreset.resizeToWidth(param1 - this._textPreset.window.x);
        } else if (this._textPreset != null) {
            this._textPreset.resizeToWidth(this._textPreset.width);
        }
        if (this._extra1 != null) {
            this._extra1.resizeToWidth(param1 - this._extra1.window.x);
        }
        if (this._extra2 != null) {
            this._extra2.resizeToWidth(param1 - this._extra2.window.x);
        }
        let _loc2_: number = this._checkbox.height + this._checkbox.y;
        if (this._textPreset != null) {
            _loc2_ = Math.max(_loc2_, this._textPreset.window.height + this._textPreset.window.y) | 0;
        }
        if (this._iconPreset != null) {
            _loc2_ = Math.max(_loc2_, this._iconPreset.window.height + this._iconPreset.window.y) | 0;
        }
        if (this._extra1 != null && this._extra1.window.height > _loc2_) {
            _loc3_ = (this._extra1.window.height - _loc2_) / 2 | 0;
            this._checkbox.y = _loc3_;
            if (this._textPreset != null) {
                this._textPreset.window.y = _loc3_ + this._SafeStr_2144.checkboxYOffset;
            }
            if (this._iconPreset != null) {
                this._iconPreset.window.y = _loc3_ + this._SafeStr_2144.checkboxYOffset;
            }
            _loc2_ = this._extra1.window.height;
        }
        this._SafeStr_2941.height = _loc2_;
        if (!this._last) {
            this._container.height = Math.max(this._SafeStr_3091.height + this._SafeStr_2144.minimumOptionSpacing, this._SafeStr_2144.minimumOptionHeight) | 0;
        } else {
            this._container.height = this._SafeStr_3091.height;
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_3091 = null;
        this._SafeStr_2941 = null;
        this._textPreset = null;
        this._iconPreset = null;
        this._checkbox = null;
        this._extra1 = null;
        this._extra2 = null;
    }

    private onSelect = (param1: WindowEvent): void => {
        if (this._extra1 != null) {
            this._extra1.disabled = false;
        }
        if (this._extra2 != null) {
            this._extra2.disabled = false;
        }
    };

    private onUnSelect = (param1: WindowEvent): void => {
        if (this._extra1 != null) {
            this._extra1.disabled = true;
        }
        if (this._extra2 != null) {
            this._extra2.disabled = true;
        }
    };

    public override get disabled(): boolean {
        return super.disabled;
    }
}

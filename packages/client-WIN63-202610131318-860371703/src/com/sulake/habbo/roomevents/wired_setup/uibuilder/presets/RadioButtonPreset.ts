import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { StaticBitmapAssetWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/StaticBitmapAssetWrapperPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class RadioButtonPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::RadioButtonPreset'); }

    public static OPTION_PREFIX: string = "option_";

    declare private _container: IWindowContainer;

    declare private _SafeStr_3091: IItemListWindow;

    declare private _SafeStr_2941: IItemListWindow;

    declare private _textPreset: TextPreset;

    declare private _iconPreset: StaticBitmapAssetWrapperPreset;

    declare private _radioButton: IRadioButtonWindow;

    private _SafeStr_7212: number = -1;
    private _SafeStr_6862: number = -1;
    private _spanRemainingWidth: boolean = false;

    declare private _extra1: WiredUIPreset;

    declare private _extra2: WiredUIPreset;

    declare private _last: boolean;
    static { (this.prototype as any)._last = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: RadioButtonParam, param5: boolean = false) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        this._SafeStr_3091 = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._SafeStr_2941 = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._last = param5;
        this._radioButton = param3.createRadioButtonView();
        if (param4.text != null && param4.text != "") {
            this._textPreset = param2.createText(param4.text, new TextParam(param4.extra1 != null ? 0 : 1));
        }
        if (param4.iconAssetName != null && param4.iconAssetName != "") {
            this._iconPreset = param2.createBitmapWrapperPreset(this.resolveAssetFullName(param4.iconAssetName));
        }
        if (param3.radioButtonYOffset > 0) {
            if (this._textPreset != null) {
                this._textPreset.window.y = param3.radioButtonYOffset;
            }
            if (this._iconPreset != null) {
                this._iconPreset.window.y = param3.radioButtonYOffset;
            }
        } else if (param3.radioButtonYOffset < 0) {
            this._radioButton.y = -param3.radioButtonYOffset;
        }
        this._radioButton.name = RadioButtonPreset.OPTION_PREFIX + param4.id;
        this._radioButton.id = param4.id;
        this._SafeStr_2941.addListItem(this._radioButton);
        if (this._iconPreset != null) {
            this._SafeStr_2941.addListItem(this._iconPreset.window);
        }
        if (this._textPreset != null) {
            this._SafeStr_2941.addListItem(this._textPreset.window);
        }
        this._SafeStr_2941.spacing = param3.radioButtonSpacing;
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
            this._radioButton.addEventListener("WE_SELECTED", this.onSelect);
            this._radioButton.addEventListener("WE_UNSELECTED", this.onUnSelect);
            this.onUnSelect(null);
        }
        this._container.addChild(this._SafeStr_3091);
    }

    public set text(param1: string) {
        if (this._textPreset != null) {
            this._textPreset.text = param1;
        }
    }

    private onSelect = (param1: WindowEvent): void => {
        if (this.disabled) {
            return;
        }
        if (this._extra1 != null) {
            this._extra1.disabled = false;
        }
        if (this._extra2 != null) {
            this._extra2.disabled = false;
        }
    };

    private onUnSelect = (param1: WindowEvent): void => {
        if (this.disabled) {
            return;
        }
        if (this._extra1 != null) {
            this._extra1.disabled = true;
        }
        if (this._extra2 != null) {
            this._extra2.disabled = true;
        }
    };

    public override set disabled(param1: boolean) {
        super.disabled = param1;
        if (!param1) {
            if (this._radioButton.isSelected) {
                this.onSelect(null);
            } else {
                this.onUnSelect(null);
            }
        }
    }

    public override resizeToWidth(param1: number): void {
        let _loc3_: number = 0;
        super.resizeToWidth(param1);
        this._SafeStr_2941.width = param1;
        this._container.width = param1;
        this._SafeStr_3091.width = param1;
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
        let _loc2_: number = this._radioButton.height + this._radioButton.y;
        if (this._textPreset != null) {
            _loc2_ = Math.max(_loc2_, this._textPreset.window.height + this._textPreset.window.y) | 0;
        }
        if (this._iconPreset != null) {
            _loc2_ = Math.max(_loc2_, this._iconPreset.window.height + this._iconPreset.window.y) | 0;
        }
        if (this._extra1 != null && this._extra1.window.height > _loc2_) {
            _loc3_ = (this._extra1.window.height - _loc2_) / 2 | 0;
            this._radioButton.y = _loc3_;
            if (this._textPreset != null) {
                this._textPreset.window.y = _loc3_ + this._SafeStr_2144.radioButtonYOffset;
            }
            if (this._iconPreset != null) {
                this._iconPreset.window.y = _loc3_ + this._SafeStr_2144.radioButtonYOffset;
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

    public get radioButton(): IRadioButtonWindow {
        return this._radioButton;
    }

    public set layoutRowIndex(param1: number) {
        this._SafeStr_7212 = param1;
    }

    public get layoutRowIndex(): number {
        return this._SafeStr_7212;
    }

    public set layoutColumnIndex(param1: number) {
        this._SafeStr_6862 = param1;
    }

    public get layoutColumnIndex(): number {
        return this._SafeStr_6862;
    }

    public set spanRemainingWidth(param1: boolean) {
        this._spanRemainingWidth = param1;
    }

    public get spanRemainingWidth(): boolean {
        return this._spanRemainingWidth;
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
        this._radioButton = null;
        this._extra1 = null;
        this._extra2 = null;
    }

    public override get disabled(): boolean {
        return super.disabled;
    }
}

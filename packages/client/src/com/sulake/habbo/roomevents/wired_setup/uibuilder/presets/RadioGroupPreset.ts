import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { ItemListController } from '@/com/sulake/core/window/Classes.group';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { RadioButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioButtonPreset';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class RadioGroupPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::RadioGroupPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[], param5: (...args: any[]) => any, param6: number = 1) {
        let _loc7_: any = false;
        let _loc9_: RadioButtonPreset = null;
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("radio_group_view"), isISelectorWindow);
        this._columns = param6;
        let _loc8_: number = 0;
        let _loc10_: IItemListWindow = null;
        if (this._columns > 0) {
            this._SafeStr_3968 = [];
        }
        this._SafeStr_3342 = [];
        let _loc11_: number = -1;
        let _loc12_: number = 0;
        for (const _loc13_ of param4 ?? []) {
            _loc7_ = param4[param4.length - 1] == _loc13_;
            _loc9_ = param2.createRadioButton(_loc13_, _loc7_);
            this._SafeStr_3342.push(_loc9_);
            if (param6 > 1) {
                if (_loc12_ == 0) {
                    _loc10_ = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
                    _loc10_.spacing = param3.genericHorizontalSpacing;
                    this._SafeStr_3968.push(_loc10_);
                    this.itemList.addListItem(_loc10_);
                    _loc11_++;
                }
                _loc10_.addListItem(_loc9_.window);
                _loc9_.layoutRowIndex = _loc11_;
                _loc9_.layoutColumnIndex = _loc12_;
                _loc9_.spanRemainingWidth = _loc13_.newLine;
                if (_loc13_.newLine || _loc12_ == param6 - 1) {
                    _loc12_ = 0;
                } else {
                    _loc12_++;
                }
            } else {
                this.itemList.addListItem(_loc9_.window);
            }
            if (param5 != null) {
                _loc9_.radioButton.addEventListener("WE_SELECTED", this.onSelectionChange);
            }
        }
        this.selected = 0;
        this._SafeStr_4407 = param5;
    }

    declare private _container: ISelectorWindow;

    declare private _SafeStr_3342: RadioButtonPreset[];

    declare private _SafeStr_4407: (...args: any[]) => any;

    declare private _SafeStr_3968: IItemListWindow[];

    declare private _columns: number;
    static { (this.prototype as any)._columns = 0; }

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        return WiredUIPreset.toArray(this._SafeStr_3342);
    }

    public get selected(): number {
        return this._container.getSelected().id;
    }

    public set selected(param1: number) {
        let _loc2_: IRadioButtonWindow = asGuarded(this._container.findChildByName(RadioButtonPreset.OPTION_PREFIX + param1), isIRadioButtonWindow);
        this._container.setSelected(_loc2_);
    }

    private get itemList(): ItemListController {
        return asInstanceOf(this._container.findChildByName("radio_button_list"), ItemListController);
    }

    public override resizeToWidth(param1: number): void {
        let _loc2_: any = 0;
        let _loc5_: number = 0;
        let _loc8_: IItemListWindow = null;
        super.resizeToWidth(param1);
        this._container.width = param1;
        this.itemList.width = param1;
        let _loc3_: number = (param1 - (this._columns - 1) * this._SafeStr_2144.genericHorizontalSpacing) / this._columns | 0;
        if (this._columns > 1) {
            for (const _loc7_ of this._SafeStr_3968 ?? []) {
                _loc7_.height = 0;
                _loc7_.width = param1;
            }
        }
        let _loc4_: number = 0;
        for (const _loc6_ of this._SafeStr_3342 ?? []) {
            _loc2_ = _loc3_;
            if (this._columns > 1 && _loc6_.spanRemainingWidth) {
                _loc5_ = _loc6_.layoutColumnIndex * _loc3_ + _loc6_.layoutColumnIndex * this._SafeStr_2144.genericHorizontalSpacing;
                _loc2_ = Math.max(_loc3_, param1 - _loc5_);
            }
            _loc6_.resizeToWidth(_loc2_ | 0);
            if (this._columns > 1) {
                _loc8_ = this._SafeStr_3968[_loc6_.layoutRowIndex];
                if (_loc6_.window.height > _loc8_.height) {
                    _loc8_.height = _loc6_.window.height;
                }
            }
            _loc4_++;
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_3342 = null;
        this._SafeStr_4407 = null;
        this._SafeStr_3968 = null;
    }

    public setOptionDisabled(param1: number, param2: boolean): void {
        this._SafeStr_3342[param1].disabled = param2;
    }

    public _SafeStr_2119(param1: number): RadioButtonPreset {
        return this._SafeStr_3342[param1];
    }

    private onSelectionChange = (param1: WindowEvent): void => {
        if (this._SafeStr_4407 != null) {
            this._SafeStr_4407(this.selected);
        }
    };
}

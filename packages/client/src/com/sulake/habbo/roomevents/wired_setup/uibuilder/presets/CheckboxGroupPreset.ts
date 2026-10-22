import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class CheckboxGroupPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::CheckboxGroupPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[], param5: (...args: any[]) => any, param6: number = 1) {
        let _loc9_: any = false;
        let _loc8_: CheckboxOptionPreset = null;
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._columns = param6;
        this._SafeStr_4407 = param5;
        let _loc10_: number = 0;
        let _loc7_: IItemListWindow = null;
        if (this._columns > 0) {
            this._SafeStr_3968 = [];
        }
        this._SafeStr_3108 = new UtilsMap();
        for (const _loc11_ of param4 ?? []) {
            if (_loc11_.id == -1) {
                _loc11_.id = _loc10_;
            }
            _loc9_ = param4[param4.length - 1] == _loc11_;
            _loc8_ = param2.createCheckboxOption(_loc11_, _loc9_);
            this._SafeStr_3108.add(_loc11_.id, _loc8_);
            if (param6 > 1) {
                if (_loc10_ % param6 == 0) {
                    _loc7_ = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
                    _loc7_.spacing = param3.genericHorizontalSpacing;
                    this._SafeStr_3968.push(_loc7_);
                    this._container.addListItem(_loc7_);
                }
                _loc7_.addListItem(_loc8_.window);
            } else {
                this._container.addListItem(_loc8_.window);
            }
            if (param5 != null) {
                _loc8_.checkbox.addEventListener("WE_SELECTED", this.onSelectionChange);
                _loc8_.checkbox.addEventListener("WE_UNSELECTED", this.onSelectionChange);
            }
            _loc10_++;
        }
    }

    declare private _container: IItemListWindow;

    declare private _SafeStr_3108: UtilsMap;

    declare private _SafeStr_4407: (...args: any[]) => any;

    declare private _SafeStr_3968: IItemListWindow[];

    declare private _columns: number;
    static { (this.prototype as any)._columns = 0; }

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        return this._SafeStr_3108.getValues();
    }

    public get numCheckboxes(): number {
        return this._SafeStr_3108.length | 0;
    }

    public get mask(): number {
        let _loc1_: any = 0;
        for (const _loc2_ of this._SafeStr_3108.getValues() ?? []) {
            if (_loc2_.selected) {
                _loc1_ |= 1 << _loc2_.checkbox.id;
            }
        }
        return _loc1_ | 0;
    }

    public set mask(param1: number) {
        let _loc2_: any = false;
        for (const _loc3_ of this._SafeStr_3108.getValues() ?? []) {
            _loc2_ = (param1 & 1 << _loc3_.checkbox.id) != 0;
            Util.select(_loc3_.checkbox, _loc2_);
        }
    }

    public override resizeToWidth(param1: number): void {
        let _loc5_: IItemListWindow = null;
        super.resizeToWidth(param1);
        this._container.width = param1;
        let _loc2_: number = (param1 - (this._columns - 1) * this._SafeStr_2144.genericHorizontalSpacing) / this._columns | 0;
        let _loc3_: number = 0;
        for (const _loc4_ of this._SafeStr_3108.getValues() ?? []) {
            _loc4_.resizeToWidth(_loc2_);
            if (this._columns > 1) {
                _loc5_ = this._SafeStr_3968[_loc3_ / this._columns | 0];
                if (_loc4_.window.height > _loc5_.height) {
                    _loc5_.height = _loc4_.window.height | 0;
                }
            }
            _loc3_++;
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_3108 = null;
        this._SafeStr_4407 = null;
        this._SafeStr_3968 = null;
    }

    public _SafeStr_2119(param1: number): CheckboxOptionPreset {
        return this._SafeStr_3108.getValue(param1);
    }

    private onSelectionChange = (param1: WindowEvent): void => {
        let _loc2_: number = 0;
        if (this._SafeStr_4407 != null) {
            _loc2_ = param1.window.id;
            this._SafeStr_4407(_loc2_, this._SafeStr_2119(_loc2_).selected);
        }
    };
}

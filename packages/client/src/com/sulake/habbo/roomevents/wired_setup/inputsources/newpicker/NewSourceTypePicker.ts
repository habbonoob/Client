import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ISourceTypePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/ISourceTypePicker';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { NewSourceTypeOption } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/newpicker/NewSourceTypeOption';

export class NewSourceTypePicker implements ISourceTypePicker {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.inputsources.newpicker::NewSourceTypePicker'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: IItemListWindow, param3: SourceTypePickedListener) {
        this._roomEvents = param1;
        this._container = param2;
        this._SafeStr_2333 = param3;
        this._SafeStr_4363 = asGuarded(param2.getListItemAt(0), isIContainerButtonWindow);
        this._SafeStr_4065 = asGuarded(param2.getListItemAt(1), isIWindowContainer);
        this._splitterBaseColor = (this._SafeStr_4065.getChildAt(0).color & 0xFFFFFF) >>> 0;
        this._SafeStr_4577 = asGuarded(param2.getListItemAt(2), isIContainerButtonWindow);
        this._SafeStr_4381 = asGuarded(param2.getListItemAt(4), isIContainerButtonWindow);
        param2.removeListItems();
    }

    declare private _container: IItemListWindow;

    declare private _SafeStr_2333: SourceTypePickedListener;

    private _options: UtilsMap = new UtilsMap();

    declare private _splitters: IWindowContainer[];

    declare private _SafeStr_2385: NewSourceTypeOption;

    declare private _SafeStr_4363: IContainerButtonWindow;

    declare private _SafeStr_4577: IContainerButtonWindow;

    declare private _SafeStr_4381: IContainerButtonWindow;

    declare private _SafeStr_4065: IWindowContainer;

    declare private _splitterBaseColor: number;
    static { (this.prototype as any)._splitterBaseColor = 0; }

    private _SafeStr_4834: boolean = false;
    private _disposed: boolean = false;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    public initialize(param1: any[], param2: number): void {
        let _loc7_: NewSourceTypeOption = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: IContainerButtonWindow = null;
        let _loc6_: IWindowContainer = null;
        this._SafeStr_4834 = true;
        if (this._SafeStr_2385 != null) {
            this._SafeStr_2385.deactivate();
            this._SafeStr_2385 = null;
        }
        this.clear();
        this._options = new UtilsMap();
        this._splitters = [];
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc4_ = param1[_loc3_] | 0;
            if (_loc3_ == 0) {
                _loc5_ = asGuarded(this._SafeStr_4363.clone(), isIContainerButtonWindow);
            } else if (_loc3_ == param1.length - 1) {
                _loc5_ = asGuarded(this._SafeStr_4381.clone(), isIContainerButtonWindow);
            } else {
                _loc5_ = asGuarded(this._SafeStr_4577.clone(), isIContainerButtonWindow);
            }
            _loc7_ = new NewSourceTypeOption(this, _loc5_, _loc4_);
            this._options.add(_loc4_, _loc7_);
            this._container.addListItem(_loc7_.container);
            if (_loc4_ == param2) {
                this._SafeStr_2385 = _loc7_;
            }
            if (_loc3_ != param1.length - 1) {
                _loc6_ = asGuarded(this._SafeStr_4065.clone(), isIWindowContainer);
                this._container.addListItem(_loc6_);
                this._splitters.push(_loc6_);
            }
            _loc3_ += 1;
        }
        if (this._SafeStr_2385 != null) {
            this._SafeStr_2385.activate();
        } else if (param1.length > 0) {
            this.onClick(this._options.getValue(param1[0]));
        }
        this._SafeStr_4834 = false;
        this.updateColorings();
    }

    public select(param1: number): void {
        for (const _loc2_ of this._options.getValues() ?? []) {
            if (param1 == _loc2_.option) {
                this.onClick(_loc2_);
            }
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.clear();
        this._container.dispose();
        this._container = null;
        this._SafeStr_4363.dispose();
        this._SafeStr_4363 = null;
        this._SafeStr_4577.dispose();
        this._SafeStr_4577 = null;
        this._SafeStr_4381.dispose();
        this._SafeStr_4381 = null;
        this._SafeStr_4065.dispose();
        this._SafeStr_4065 = null;
        this._options.dispose();
        this._options = null;
        this._splitters = null;
        this._SafeStr_2385 = null;
    }

    public onClick(param1: NewSourceTypeOption): void {
        if (param1 == this._SafeStr_2385) {
            return;
        }
        if (this._SafeStr_2385 != null) {
            this._SafeStr_2385.deactivate();
            this._SafeStr_2385 = null;
        }
        if (param1 != null) {
            this._SafeStr_2385 = param1;
            this._SafeStr_2385.activate();
            this._SafeStr_2333.sourceType = this._SafeStr_2385.option;
        }
    }

    public updateColorings(): void {
        let _loc3_: number = 0;
        let _loc5_: IWindowContainer = null;
        let _loc2_: NewSourceTypeOption = null;
        let _loc4_: NewSourceTypeOption = null;
        let _loc1_: any = 0;
        if (this._SafeStr_4834) {
            return;
        }
        _loc3_ = 0;
        while (_loc3_ < this._splitters.length) {
            _loc5_ = this._splitters[_loc3_];
            _loc2_ = this._options.getValueByIndex(_loc3_);
            _loc4_ = this._options.getValueByIndex(_loc3_ + 1);
            _loc1_ = 16777215;
            if (_loc2_.active || !_loc4_.active && _loc2_.hovered) {
                _loc1_ = _loc2_.color;
            } else if (_loc4_.active || _loc4_.hovered) {
                _loc1_ = _loc4_.color;
            }
            _loc1_ = this.multiplyColors(this._splitterBaseColor, _loc1_ >>> 0);
            _loc1_ = (_loc5_.getChildAt(0).color & -16777216 | _loc1_ & 0xFFFFFF) >>> 0;
            _loc5_.getChildAt(0).color = _loc1_ >>> 0;
            _loc3_ += 1;
        }
    }

    private clear(): void {
        this._container.removeListItems();
        for (const _loc2_ of this._options.getValues() ?? []) {
            _loc2_.dispose();
        }
        for (const _loc1_ of this._splitters ?? []) {
            _loc1_.dispose();
        }
    }

    private multiplyColors(param1: number, param2: number): number {
        let _loc3_: number = (param1 >> 16 & 0xFF) * (param2 >> 16 & 0xFF) / 255 >>> 0;
        let _loc5_: number = (param1 >> 8 & 0xFF) * (param2 >> 8 & 0xFF) / 255 >>> 0;
        let _loc4_: number = (param1 & 0xFF) * (param2 & 0xFF) / 255 >>> 0;
        return (_loc3_ << 16 | _loc5_ << 8 | _loc4_) >>> 0;
    }
}

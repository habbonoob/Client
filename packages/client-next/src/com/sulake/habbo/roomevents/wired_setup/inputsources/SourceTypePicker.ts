import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ISourceTypePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/ISourceTypePicker';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { SourceTypeOption } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypeOption';

export class SourceTypePicker implements ISourceTypePicker {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.inputsources::SourceTypePicker'); }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _container: IItemListWindow;

    declare private _SafeStr_2333: SourceTypePickedListener;

    private _options: UtilsMap = new UtilsMap();

    declare private _SafeStr_2385: SourceTypeOption;

    declare private _SafeStr_4466: IRegionWindow;

    private _SafeStr_4406: SourceTypeOption = null;
    private _SafeStr_5498: SourceTypeOption = null;
    private _disposed: boolean = false;

    constructor(param1: HabboUserDefinedRoomEvents, param2: IItemListWindow, param3: SourceTypePickedListener) {
        this._roomEvents = param1;
        this._container = param2;
        this._SafeStr_2333 = param3;
        this._SafeStr_4466 = asGuarded(this.sourceOptionsList.getListItemAt(0), isIRegionWindow);
        this.sourceOptionsList.removeListItems();
    }

    public initialize(param1: any[], param2: number): void {
        let _loc5_: SourceTypeOption = null;
        if (this._SafeStr_2385 != null) {
            this._SafeStr_2385.deactivate();
            this._SafeStr_2385 = null;
        }
        this._SafeStr_4406 = null;
        this._SafeStr_5498 = null;
        this.marginLeft.color = 4280427042;
        this.marginRight.color = 4280427042;
        let _loc3_: IItemListWindow = this.sourceOptionsList;
        _loc3_.removeListItems();
        for (const _loc4_ of param1 ?? []) {
            if (!this._options.hasKey(_loc4_)) {
                _loc5_ = new SourceTypeOption(this, asGuarded(this._SafeStr_4466.clone(), isIRegionWindow), _loc4_ | 0);
                this._options.add(_loc4_, _loc5_);
            } else {
                _loc5_ = this._options.getValue(_loc4_);
            }
            if (this._SafeStr_4406 == null) {
                this._SafeStr_4406 = _loc5_;
            }
            this._SafeStr_5498 = _loc5_;
            _loc3_.addListItem(_loc5_.container);
            if (_loc4_ == param2) {
                this._SafeStr_2385 = _loc5_;
            }
        }
        if (this._SafeStr_2385 != null) {
            this._SafeStr_2385.activate();
        } else if (param1.length > 0) {
            this.onClick(this._options.getValue(param1[0]));
        }
    }

    public select(param1: number): void {
        for (const _loc2_ of this._options.getValues() ?? []) {
            if (param1 == _loc2_.option) {
                this.onClick(_loc2_);
            }
        }
    }

    public colorHasUpdated(param1: SourceTypeOption): void {
        if (param1 == this._SafeStr_4406) {
            this.marginLeft.color = (0xFF000000 | param1.backgroundColor()) >>> 0;
        }
        if (param1 == this._SafeStr_5498) {
            this.marginRight.color = (0xFF000000 | param1.backgroundColor()) >>> 0;
        }
    }

    public set disabled(param1: boolean) {
        let _loc2_: number = param1 ? 0.5 : 1;
        this.marginLeft.blend = _loc2_;
        this.marginRight.blend = _loc2_;
        for (const _loc3_ of valuesOf(this._options)) {
            _loc3_.disabled = param1;
        }
    }

    public set visible(param1: boolean) {
        this._container.visible = param1;
    }

    public onClick(param1: SourceTypeOption): void {
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

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._SafeStr_4466.dispose();
        this._SafeStr_4466 = null;
        for (const _loc1_ of this._options.getValues() ?? []) {
            _loc1_.dispose();
        }
        this._options.dispose();
        this._options = null;
    }

    private get marginLeft(): IBackgroundWindow {
        return castGuarded(this._container.findChildByName("margin_item_color_left"), isIBackgroundWindow, "com.sulake.core.window.components.IBackgroundWindow");
    }

    private get marginRight(): IBackgroundWindow {
        return castGuarded(this._container.findChildByName("margin_item_color_right"), isIBackgroundWindow, "com.sulake.core.window.components.IBackgroundWindow");
    }

    private get sourceOptionsList(): IItemListWindow {
        return castGuarded(this._container.findChildByName("source_options_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
    }
}

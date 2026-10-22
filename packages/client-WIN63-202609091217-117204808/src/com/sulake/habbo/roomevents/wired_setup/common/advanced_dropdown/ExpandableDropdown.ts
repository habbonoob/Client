import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ExpandableDropdown implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.advanced_dropdown::ExpandableDropdown'); }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _dropdown: IDropMenuWindow;

    declare private _onChangeCallback: (...args: any[]) => any;

    private _advancedVisible: boolean = false;
    private _SafeStr_4179: boolean = false;
    private _SafeStr_3391: number = 0;
    private _options: ExpandableDropdownOption[] = [];

    declare private _showMoreLocalization: string;

    private _SafeStr_3035: ExpandableDropdownOption[] = [];

    constructor(param1: IDropMenuWindow, param2: string, param3: (...args: any[]) => any = null) {
        this._dropdown = param1;
        this._showMoreLocalization = param2;
        this._onChangeCallback = param3;
        this._dropdown.addEventListener("WE_SELECTED", this.onSelectAction);
        this._dropdown.addEventListener("WE_COLLAPSE", this.onDropdownCollapse);
    }

    public init(param1: ExpandableDropdownOption[], param2: number): void {
        this._options = param1;
        this._SafeStr_4179 = false;
        this._advancedVisible = false;
        this._SafeStr_3391 = 0;
        this.populate(param2);
    }

    public get dropdownOptions(): ExpandableDropdownOption[] {
        return this._SafeStr_3035;
    }

    private populate(param1: number, param2: boolean = false): void {
        let _loc3_: number = -1;
        this._SafeStr_3035.splice(0, this._SafeStr_3035.length);
        let _loc4_: string[] = [];
        for (const _loc5_ of this._options ?? []) {
            if (param1 == _loc5_.id) {
                _loc3_ = this._SafeStr_3035.length | 0;
                if (_loc5_.isAdvanced && !param2) {
                    this._advancedVisible = true;
                    this.populate(param1, true);
                    return;
                }
            }
            if (!_loc5_.isAdvanced || param2) {
                this._SafeStr_3035.push(_loc5_);
                _loc4_.push(_loc5_.displayString);
            }
        }
        if (this.advancedOptionsAvailable && !param2) {
            _loc4_.push(this._showMoreLocalization);
        }
        this._SafeStr_4179 = true;
        this._dropdown.populateWithVector(_loc4_);
        if (_loc3_ != -1) {
            this._dropdown.selection = _loc3_;
            this._SafeStr_3391 = param1;
        } else {
            this._SafeStr_3391 = -1;
        }
    }

    private get advancedOptionsAvailable(): boolean {
        for (const _loc1_ of this._options ?? []) {
            if (_loc1_.isAdvanced) {
                return true;
            }
        }
        return false;
    }

    private onSelectAction = (param1: WindowEvent): void => {
        if (this._dropdown.selection >= this._SafeStr_3035.length) {
            this._advancedVisible = true;
            this.populate(this._SafeStr_3391 | 0, true);
            this._dropdown.openMenu();
            return;
        }
        this._SafeStr_3391 = this.selectedOptionId;
        if (this._onChangeCallback != null) {
            this._onChangeCallback(this.selectedOption);
        }
    };

    private onDropdownCollapse = (param1: WindowEvent): void => {
        if (this._SafeStr_4179) {
            this._SafeStr_4179 = false;
            return;
        }
        if (this._advancedVisible && (this.selectedOption == null || !this.selectedOption.isAdvanced)) {
            this._advancedVisible = false;
            this.populate(this.selectedOptionId | 0, false);
        }
    };

    public get selectedOption(): ExpandableDropdownOption {
        let _loc1_: number = this._dropdown.selection;
        if (_loc1_ < 0 || _loc1_ >= this._SafeStr_3035.length) {
            return null;
        }
        return this._SafeStr_3035[_loc1_];
    }

    public get selectedOptionId(): number {
        return this.selectedOption?.id;
    }

    public set selectedOptionId(param1: number) {
        this.init(this._options, param1 | 0);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._dropdown.dispose();
        this._dropdown = null;
        this._onChangeCallback = null;
        this._options = null;
        this._showMoreLocalization = null;
        this._SafeStr_3035 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}

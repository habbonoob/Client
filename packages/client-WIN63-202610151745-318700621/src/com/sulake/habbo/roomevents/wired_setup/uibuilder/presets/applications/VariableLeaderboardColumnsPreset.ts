import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { VariableLeaderboardColumnRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/VariableLeaderboardColumnRowPreset';
import type { NamedDropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedDropdownPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { VariableLeaderboardColumn } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardColumn';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableLeaderboardColumnsPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::VariableLeaderboardColumnsPreset'); }

    private static readonly MAX_COLUMNS: number = 4;

    declare private _SafeStr_4407: (...args: any[]) => any;

    declare private _columnTypeInfo: TextPreset;

    declare private _SafeStr_14381: NamedDropdownPreset;

    declare private _valueGuidance: TextPreset;

    declare private _SafeStr_2959: VariableLeaderboardColumnRowPreset[];

    declare private _lastTypes: number[];

    declare private _content: SimpleListViewPreset;

    private _SafeStr_14408: number = 2;

    declare private _SafeStr_14409: boolean;
    static { (this.prototype as any)._SafeStr_14409 = false; }

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any) {
        let _loc7_: number = 0;
        let _loc8_: VariableLeaderboardColumnRowPreset = null;
        super(param1, param2, param3);
        this._SafeStr_4407 = param4;
        let _loc5_: TextParam = new TextParam(1);
        _loc5_.textColor = param3.softTextColor;
        this._columnTypeInfo = param2.createText("${wiredfurni.params.variable_leaderboard.column_type_info}", _loc5_);
        this._columnTypeInfo.visible = false;
        this._SafeStr_14381 = param2.createNamedDropdown(new DropdownParam("", [], this.onCountChanged), "${wiredfurni.params.variable_leaderboard.columns.count}");
        let _loc9_: TextParam = new TextParam(1);
        _loc9_.textColor = param3.softTextColor;
        this._valueGuidance = param2.createText("${wiredfurni.params.variable_leaderboard.value_unavailable}", _loc9_);
        this._SafeStr_2959 = [];
        this._lastTypes = [];
        let _loc6_: any[] = [this._SafeStr_14381, this._valueGuidance];
        _loc7_ = 0;
        while (_loc7_ < 4) {
            _loc8_ = param2.createVariableLeaderboardColumnRowPreset(_loc7_, this.onRowChanged);
            _loc8_.visible = _loc7_ < this._SafeStr_14408;
            this._SafeStr_2959.push(_loc8_);
            this._lastTypes.push(-1);
            _loc6_.push(_loc8_);
            _loc7_++;
        }
        _loc6_.push(this._columnTypeInfo);
        this._content = param2.createSimpleListView(true, _loc6_);
    }

    private static columnTypeOption(param1: number): ExpandableDropdownOption {
        return new ExpandableDropdownOption(param1, VariableLeaderboardColumnsPreset.columnTypeLabel(param1));
    }

    private static defaultColumnLabel(param1: number): string {
        switch (param1) {
            case 0:
                return "Username";
            case 1:
                return "Value";
            case 2:
                return "Last update";
            case 3:
                return "Creation";
            case 4:
                return "Level";
            case 5:
                return "Text";
            default:
                return "Column";
        }
    }

    private static columnTypeLabel(param1: number): string {
        switch (param1) {
            case 0:
                return "${wiredfurni.params.variable_leaderboard.column.username}";
            case 1:
                return "${wiredfurni.params.variable_leaderboard.column.value}";
            case 2:
                return "${wiredfurni.params.variable_leaderboard.column.last_update}";
            case 3:
                return "${wiredfurni.params.variable_leaderboard.column.creation}";
            case 4:
                return "${wiredfurni.params.variable_leaderboard.column.level}";
            case 5:
                return "${wiredfurni.params.variable_leaderboard.column.text_connection}";
            default:
                return String(param1);
        }
    }

    public initialize(param1: VariableLeaderboardColumn[], param2: boolean): void {
        let _loc4_: number = 0;
        let _loc3_: VariableLeaderboardColumn = null;
        this._SafeStr_4202 = true;
        this._SafeStr_14409 = param2;
        this._SafeStr_14408 = param1.length | 0;
        this._SafeStr_14381.reinit(this.countOptions(), this._SafeStr_14408);
        this._valueGuidance.visible = !this._SafeStr_14409;
        _loc4_ = 0;
        while (_loc4_ < 4) {
            _loc3_ = _loc4_ < param1.length ? param1[_loc4_] : this.defaultColumnFor(_loc4_);
            this._SafeStr_2959[_loc4_].initialize(_loc3_, this.columnTypeOptions(_loc4_), _loc4_ == 0);
            this._SafeStr_2959[_loc4_].visible = _loc4_ < this._SafeStr_14408;
            this._lastTypes[_loc4_] = _loc3_.type;
            _loc4_++;
        }
        this.refreshOptions();
        this._SafeStr_4202 = false;
    }

    public get columns(): VariableLeaderboardColumn[] {
        let _loc2_: number = 0;
        let _loc1_: VariableLeaderboardColumn[] = [];
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_14408) {
            _loc1_.push(this._SafeStr_2959[_loc2_].column);
            _loc2_++;
        }
        return _loc1_;
    }

    private onCountChanged = (param1: ExpandableDropdownOption): void => {
        let _loc4_: number = 0;
        let _loc2_: VariableLeaderboardColumn = null;
        if (this._SafeStr_4202 || param1 == null || param1.id == this._SafeStr_14408) {
            return;
        }
        this._SafeStr_4202 = true;
        let _loc3_: number = this._SafeStr_14408;
        _loc4_ = Math.min(_loc3_, param1.id) | 0;
        while (_loc4_ < Math.max(_loc3_, param1.id)) {
            _loc2_ = this.defaultColumnFor(_loc4_);
            this._SafeStr_2959[_loc4_].initialize(_loc2_, this.columnTypeOptions(_loc4_), _loc4_ == 0);
            this._lastTypes[_loc4_] = _loc2_.type;
            _loc4_++;
        }
        this._SafeStr_14408 = param1.id;
        _loc4_ = 0;
        while (_loc4_ < 4) {
            this._SafeStr_2959[_loc4_].visible = _loc4_ < this._SafeStr_14408;
            _loc4_++;
        }
        this.refreshOptions();
        this._SafeStr_4202 = false;
        this.notifyChanged();
        this._roomEvents.wiredCtrl.resizeFrame();
    };

    private onRowChanged = (param1: VariableLeaderboardColumnRowPreset, param2: boolean): void => {
        if (this._SafeStr_4202 || param1.index >= this._SafeStr_14408) {
            return;
        }
        let _loc3_: boolean = this._columnTypeInfo.visible;
        this._SafeStr_4202 = true;
        if (param2 && param1.label == VariableLeaderboardColumnsPreset.defaultColumnLabel(this._lastTypes[param1.index])) {
            param1.label = VariableLeaderboardColumnsPreset.defaultColumnLabel(param1.type);
        }
        if (param2 && param1.width == VariableLeaderboardColumn.defaultWidth(this._lastTypes[param1.index])) {
            param1.width = VariableLeaderboardColumn.defaultWidth(param1.type);
        }
        this._lastTypes[param1.index] = param1.type;
        this.refreshOptions();
        this._SafeStr_4202 = false;
        this.notifyChanged();
        if (this._columnTypeInfo.visible != _loc3_) {
            this._roomEvents.wiredCtrl.resizeFrame();
        }
    };

    private notifyChanged(): void {
        if (this._SafeStr_4407 != null) {
            this._SafeStr_4407(this.columns);
        }
    }

    private refreshOptions(): void {
        let _loc2_: number = 0;
        let _loc1_: boolean = false;
        _loc2_ = 0;
        while (_loc2_ < 4) {
            this._SafeStr_2959[_loc2_].refreshTypeOptions(this.columnTypeOptions(_loc2_), _loc2_ == 0);
            if (_loc2_ < this._SafeStr_14408 && (this._SafeStr_2959[_loc2_].type == 5 || this._SafeStr_2959[_loc2_].type == 4)) {
                _loc1_ = true;
            }
            _loc2_++;
        }
        this._columnTypeInfo.visible = _loc1_;
        this._SafeStr_14381.reinit(this.countOptions(), this._SafeStr_14408);
    }

    private columnTypeOptions(param1: number): ExpandableDropdownOption[] {
        let _loc2_: ExpandableDropdownOption[] = [];
        if (param1 == 0) {
            _loc2_.push(VariableLeaderboardColumnsPreset.columnTypeOption(0));
            return _loc2_;
        }
        let _loc3_: number[] = Array.from([1, 5, 2, 3, 4]);
        for (const _loc4_ of _loc3_ ?? []) {
            _loc2_.push(VariableLeaderboardColumnsPreset.columnTypeOption(_loc4_));
        }
        return _loc2_;
    }

    private countOptions(): ExpandableDropdownOption[] {
        let _loc2_: number = 0;
        let _loc1_: ExpandableDropdownOption[] = [];
        _loc2_ = 1;
        while (_loc2_ <= 4) {
            _loc1_.push(new ExpandableDropdownOption(_loc2_, String(_loc2_)));
            _loc2_++;
        }
        return _loc1_;
    }

    private defaultColumnFor(param1: number): VariableLeaderboardColumn {
        if (param1 == 0) {
            return new VariableLeaderboardColumn(0, VariableLeaderboardColumnsPreset.defaultColumnLabel(0), 3);
        }
        let _loc2_: number[] = Array.from([1, 5, 2, 3, 4]);
        for (const _loc3_ of _loc2_ ?? []) {
            if (!this.isColumnTypeUsedBefore(_loc3_, param1)) {
                return new VariableLeaderboardColumn(_loc3_, VariableLeaderboardColumnsPreset.defaultColumnLabel(_loc3_), VariableLeaderboardColumn.defaultWidth(_loc3_));
            }
        }
        return new VariableLeaderboardColumn(2, VariableLeaderboardColumnsPreset.defaultColumnLabel(2), 1);
    }

    private isColumnTypeUsedBefore(param1: number, param2: number): boolean {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param2) {
            if (this._SafeStr_2959[_loc3_].type == param1) {
                return true;
            }
            _loc3_++;
        }
        return false;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._content.resizeToWidth(param1);
    }

    public override get window(): IWindow {
        return this._content.window;
    }

    protected override get childPresets(): any[] {
        return [this._content];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_4407 = null;
        this._columnTypeInfo = null;
        this._SafeStr_14381 = null;
        this._valueGuidance = null;
        this._SafeStr_2959 = null;
        this._lastTypes = null;
        this._content = null;
    }
}

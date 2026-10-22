import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { VariableLeaderboardColumn } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardColumn';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableLeaderboardColumnRowPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::VariableLeaderboardColumnRowPreset'); }

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _SafeStr_4407: (...args: any[]) => any;

    declare private _SafeStr_2460: DropdownPreset;

    declare private _SafeStr_14387: TextInputPreset;

    declare private _SafeStr_14388: DropdownPreset;

    declare private _SafeStr_3375: SimpleListViewPreset;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._index = param4;
        this._SafeStr_4407 = param5;
        this._SafeStr_2460 = param2.createDropdown(new DropdownParam("", [], this.onTypeChanged));
        this._SafeStr_14387 = param2.createTextInput(new TextInputParam("", 12, "${wiredfurni.params.variable_leaderboard.column_name}", -1, null, true, null, false));
        this._SafeStr_14387.addListener(this.onLabelChanged);
        this._SafeStr_14388 = param2.createDropdown(new DropdownParam("", VariableLeaderboardColumnRowPreset.widthOptions(), this.onWidthChanged, "", 82));
        this._SafeStr_3375 = param2.createSimpleListView(false, [this._SafeStr_2460, this._SafeStr_14387, this._SafeStr_14388], true);
    }

    private static widthOptions(): ExpandableDropdownOption[] {
        return Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.variable_leaderboard.column_width.small}"), new ExpandableDropdownOption(1, "${wiredfurni.params.variable_leaderboard.column_width.medium}"), new ExpandableDropdownOption(2, "${wiredfurni.params.variable_leaderboard.column_width.large}"), new ExpandableDropdownOption(3, "${wiredfurni.params.variable_leaderboard.column_width.xl}")]);
    }

    public initialize(param1: VariableLeaderboardColumn, param2: ExpandableDropdownOption[], param3: boolean): void {
        this._SafeStr_4202 = true;
        this._SafeStr_2460.reinit(param2, param1.type);
        this._SafeStr_2460.disabled = param3;
        this._SafeStr_14387.text = param1.label;
        this._SafeStr_14388.reinit(VariableLeaderboardColumnRowPreset.widthOptions(), param1.width);
        this._SafeStr_4202 = false;
    }

    public refreshTypeOptions(param1: ExpandableDropdownOption[], param2: boolean): void {
        this._SafeStr_4202 = true;
        this._SafeStr_2460.reinit(param1, this._SafeStr_2460.selectedId);
        this._SafeStr_2460.disabled = param2;
        this._SafeStr_4202 = false;
    }

    public get column(): VariableLeaderboardColumn {
        return new VariableLeaderboardColumn(this.type, this.label, this.width);
    }

    public get index(): number {
        return this._index;
    }

    public get type(): number {
        return this._SafeStr_2460.selectedId;
    }

    public get label(): string {
        return this._SafeStr_14387.text;
    }

    public set label(param1: string) {
        this._SafeStr_4202 = true;
        this._SafeStr_14387.text = param1;
        this._SafeStr_4202 = false;
    }

    public get width(): number {
        return this._SafeStr_14388.selectedId;
    }

    public set width(param1: number) {
        this._SafeStr_4202 = true;
        this._SafeStr_14388.selectedId = param1;
        this._SafeStr_4202 = false;
    }

    private onTypeChanged = (param1: ExpandableDropdownOption): void => {
        if (!this._SafeStr_4202 && param1 != null && this._SafeStr_4407 != null) {
            this._SafeStr_4407(this, true);
        }
    };

    private onLabelChanged = (param1: string): void => {
        if (!this._SafeStr_4202 && this._SafeStr_4407 != null) {
            this._SafeStr_4407(this, false);
        }
    };

    private onWidthChanged = (param1: ExpandableDropdownOption): void => {
        if (!this._SafeStr_4202 && param1 != null && this._SafeStr_4407 != null) {
            this._SafeStr_4407(this, false);
        }
    };

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_3375.resizeToWidth(param1);
    }

    public override get window(): IWindow {
        return this._SafeStr_3375.window;
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_3375];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_4407 = null;
        this._SafeStr_2460 = null;
        this._SafeStr_14387 = null;
        this._SafeStr_14388 = null;
        this._SafeStr_3375 = null;
    }
}

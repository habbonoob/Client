import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableLeaderboardContext } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableLeaderboardContext';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableLeaderboardController } from '@/com/sulake/habbo/roomevents/variable_leaderboard/VariableLeaderboardController';
import type { VariableLeaderboardConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardConfig';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { VariableLeaderboardLocation } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardLocation';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableLeaderboardLocationPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::VariableLeaderboardLocationPreset'); }

    declare private _status: TextPreset;

    declare private _tileX: NumberInputPreset;

    declare private _tileY: NumberInputPreset;

    declare private _offsetX: NumberInputPreset;

    declare private _altitude: NumberInputPreset;

    declare private _content: SimpleListViewPreset;

    declare private _controller: VariableLeaderboardController;

    declare private _SafeStr_4407: (...args: any[]) => any;

    declare private _active: boolean;
    static { (this.prototype as any)._active = false; }

    declare private _editingCoordinates: boolean;
    static { (this.prototype as any)._editingCoordinates = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        let _loc5_: TextParam = new TextParam(1);
        _loc5_.textColor = param3.softTextColor;
        this._status = param2.createText("", _loc5_);
        this._tileX = param2.createNumberInput(new NumberInputParam(0, -2147483648, 2147483647, 32));
        this._tileY = param2.createNumberInput(new NumberInputParam(0, -2147483648, 2147483647, 32));
        this._offsetX = param2.createNumberInput(new NumberInputParam(0, -32, 32, 32));
        this._altitude = param2.createNumberInput(new NumberInputParam(0, -2147483648, 2147483647, 32));
        this._tileX.onValueChange = this.onCoordinatesChanged;
        this._tileY.onValueChange = this.onCoordinatesChanged;
        this._offsetX.onValueChange = this.onCoordinatesChanged;
        this._altitude.onValueChange = this.onCoordinatesChanged;
        let _loc4_: SimpleListViewPreset = param2.createSimpleListView(false, [param2.createText("${wiredfurni.params.variable_leaderboard.location.tile}", new TextParam(0)), this._tileX, param2.createText("-", new TextParam(0)), this._tileY, param2.createSpacer(0), param2.createText("${wiredfurni.params.variable_leaderboard.location.offset}", new TextParam(0)), this._offsetX, param2.createText("-", new TextParam(0)), this._altitude], true);
        _loc4_.spacing = param3.genericVerticalSpacing - 1;
        this._content = param2.createSimpleListView(true, [this._status, _loc4_]);
    }

    public initialize(param1: VariableLeaderboardLocation, param2: boolean, param3: boolean): void {
        this._status.text = param2 ? (param3 ? "${wiredfurni.params.variable_leaderboard.location.drag_published}" : "${wiredfurni.params.variable_leaderboard.location.drag_status}") : "${wiredfurni.params.variable_leaderboard.location.unavailable}";
        this.refreshCoordinates(param1);
        this._content.disabled = !param2;
    }

    public beginEdit(param1: VariableLeaderboardController, param2: VariableLeaderboardContext, param3: VariableLeaderboardConfig, param4: (...args: any[]) => any): boolean {
        this.endEdit();
        this._controller = param1;
        this._SafeStr_4407 = param4;
        this._active = this._controller != null && this._controller.beginLocationEdit(param2, param3, this.onLocationChanged);
        this.initialize(param3.location, this._active, param2.published);
        if (this._active) {
            this._controller.updateEditDraft(param3);
        } else {
            this._controller = null;
            this._SafeStr_4407 = null;
        }
        return this._active;
    }

    public updateEditDraft(param1: VariableLeaderboardConfig): void {
        if (this._active && this._controller != null) {
            this._controller.updateEditDraft(param1);
        }
    }

    public endEdit(): void {
        if (this._active && this._controller != null) {
            this._controller.endLocationEdit();
        }
        this._controller = null;
        this._SafeStr_4407 = null;
        this._active = false;
    }

    private onLocationChanged = (param1: VariableLeaderboardLocation): void => {
        if (!this._active || param1 == null) {
            return;
        }
        if (!this._editingCoordinates) {
            this.refreshCoordinates(param1);
        }
        if (this._SafeStr_4407 != null) {
            this._SafeStr_4407(param1);
        }
    };

    private onCoordinatesChanged = (param1: number): void => {
        if (!this._active) {
            return;
        }
        this._editingCoordinates = true;
        this._controller.updateDraggedLocation(new VariableLeaderboardLocation(this._tileX.value, this._tileY.value, this._offsetX.value, this._altitude.value));
        this._editingCoordinates = false;
    };

    private refreshCoordinates(param1: VariableLeaderboardLocation): void {
        if (param1 == null) {
            return;
        }
        this._tileX.value = param1.tileX;
        this._tileY.value = param1.tileY;
        this._offsetX.value = param1.offsetX;
        this._altitude.value = param1.altitude;
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
        this.endEdit();
        this._tileX.onValueChange = null;
        this._tileY.onValueChange = null;
        this._offsetX.onValueChange = null;
        this._altitude.onValueChange = null;
        super.dispose();
        this._status = null;
        this._tileX = null;
        this._tileY = null;
        this._offsetX = null;
        this._altitude = null;
        this._content = null;
    }
}

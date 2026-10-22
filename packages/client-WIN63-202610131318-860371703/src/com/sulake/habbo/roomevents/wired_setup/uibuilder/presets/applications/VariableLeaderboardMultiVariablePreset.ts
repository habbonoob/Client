import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableLeaderboardContext } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableLeaderboardContext';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableLeaderboardConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardConfig';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { VariableLeaderboardDisplayNameFormatter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardDisplayNameFormatter';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableLeaderboardMultiVariablePreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::VariableLeaderboardMultiVariablePreset'); }

    private static readonly MAX_ROWS: number = 10;

    declare private _SafeStr_4407: (...args: any[]) => any;

    declare private _SafeStr_2959: SimpleListViewPreset[];

    declare private _labels: TextPreset[];

    declare private _SafeStr_14379: TextInputPreset[];

    declare private _variableIds: string[];

    declare private _suggestions: string[];

    declare private _content: SimpleListViewPreset;

    declare private _SafeStr_14380: number;
    static { (this.prototype as any)._SafeStr_14380 = 0; }

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any) {
        let _loc8_: number = 0;
        let _loc10_: TextPreset = null;
        let _loc5_: TextInputPreset = null;
        let _loc11_: SimpleListViewPreset = null;
        super(param1, param2, param3);
        this._SafeStr_4407 = param4;
        let _loc6_: TextParam = new TextParam(1);
        _loc6_.textColor = param3.softTextColor;
        let _loc12_: TextPreset = param2.createText("${wiredfurni.params.variable_leaderboard.multi_variable_info}", _loc6_);
        let _loc9_: WiredUIPreset = param2.createButton("${wiredfurni.params.variable_leaderboard.suggest}", this.onSuggest);
        this._SafeStr_2959 = [];
        this._labels = [];
        this._SafeStr_14379 = [];
        this._variableIds = [];
        this._suggestions = [];
        let _loc7_: any[] = [_loc12_, _loc9_];
        _loc8_ = 0;
        while (_loc8_ < 10) {
            _loc10_ = param2.createText(" ", new TextParam(0));
            _loc5_ = param2.createTextInput(new TextInputParam("", 22));
            _loc5_.addListener(this.displayNameCallback(_loc8_));
            _loc11_ = param2.createSimpleListView(false, [_loc10_, _loc5_], true);
            _loc11_.visible = false;
            this._SafeStr_2959.push(_loc11_);
            this._labels.push(_loc10_);
            this._SafeStr_14379.push(_loc5_);
            this._variableIds.push(null);
            this._suggestions.push(null);
            _loc7_.push(_loc11_);
            _loc8_++;
        }
        this._content = param2.createSimpleListView(true, _loc7_);
    }

    public initialize(param1: VariableLeaderboardContext, param2: VariableLeaderboardConfig): void {
        let _loc3_: number = 0;
        this._SafeStr_4202 = true;
        this._SafeStr_14380 = 0;
        if (param1 != null) {
            for (const _loc5_ of param1.choices ?? []) {
                this.activateRow(_loc5_.variableId, _loc5_.technicalName, VariableLeaderboardDisplayNameFormatter.suggest(_loc5_.technicalName), param2.displayOverrideFor(_loc5_.variableId));
            }
        }
        _loc3_ = this._SafeStr_14380;
        while (_loc3_ < 10) {
            this._SafeStr_2959[_loc3_].visible = false;
            this._variableIds[_loc3_] = null;
            this._suggestions[_loc3_] = null;
            _loc3_++;
        }
        let _loc4_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_14380) {
            _loc4_ = Math.max(_loc4_, this._labels[_loc3_].width) | 0;
            _loc3_++;
        }
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_14380) {
            this._labels[_loc3_].width = _loc4_;
            _loc3_++;
        }
        this._content.resize();
        this._SafeStr_4202 = false;
    }

    public get displayOverrides(): any {
        let _loc2_: number = 0;
        let _loc3_: string = null;
        let _loc1_: any = {};
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_14380) {
            _loc3_ = this._SafeStr_14379[_loc2_].text;
            if (_loc3_.length > 0 && _loc3_ != this._suggestions[_loc2_]) {
                _loc1_[this._variableIds[_loc2_]] = _loc3_;
            }
            _loc2_++;
        }
        return _loc1_;
    }

    private activateRow(param1: string, param2: string, param3: string, param4: string): void {
        if (this._SafeStr_14380 >= 10) {
            return;
        }
        let _loc5_: number = this._SafeStr_14380++;
        this._variableIds[_loc5_] = param1;
        this._suggestions[_loc5_] = param3;
        castGuarded(this._labels[_loc5_].window, isITextWindow, "com.sulake.core.window.components.ITextWindow").autoSize = "left";
        this._labels[_loc5_].text = param2 + " =";
        this._SafeStr_14379[_loc5_].text = param4 == null || param4.length == 0 ? param3 : param4;
        this._SafeStr_2959[_loc5_].visible = true;
    }

    private onSuggest = (...rest: any[]): void => {
        let _loc2_: number = 0;
        this._SafeStr_4202 = true;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_14380) {
            this._SafeStr_14379[_loc2_].text = this._suggestions[_loc2_];
            _loc2_++;
        }
        this._SafeStr_4202 = false;
        this.notifyChanged();
    };

    private onDisplayNameChanged(param1: number, param2: string): void {
        if (!this._SafeStr_4202 && param1 < this._SafeStr_14380) {
            this.notifyChanged();
        }
    }

    private notifyChanged(): void {
        if (this._SafeStr_4407 != null) {
            this._SafeStr_4407(this.displayOverrides);
        }
    }

    private displayNameCallback(param1: number): (...args: any[]) => any {
        let index: number = param1;
        return (param1: string): void => {
             this.onDisplayNameChanged(index, param1);
         };
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
        this._SafeStr_2959 = null;
        this._labels = null;
        this._SafeStr_14379 = null;
        this._variableIds = null;
        this._suggestions = null;
        this._content = null;
    }
}

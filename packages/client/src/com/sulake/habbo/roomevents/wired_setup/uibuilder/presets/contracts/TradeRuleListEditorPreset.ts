import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { TradeRuleEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleEditorPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class TradeRuleListEditorPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.contracts::TradeRuleListEditorPreset'); }

    public static readonly MAX_RULES: number = 3;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any, param5: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_4541 = param4;
        this._SafeStr_4352 = param5;
        this._SafeStr_2221 = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._SafeStr_2221.spacing = param3.genericVerticalSpacing;
        this._addMorePreset = param2.createButton("${wiredcontracts.payment_add_more}", this.onAddMore);
        this._SafeStr_2523 = [];
        this._SafeStr_2221.addListItem(this._addMorePreset.window);
        this.refreshAddMoreVisibility();
    }

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_2523: TradeRuleEditorPreset[];

    declare private _addMorePreset: ButtonPreset;

    declare private _SafeStr_4541: (...args: any[]) => any;

    declare private _SafeStr_4352: (...args: any[]) => any;

    public override get window(): IWindow {
        return this._SafeStr_2221;
    }

    protected override get childPresets(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._SafeStr_2523 ?? []) {
            _loc1_.push(_loc2_);
        }
        _loc1_.push(this._addMorePreset);
        return _loc1_;
    }

    public set rules(param1: TradeRequirementRule[]) {
        let _loc2_: TradeRuleEditorPreset = null;
        this.removeAllRules();
        if (param1.length == 0) {
            param1 = [];
            param1.push(new TradeRequirementRule([]));
        }
        let _loc3_: number = 1;
        for (const _loc4_ of param1 ?? []) {
            _loc2_ = this._presetManager.createRuleEditorPreset("-", this._SafeStr_4541, this._SafeStr_4352, _loc3_ == 1 ? null : this.onRuleRemoved);
            _loc2_.rule = _loc4_.deepCopy();
            this._SafeStr_2523.push(_loc2_);
            this._SafeStr_2221.addListItemAt(_loc2_.window, this._SafeStr_2221.numListItems - 1 >>> 0);
            _loc2_.resizeToWidth(this._SafeStr_2221.width);
            _loc3_ += 1;
        }
        this.fixNames();
        this.refreshAddMoreVisibility();
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2221.width = param1;
        for (const _loc2_ of this._SafeStr_2523 ?? []) {
            _loc2_.resizeToWidth(param1);
        }
        this._addMorePreset.resizeToWidth(param1);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2523 = null;
        this._addMorePreset = null;
        this._SafeStr_4541 = null;
        this._SafeStr_4352 = null;
        this._SafeStr_2221.dispose();
        this._SafeStr_2221 = null;
    }

    public finalizeRules(): TradeRequirementRule[] {
        let _loc1_: TradeRequirementRule = null;
        let _loc2_: TradeRequirementRule[] = [];
        for (const _loc3_ of this._SafeStr_2523 ?? []) {
            _loc1_ = _loc3_.finalizeRule();
            if (_loc1_.nodes.length > 0) {
                _loc2_.push(_loc1_);
            }
        }
        return _loc2_;
    }

    private onAddMore = (): void => {
        let _loc3_: number = this._SafeStr_2221.numListItems;
        let _loc2_: TradeRequirementRule = new TradeRequirementRule([]);
        let _loc1_: TradeRuleEditorPreset = this._presetManager.createRuleEditorPreset("", this._SafeStr_4541, this._SafeStr_4352, _loc3_ == 1 ? null : this.onRuleRemoved);
        _loc1_.rule = _loc2_;
        this._SafeStr_2523.push(_loc1_);
        this._SafeStr_2221.addListItemAt(_loc1_.window, _loc3_ - 1 >>> 0);
        _loc1_.resizeToWidth(this._SafeStr_2221.width);
        this.fixNames();
        this.refreshAddMoreVisibility();
    };

    private refreshAddMoreVisibility(): void {
        this._addMorePreset.disabled = this._SafeStr_2523.length >= 3;
    }

    private onRuleRemoved = (param1: TradeRuleEditorPreset): void => {
        let _loc2_: number = this._SafeStr_2523.indexOf(param1);
        if (_loc2_ == -1) {
            return;
        }
        this._SafeStr_2221.removeListItemAt(_loc2_);
        this._SafeStr_2523.splice(_loc2_, 1)[0];
        param1.dispose();
        this.fixNames();
        this.refreshAddMoreVisibility();
    };

    private removeAllRules(): void {
        while (this._SafeStr_2221.numListItems > 1) {
            this._SafeStr_2221.removeListItemAt(0);
        }
        for (const _loc1_ of this._SafeStr_2523 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_2523 = [];
        this.refreshAddMoreVisibility();
    }

    private fixNames(): void {
        let _loc3_: string = null;
        let _loc1_: number = 0;
        for (const _loc2_ of this._SafeStr_2523 ?? []) {
            _loc1_++;
            _loc3_ = this.localizations.getLocalizationWithParams("wiredcontracts.payment_rule", "", "i", _loc1_);
            _loc2_.updateTitle(_loc3_);
        }
    }
}

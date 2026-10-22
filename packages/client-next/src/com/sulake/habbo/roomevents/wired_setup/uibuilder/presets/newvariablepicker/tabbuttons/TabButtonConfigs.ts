import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableNode } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNode';
import { TabButtonConfig } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/tabbuttons/TabButtonConfig';

export class TabButtonConfigs {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker.tabbuttons::TabButtonConfigs'); }

    public static ALL_TAB_ID: number = 0;
    public static RECENT_TAB_ID: number = 1;
    public static USER_CREATED_TAB_ID: number = 2;
    public static DYNAMIC_TAB_ID: number = 3;
    public static INTERNAL_TAB_ID: number = 4;
    public static _SafeStr_6424: number = 5;

    declare private _SafeStr_3043: NewVariablePicker;

    declare private _tabButtons: TabButtonConfig[];

    constructor(param1: NewVariablePicker) {
        this._SafeStr_3043 = param1;
        this._tabButtons = Array.from([new TabButtonConfig(TabButtonConfigs.ALL_TAB_ID, "var_picker_all", "wiredfurni.variable_picker.tab.all", this.allFilter), new TabButtonConfig(TabButtonConfigs.RECENT_TAB_ID, "var_picker_recent", "wiredfurni.variable_picker.tab.recent", this.recentFilter), new TabButtonConfig(TabButtonConfigs.USER_CREATED_TAB_ID, "var_picker_usermade", "wiredfurni.variable_picker.tab.user_created", this.userCreatedFilter), new TabButtonConfig(TabButtonConfigs.DYNAMIC_TAB_ID, "var_picker_smart", "wiredfurni.variable_picker.tab.dynamic", this.dynamicFilter), new TabButtonConfig(TabButtonConfigs.INTERNAL_TAB_ID, "var_picker_internal", "wiredfurni.variable_picker.tab.internal", this.internalFilter), new TabButtonConfig(TabButtonConfigs._SafeStr_6424, "var_picker_search", "wiredfurni.variable_picker.tab.search", this.searchFilter)]);
    }

    public get tabButtons(): TabButtonConfig[] {
        return this._tabButtons;
    }

    private nodesFromVector(param1: WiredVariable[], param2: boolean = false): VariableNode {
        let _loc11_: any[] = null;
        let _loc9_: VariableNode = null;
        let _loc10_: number = 0;
        let _loc5_: string = null;
        let _loc4_: boolean = false;
        let _loc6_: VariableNode = null;
        let _loc7_: VariableNode = new VariableNode(null, null);
        for (const _loc8_ of param1 ?? []) {
            _loc11_ = Util.splitName(_loc8_);
            _loc9_ = _loc7_;
            _loc10_ = 0;
            while (_loc10_ < _loc11_.length) {
                _loc5_ = stringOrNull(_loc11_[_loc10_]);
                _loc4_ = _loc10_ == _loc11_.length - 1;
                _loc6_ = _loc9_.getChildNodeByName(_loc5_);
                if (_loc6_ == null) {
                    _loc6_ = new VariableNode(_loc4_ ? _loc8_ : null, _loc5_);
                    _loc9_.addChildNode(_loc6_);
                }
                _loc9_ = _loc6_;
                _loc10_ += 1;
            }
        }
        if (param2) {
            for (const _loc3_ of _loc7_.children ?? []) {
                _loc3_.flatten(true);
            }
        }
        return _loc7_;
    }

    private allFilter = (): VariableNode => {
        return this.nodesFromVector(this._SafeStr_3043.filteredVariables);
    };

    private recentFilter = (): VariableNode => {
        let _loc3_: WiredVariable = null;
        let _loc1_: WiredVariable[] = [];
        let _loc2_: string[] = this._SafeStr_3043.roomEvents.variablePickerHelper.getHistory(this._SafeStr_3043.variableTarget);
        for (const _loc4_ of _loc2_ ?? []) {
            _loc3_ = this._SafeStr_3043.filteredVariableById(_loc4_);
            if (_loc3_ != null) {
                _loc1_.push(_loc3_);
            }
        }
        return this.nodesFromVector(_loc1_, true);
    };

    private userCreatedFilter = (): VariableNode => {
        let _loc1_: WiredVariable[] = [];
        for (const _loc2_ of this._SafeStr_3043.filteredVariables ?? []) {
            if (_loc2_.variableType == WiredVariableType._SafeStr_7398 || _loc2_.variableType == WiredVariableType._SafeStr_7425) {
                _loc1_.push(_loc2_);
            }
        }
        return this.nodesFromVector(_loc1_);
    };

    private dynamicFilter = (): VariableNode => {
        let _loc1_: WiredVariable[] = [];
        for (const _loc2_ of this._SafeStr_3043.filteredVariables ?? []) {
            if (_loc2_.variableType == WiredVariableType._SafeStr_7415) {
                _loc1_.push(_loc2_);
            }
        }
        return this.nodesFromVector(_loc1_);
    };

    private internalFilter = (): VariableNode => {
        let _loc1_: WiredVariable[] = [];
        for (const _loc2_ of this._SafeStr_3043.filteredVariables ?? []) {
            if (_loc2_.variableType == WiredVariableType.INTERNAL) {
                _loc1_.push(_loc2_);
            }
        }
        return this.nodesFromVector(_loc1_);
    };

    private searchFilter = (): VariableNode => {
        let _loc6_: any;
        let _loc5_: boolean = false;
        let _loc3_: string = this._SafeStr_3043.inputField.text;
        if (_loc3_.length == Number("")) {
            return this.nodesFromVector([]);
        }
        let _loc2_: any[] = _loc3_.split(" ");
        let _loc1_: WiredVariable[] = [];
        for (const _loc4_ of this._SafeStr_3043.filteredVariables ?? []) {
            _loc5_ = true;
            for (_loc6_ of _loc2_ ?? []) {
                if (_loc4_.variableName.toLowerCase().indexOf(stringOrNull(_loc6_.toLowerCase())) == -1) {
                    _loc5_ = false;
                    break;
                }
            }
            if (_loc5_) {
                _loc1_.push(_loc4_);
            }
        }
        return this.nodesFromVector(_loc1_, true);
    };
}

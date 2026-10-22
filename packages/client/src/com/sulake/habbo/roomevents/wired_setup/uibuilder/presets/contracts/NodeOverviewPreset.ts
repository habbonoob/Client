import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TradeRuleNodeView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleNodeView';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { TradeRuleEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleEditorPreset';

export class NodeOverviewPreset extends TradeRuleEditorPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.contracts::NodeOverviewPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: (...args: any[]) => any = null) {
        super(param1, param2, param3, param4, null, null);
        let _loc6_: IIconButtonWindow = this.addMoreButton;
        _loc6_.parent = null;
        _loc6_.dispose();
        this.closeRegion.visible = false;
        this._SafeStr_5581 = param5;
    }

    declare private _SafeStr_5581: (...args: any[]) => any;

    protected override get isOneLineMode(): boolean {
        return false;
    }

    protected override get showNodeCloseButton(): boolean {
        return false;
    }

    protected override updateCloseButtonVisibility(): void {
    }

    public override editNode(param1: TradeRuleNodeView): void {
        if (this._SafeStr_5581 != null) {
            this._SafeStr_5581(param1.node);
        }
    }

    protected override initInstanceFields(): void {
        this._SafeStr_5581 = null;
        super.initInstanceFields();
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6106 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/_SafeCls_6106';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { _SafeCls_6105 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6105';

export class _SafeCls_6100 extends _SafeCls_6105 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx::_SafeCls_6100'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_FX_LEVELLING_PROGRESS;
    }

    protected override get categoryId(): number {
        return 2;
    }

    protected override createTopInfoPreset(param1: PresetManager): WiredUIPreset {
        return param1.createUsageInfoSection("${wiredfurni.params.variablefx.levelling_progress.info}");
    }

    protected override readIntParams(param1: any[], param2: _SafeCls_6106): void {
        super.readIntParams(param1, param2);
        param2.subRendererId = param1[21] | 0;
    }

    protected override writeIntParams(param1: any[], param2: _SafeCls_6106): void {
        super.writeIntParams(param1, param2);
        param1.push(param2.subRendererId);
    }
}

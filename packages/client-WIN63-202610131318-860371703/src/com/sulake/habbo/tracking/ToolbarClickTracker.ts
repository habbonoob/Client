import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';

export class ToolbarClickTracker {
    static { registerClassName(this, 'com.sulake.habbo.tracking::ToolbarClickTracker'); }

    declare private _tracking: HabboTracking;

    private _SafeStr_5533: number = 0;

    constructor(param1: HabboTracking) {
        this._tracking = param1;
    }

    public track(param1: string): void {
        if (!this._tracking.getBoolean("toolbar.tracking.enabled")) {
            return;
        }
        this._SafeStr_5533 = this._SafeStr_5533 + 1;
        if (this._SafeStr_5533 <= this._tracking.getInteger("toolbar.tracking.max.events", 100)) {
            this._tracking.trackGoogle("toolbar", param1);
        }
    }
}

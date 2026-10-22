import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { LevelBadgePainter } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelBadgePainter';
import { _SafeCls_6075 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6075';
import { _SafeCls_6078 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6078';
import { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';

export class LevelWithProgressConfigPrebake implements _SafeCls_6078 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelWithProgressConfigPrebake'); }

    declare public badgePainter: LevelBadgePainter;

    public disposed: boolean = false;

    declare private _progressRendererConfig: VariableFxConfigData;

    constructor(param1: LevelBadgePainter) {
        this.badgePainter = param1;
    }

    public getOrCreateProgressRendererConfig(param1: (...args: any[]) => any): VariableFxConfigData {
        if (this._progressRendererConfig == null) {
            this._progressRendererConfig = asInstanceOf(param1(), VariableFxConfigData);
        }
        return this._progressRendererConfig;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        if (this.badgePainter != null) {
            this.badgePainter.dispose();
        }
        if (this._progressRendererConfig != null) {
            _SafeCls_6075.disposeConfigPrebake(this._progressRendererConfig);
            this._progressRendererConfig = null;
        }
    }

    get [_SafeCls_6078](): true {
        return true;
    }
}

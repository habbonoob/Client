import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { LevelBadgePainter } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelBadgePainter';
import { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import { VariableFxConfigRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigRendererPrebake';
import { VariableFxRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererPrebake';

export class LevelWithProgressConfigPrebake implements VariableFxRendererPrebake {
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
            VariableFxConfigRendererPrebake.disposeConfigPrebake(this._progressRendererConfig);
            this._progressRendererConfig = null;
        }
    }

    get [VariableFxRendererPrebake](): true {
        return true;
    }
}

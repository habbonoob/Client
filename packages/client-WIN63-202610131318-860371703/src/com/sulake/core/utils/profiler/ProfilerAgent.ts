import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ProfilerAgentTask } from '@/com/sulake/core/utils/profiler/ProfilerAgentTask';

export class ProfilerAgent extends ProfilerAgentTask implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.utils.profiler::ProfilerAgent'); }

    declare protected _receiver: IUpdateReceiver;

    constructor(param1: IUpdateReceiver) {
        // AS3 stored the receiver before super(); its class name is taken from the parameter here
        let _loc2_: string = getQualifiedClassName(param1);
        super(_loc2_.slice(_loc2_.lastIndexOf(":") + 1, _loc2_.length));
        this._receiver = param1;
    }

    public get receiver(): IUpdateReceiver {
        return this._receiver;
    }

    public override dispose(): void {
        this._receiver = null;
        super.dispose();
    }

    public update(param1: number): void {
        if (!this.paused) {
            super.start();
            this._receiver.update(param1 >>> 0);
            super.stop();
        }
    }
}

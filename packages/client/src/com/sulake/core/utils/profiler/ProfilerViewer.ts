import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IProfiler } from '@/com/sulake/core/runtime/IProfiler';
import type { ProfilerAgentTask } from '@/com/sulake/core/utils/profiler/ProfilerAgentTask';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ProfilerViewer extends TextField implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.utils.profiler::ProfilerViewer'); }

    private static padAlign(param1: string, param2: number, param3: string = " ", param4: boolean = false): string {
        let _loc6_: number = 0;
        let _loc5_: number = param2 - param1.length;
        if (_loc5_ <= 0) {
            return param1.substring(0, param2);
        }
        let _loc7_: string = "";
        _loc6_ = 0;
        while (_loc6_ < _loc5_) {
            _loc7_ += param3;
            _loc6_++;
        }
        return param4 ? _loc7_ + param1 : param1 + _loc7_;
    }

    constructor(param1: IProfiler) {
        let _loc2_: TextFormat = new TextFormat("Courier New", 8);
        super();
        this.defaultTextFormat = _loc2_;
        this.setTextFormat(_loc2_);
        this.textColor = 16777215;
        this.width = 10;
        this.height = 10;
        this.autoSize = "left";
        this.mouseEnabled = false;
        this.selectable = false;
        if (param1) {
            this._profiler = param1;
            this._profiler.addStopEventListener(this.refresh);
        }
    }

    declare private _profiler: IProfiler;

    protected _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get profiler(): IProfiler {
        return this._profiler;
    }

    public set profiler(param1: IProfiler) {
        if (!this._profiler && param1) {
            this._profiler = param1;
            this._profiler.addStopEventListener(this.refresh);
        }
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            if (this._profiler) {
                this._profiler.removeStopEventListener(this.refresh);
                this._profiler = null;
            }
            this._disposed = true;
        }
    }

    public refresh = (): void => {
        this.text = ProfilerViewer.padAlign("task", 30) + "|" + ProfilerViewer.padAlign("#rounds", 10, " ", true) + "|" + ProfilerViewer.padAlign("latest ms", 10, " ", true) + "|" + ProfilerViewer.padAlign("average ms", 10, " ", true) + "|" + ProfilerViewer.padAlign("total ms", 10, " ", true) + "|\r" + ProfilerViewer.padAlign("", 30, "-") + "|" + ProfilerViewer.padAlign("", 10, "-") + "|" + ProfilerViewer.padAlign("", 10, "-") + "|" + ProfilerViewer.padAlign("", 10, "-") + "|" + ProfilerViewer.padAlign("", 10, "-") + "|\r";
        let _loc1_: any[] = this._profiler.getProfilerAgentsInArray();
        while (_loc1_.length > 0) {
            this.recursiveUpdate(_loc1_.pop(), 0);
        }
        if (this.parent) {
            this.parent.swapChildren(this, this.parent.getChildAt(this.parent.numChildren - 1));
        }
    };

    private recursiveUpdate(param1: ProfilerAgentTask, param2: number): void {
        let _loc3_: any = 0;
        this.text += ProfilerViewer.padAlign(param1.name, 30) + "|" + ProfilerViewer.padAlign(String(param1.rounds), 10) + "|" + ProfilerViewer.padAlign(String(param1.latest), 10) + "|" + ProfilerViewer.padAlign(String(param1.average), 10) + "|" + ProfilerViewer.padAlign(String(param1.total), 10) + "|\r";
        _loc3_ = 0;
        while (_loc3_ < param1.numSubTasks) {
            this.recursiveUpdate(param1.getSubTaskAt(_loc3_ >>> 0), param2 + 1 >>> 0);
            _loc3_++;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}

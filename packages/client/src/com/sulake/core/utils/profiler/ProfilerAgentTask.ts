import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ProfilerAgentTask implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.utils.profiler::ProfilerAgentTask'); }

    constructor(param1: string, param2: string = "") {
        this._name = param1;
        this._rounds = 0;
        this._average = 0;
        this._running = false;
        this._children = [];
        this._caption = param2;
    }

    declare private _rounds: number;
    static { (this.prototype as any)._rounds = 0; }

    declare private _total: number;
    static { (this.prototype as any)._total = 0; }

    declare private _latest: number;
    static { (this.prototype as any)._latest = 0; }

    declare private _average: number;
    static { (this.prototype as any)._average = NaN; }

    declare private _running: boolean;
    static { (this.prototype as any)._running = false; }

    declare private _children: any[];

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    private _paused: boolean = false;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    declare private _caption: string;

    public get caption(): string {
        return this._caption;
    }

    public set caption(param1: string) {
        this._caption = this.caption;
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get rounds(): number {
        return this._rounds;
    }

    public get total(): number {
        return this._total;
    }

    public get latest(): number {
        return this._latest;
    }

    public get average(): number {
        return this._average;
    }

    public get running(): boolean {
        return this._running;
    }

    public get paused(): boolean {
        return this._paused;
    }

    public set paused(param1: boolean) {
        this._paused = param1;
    }

    public get numSubTasks(): number {
        return this._children.length;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
        }
    }

    public start(): void {
        if (!this._running) {
            this._startTime = getTimer() >>> 0;
            this._running = true;
        }
    }

    public stop(): void {
        if (this._running) {
            this._latest = getTimer() - this._startTime;
            this._rounds = this._rounds + 1 >>> 0;
            this._total += this._latest;
            this._average = this._total / this._rounds;
            this._running = false;
        }
    }

    public addSubTask(param1: ProfilerAgentTask): void {
        if (this.getSubTaskByName(param1.name) != null) {
            throw new Error("Component profiler task with name \"" + param1.name + "\" already exists!");
        }
        this._children.push(param1);
    }

    public removeSubTask(param1: ProfilerAgentTask): ProfilerAgentTask {
        let _loc2_: number = this._children.indexOf(param1);
        if (_loc2_ > -1) {
            this._children.splice(_loc2_, 1);
        }
        return param1;
    }

    public getSubTaskAt(param1: number): ProfilerAgentTask {
        return asInstanceOf(this._children[param1], ProfilerAgentTask);
    }

    public getSubTaskByName(param1: string): ProfilerAgentTask {
        let _loc2_: ProfilerAgentTask = null;
        let _loc3_: number = this._children.length;
        let _loc4_: number = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = asInstanceOf(this._children[_loc4_++], ProfilerAgentTask);
            if (_loc2_.name == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    get [IDisposable](): true {
        return true;
    }
}

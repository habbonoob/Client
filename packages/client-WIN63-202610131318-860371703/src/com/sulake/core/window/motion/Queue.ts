import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Motion } from '@/com/sulake/core/window/motion/Motion';

export class Queue extends Motion {
    static { registerClassName(this, 'com.sulake.core.window.motion::Queue'); }

    declare private _SafeStr_2478: Motion;

    private _SafeStr_2906: Motion[] = [];

    constructor(...rest: any[]) {
        super(rest ? castTo(rest[0], Motion).target : null);
        for (const _loc2_ of rest ?? []) {
            this._SafeStr_2906.push(_loc2_);
        }
        this._SafeStr_2478 = rest[0];
        this._complete = this._SafeStr_2478 == null;
    }

    public override get running(): boolean {
        return this._running && this._SafeStr_2478 ? this._SafeStr_2478.running : false;
    }

    public override start(): void {
        super.start();
        this._SafeStr_2478.start();
    }

    public override update(param1: number): void {
        super.update(param1);
        if (this._SafeStr_2478.running) {
            this._SafeStr_2478.update(param1);
        }
    }

    public override stop(): void {
        super.stop();
        this._SafeStr_2478.stop();
    }

    public override tick(param1: number): void {
        let _loc2_: number = 0;
        super.tick(param1);
        this._SafeStr_2478.tick(param1);
        if (this._SafeStr_2478.complete) {
            this._SafeStr_2478.stop();
            _loc2_ = this._SafeStr_2906.indexOf(this._SafeStr_2478);
            if (_loc2_ < this._SafeStr_2906.length - 1) {
                this._SafeStr_2478 = this._SafeStr_2906[_loc2_ + 1];
                this._target = this._SafeStr_2478.target;
                this._SafeStr_2478.start();
            } else {
                this._complete = true;
            }
        }
    }
}

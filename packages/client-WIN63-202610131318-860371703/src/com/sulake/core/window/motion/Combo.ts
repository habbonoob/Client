import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Motion } from '@/com/sulake/core/window/motion/Motion';

export class Combo extends Motion {
    static { registerClassName(this, 'com.sulake.core.window.motion::Combo'); }

    private _SafeStr_3192: Motion[] = [];
    private _SafeStr_5115: Motion[] = [];

    constructor(...rest: any[]) {
        // AS3 read its motion list here, before anything was added to it: always empty, so no target
        super(null);
        for (const _loc2_ of rest ?? []) {
            this._SafeStr_3192.push(_loc2_);
        }
    }

    public override start(): void {
        super.start();
        for (const _loc1_ of this._SafeStr_3192 ?? []) {
            _loc1_.start();
        }
    }

    public override tick(param1: number): void {
        let _loc2_: Motion = null;
        super.tick(param1);
        while (true) {
            _loc2_ = this._SafeStr_5115.pop();
            if (_loc2_ == null) {
                break;
            }
            this._SafeStr_3192.splice(this._SafeStr_5115.indexOf(_loc2_), 1);
            if (_loc2_.running) {
                _loc2_.stop();
            }
        }
        for (_loc2_ of this._SafeStr_3192 ?? []) {
            if (_loc2_.running) {
                _loc2_.tick(param1);
            }
            if (_loc2_.complete) {
                this._SafeStr_5115.push(_loc2_);
            }
        }
        if (this._SafeStr_3192.length > 0) {
            for (_loc2_ of this._SafeStr_3192 ?? []) {
                this._target = _loc2_.target;
                if (this._target && !this._target.disposed) {
                    break;
                }
            }
            this._complete = false;
        } else {
            this._complete = true;
        }
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Motion } from '@/com/sulake/core/window/motion/Motion';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Core } from '@/com/sulake/core/runtime/Component.group';

export class Motions {
    static { registerClassName(this, 'com.sulake.core.window.motion::Motions'); }

    static #staticsReady = false;

    private static _IS_UPDATING: boolean = false;
    private static readonly _SafeStr_3183: Motion[] = [];
    private static readonly _SafeStr_2537: Motion[] = [];
    private static readonly _SafeStr_5489: Motion[] = [];

    private static get _TIMER(): Timer {
        Motions.#initStatics();
        return Motions._TIMER;
    }

    constructor() {
    }

    public static runMotion(param1: Motion): Motion {
        if (Motions._SafeStr_2537.indexOf(param1) == -1 && Motions._SafeStr_3183.indexOf(param1) == -1) {
            if (Motions._IS_UPDATING) {
                Motions._SafeStr_3183.push(param1);
            } else {
                Motions._SafeStr_2537.push(param1);
                param1.start();
            }
            Motions.startTimer();
        }
        return param1;
    }

    public static removeMotion(param1: Motion): void {
        let _loc2_: number = Motions._SafeStr_2537.indexOf(param1);
        if (_loc2_ > -1) {
            if (Motions._IS_UPDATING) {
                _loc2_ = Motions._SafeStr_5489.indexOf(param1);
                if (_loc2_ == -1) {
                    Motions._SafeStr_5489.push(param1);
                }
            } else {
                Motions._SafeStr_2537.splice(_loc2_, 1);
                if (param1.running) {
                    param1.stop();
                }
                if (Motions._SafeStr_2537.length == 0) {
                    Motions.stopTimer();
                }
            }
        } else {
            _loc2_ = Motions._SafeStr_3183.indexOf(param1);
            if (_loc2_ > -1) {
                Motions._SafeStr_3183.splice(_loc2_, 1);
            }
        }
    }

    public static getMotionByTag(param1: string): Motion {
        let _loc2_: any = null;
        for (_loc2_ of Motions._SafeStr_2537 ?? []) {
            if (_loc2_.tag == param1) {
                return _loc2_;
            }
        }
        for (_loc2_ of Motions._SafeStr_3183 ?? []) {
            if (_loc2_.tag == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public static getMotionByTarget(param1: IWindow): Motion {
        let _loc2_: any = null;
        for (_loc2_ of Motions._SafeStr_2537 ?? []) {
            if (_loc2_.target == param1) {
                return _loc2_;
            }
        }
        for (_loc2_ of Motions._SafeStr_3183 ?? []) {
            if (_loc2_.target == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public static getMotionByTagAndTarget(param1: string, param2: IWindow): Motion {
        let _loc3_: any = null;
        for (_loc3_ of Motions._SafeStr_2537 ?? []) {
            if (_loc3_.tag == param1 && _loc3_.target == param2) {
                return _loc3_;
            }
        }
        for (_loc3_ of Motions._SafeStr_3183 ?? []) {
            if (_loc3_.tag == param1 && _loc3_.target == param2) {
                return _loc3_;
            }
        }
        return null;
    }

    public static get isRunning(): boolean {
        return Motions._TIMER ? Motions._TIMER.running : false;
    }

    public static get isUpdating(): boolean {
        return Motions._IS_UPDATING;
    }

    private static onTick(param1: TimerEvent): void {
        let _loc2_: Motion = null;
        Motions._IS_UPDATING = true;
        let _loc3_: number = getTimer();
        while (true) {
            _loc2_ = Motions._SafeStr_3183.pop();
            if (_loc2_ == null) {
                break;
            }
            Motions._SafeStr_2537.push(_loc2_);
        }
        while (true) {
            _loc2_ = Motions._SafeStr_5489.pop();
            if (_loc2_ == null) {
                break;
            }
            Motions._SafeStr_2537.splice(Motions._SafeStr_2537.indexOf(_loc2_), 1);
            if (_loc2_.running) {
                _loc2_.stop();
            }
        }
        for (_loc2_ of Motions._SafeStr_2537 ?? []) {
            if (_loc2_.running) {
                _loc2_.tick(_loc3_);
                if (_loc2_.complete) {
                    Motions.removeMotion(_loc2_);
                }
            } else {
                Motions.removeMotion(_loc2_);
            }
        }
        if (Motions._SafeStr_2537.length == 0) {
            Motions.stopTimer();
        }
        Motions._IS_UPDATING = false;
    }

    private static startTimer(): void {
        if (!Motions._TIMER.running) {
            Motions._TIMER.addEventListener("timer", Motions.onTick);
            Motions._TIMER.start();
        }
    }

    private static stopTimer(): void {
        if (Motions._TIMER.running) {
            Motions._TIMER.removeEventListener("timer", Motions.onTick);
            Motions._TIMER.stop();
        }
    }

    public getNumRunningMotions(param1: IWindow): number {
        let _loc2_: number = 0;
        for (const _loc3_ of Motions._SafeStr_2537 ?? []) {
            if (_loc3_.target == param1) {
                _loc2_++;
            }
        }
        return _loc2_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Motions.#staticsReady) return;
        Motions.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Motions, name, { value, writable: true, configurable: true, enumerable: true });
        set("_TIMER", null);
        set("_TIMER", new Timer(1000 / Core.instance.displayObjectContainer.stage.frameRate, 0));
    }
}

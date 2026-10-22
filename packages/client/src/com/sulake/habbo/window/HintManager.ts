import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Motion } from '@/com/sulake/core/window/motion/Motion';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { Callback } from '@/com/sulake/core/window/motion/Callback';
import { Combo } from '@/com/sulake/core/window/motion/Combo';
import { EaseOut } from '@/com/sulake/core/window/motion/EaseOut';
import { Motions } from '@/com/sulake/core/window/motion/Motions';
import { MoveTo } from '@/com/sulake/core/window/motion/MoveTo';
import { Queue } from '@/com/sulake/core/window/motion/Queue';
import { ResizeTo } from '@/com/sulake/core/window/motion/ResizeTo';
import { HintTarget } from '@/com/sulake/habbo/window/HintTarget';

export class HintManager implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.window::HintManager'); }

    private static readonly _SafeStr_7835: number = 10;
    private static readonly _SafeStr_8146: number = 400;
    private static readonly _SafeStr_8728: number = 15;

    constructor(param1: HabboWindowManagerComponent) {
        this._windowManager = param1;
    }

    declare private _windowManager: HabboWindowManagerComponent;

    private _registeredWindows: Map<any, any> = new Dictionary();

    declare private _activeHint: HintTarget;

    declare private _hint: IStaticBitmapWrapperWindow;

    declare private _SafeStr_7378: Rectangle;

    declare private _SafeStr_4440: Rectangle;

    public get disposed(): boolean {
        return this._windowManager == null;
    }

    private get activeKey(): string {
        return this._activeHint ? this._activeHint.key : null;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hideHint();
        this._activeHint = null;
        this._registeredWindows = null;
        this._windowManager = null;
    }

    public registerWindow(param1: string, param2: IWindow, param3: number): void {
        if (this._registeredWindows.get(param1) != null) {
            this.unregisterWindow(param1);
        }
        this._registeredWindows.set(param1, new HintTarget(param2, param1, param3));
    }

    public unregisterWindow(param1: string): void {
        if (this.activeKey == param1) {
            this.hideHint();
        }
        this._registeredWindows.delete(param1);
    }

    public showHint(param1: string, param2: Rectangle = null): void {
        let _loc3_: HintTarget = this._registeredWindows.get(param1);
        if (_loc3_ != null && _loc3_.window != null && param1 != this.activeKey) {
            this.hideHint();
            this._hint = asGuarded(_loc3_.window.context.create("", "", 23, 0, 0, null, null, null, 0), isIStaticBitmapWrapperWindow);
            this._hint.fitSizeToContents = true;
            this._hint.visible = false;
            switch (_loc3_.style - 1) {
                case 0:
                    this._hint.assetUri = "common_green_arrow_vertical";
                    break;
                default:
                    this._hint.assetUri = "common_green_arrow_horizontal";
            }
            this._activeHint = _loc3_;
            this._SafeStr_7378 = param2;
            this._SafeStr_4440 = this.getTargetRect(this._activeHint.window);
            if (param2 != null) {
                this.animateHint(param2);
            } else {
                this._windowManager.registerUpdateReceiver(this, 10);
                this.update(0);
            }
        }
    }

    public hideHint(): void {
        this._windowManager.removeUpdateReceiver(this);
        this._activeHint = null;
        if (!this._hint) {
            return;
        }
        this._hint.dispose();
        this._hint = null;
    }

    public hideMatchingHint(param1: string): void {
        if (param1 == this.activeKey) {
            this.hideHint();
        }
    }

    public update(param1: number): void {
        let _loc4_: Point = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        if (this._activeHint != null && this._hint != null && this._activeHint.window != null) {
            _loc4_ = new Point();
            this._activeHint.window.getGlobalPosition(_loc4_);
            if (_loc4_.x == 0 && _loc4_.y == 0) {
                return;
            }
            _loc5_ = this._hint.zoomX | 0;
            _loc6_ = this._hint.zoomY | 0;
            switch (this._activeHint.style - 1) {
                case 0:
                    if (_loc4_.y - this._hint.height - 10 > 0) {
                        _loc2_ = _loc4_.y - this._hint.height | 0;
                        if (this._hint.y == 0) {
                            this._hint.y = Math.max(_loc2_ - 400, 15) | 0;
                        }
                        if (_loc2_ - this._hint.y > 15 + 10) {
                            this._hint.y += 15;
                        } else {
                            this._hint.y = _loc2_ - 10 - 5 * Math.abs(Math.sin(getTimer() * 0.003)) | 0;
                        }
                        this._hint.zoomY = 1;
                    } else {
                        _loc3_ = _loc4_.y + this._activeHint.window.height | 0;
                        if (this._hint.y == 0) {
                            this._hint.y = Math.min(this._windowManager.context.displayObjectContainer.stage.stageHeight - this._hint.height, this._hint.y + 400) | 0;
                        }
                        if (_loc3_ - this._hint.y > 15 + 10) {
                            this._hint.y -= 15;
                        } else {
                            this._hint.y = _loc3_ + 10 + 5 * Math.abs(Math.sin(getTimer() * 0.003)) | 0;
                        }
                        this._hint.zoomY = -1;
                    }
                    this._hint.x = _loc4_.x + (this._activeHint.window.width - this._hint.width) / 2 | 0;
                    break;
                default:
                    if (_loc4_.x + this._activeHint.window.width / 2 > this._activeHint.window.desktop.width / 2) {
                        this._hint.x = _loc4_.x - this._hint.width - 10 - 5 * Math.abs(Math.sin(getTimer() * 0.003)) | 0;
                        this._hint.zoomX = 1;
                    } else {
                        this._hint.x = _loc4_.x + this._activeHint.window.width + 10 + 5 * Math.abs(Math.sin(getTimer() * 0.003)) | 0;
                        this._hint.zoomX = -1;
                    }
                    this._hint.y = _loc4_.y + (this._activeHint.window.height - this._hint.height) / 2 | 0;
            }
            if (this._hint.zoomX != _loc5_ || this._hint.zoomY != _loc6_) {
                this._hint.invalidate();
            }
            this._hint.visible = this._activeHint.window.visible;
        }
    }

    protected animateHint(param1: Rectangle): void {
        this._hint.x = param1.x | 0;
        this._hint.y = param1.y | 0;
        this._hint.visible = true;
        let _loc3_: number = param1.x - this._SafeStr_4440.x | 0;
        let _loc6_: number = param1.y - this._SafeStr_4440.y | 0;
        let _loc4_: number = Math.sqrt(_loc3_ * _loc3_ + _loc6_ * _loc6_);
        let _loc2_: number = 500 - Math.abs(1 / _loc4_ * 100 * 500 * 0.5) | 0;
        let _loc8_: number = this._hint.width;
        let _loc7_: number = this._hint.height;
        this._hint.width *= 0.4;
        this._hint.height *= 0.4;
        let _loc5_: Motion = new Queue(new Combo(new EaseOut(new MoveTo(this._hint, _loc2_, this._SafeStr_4440.x | 0, this._SafeStr_4440.y | 0), 1), new ResizeTo(this._hint, _loc2_, _loc8_, _loc7_)), new Callback(this.motionComplete));
        Motions.runMotion(_loc5_);
    }

    protected motionComplete = (param1: Motion): void => {
        this._windowManager.registerUpdateReceiver(this, 10);
        this.update(0);
    };

    private getTargetRect(param1: IWindow): Rectangle {
        let _loc2_: Rectangle = new Rectangle();
        let _loc3_: Point = new Point();
        param1.getGlobalPosition(_loc3_);
        switch (this._activeHint.style - 1) {
            case 0:
                if (_loc3_.y - this._hint.height - 10 > 0) {
                    _loc2_.y = _loc3_.y - this._hint.height - 10;
                } else {
                    _loc2_.y = _loc3_.y + param1.height + 10;
                }
                _loc2_.x = _loc3_.x + (param1.width - this._hint.width) / 2;
                break;
            default:
                if (_loc3_.x + param1.width / 2 > param1.desktop.width / 2) {
                    _loc2_.x = _loc3_.x - this._hint.width - 10;
                } else {
                    _loc2_.x = _loc3_.x + param1.width + 10;
                }
                _loc2_.y = _loc3_.y + (param1.height - this._hint.height) / 2;
        }
        return _loc2_;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}

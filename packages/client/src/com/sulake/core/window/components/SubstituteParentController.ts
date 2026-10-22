import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { isIWindow } from '@/com/sulake/core/window/IWindow';

export class SubstituteParentController extends WindowController {
    static { registerClassName(this, 'com.sulake.core.window.components::SubstituteParentController'); }

    public static readonly NAME: string = "_CONTEXT_SUBSTITUTE_PARENT";

    constructor(param1: WindowContext) {
        super("_CONTEXT_SUBSTITUTE_PARENT", 0, 0, 16, param1, new Rectangle(0, 0, 1, 1), null, null, null, null, 0);
        this._children = [];
        this._SafeStr_2451 = false;
    }

    public override getGraphicContext(param1: boolean): IGraphicContext {
        return null;
    }

    public override setupGraphicsContext(): IGraphicContext {
        return null;
    }

    public override addChild(param1: IWindow): IWindow {
        this._children.push(param1);
        return param1;
    }

    public override addChildAt(param1: IWindow, param2: number): IWindow {
        let _loc3_: WindowController = castTo(param1, WindowController);
        if (_loc3_.parent != null) {
            castTo(_loc3_.parent, WindowController).removeChild(_loc3_);
        }
        this._children.splice(param2, 0, param1);
        _loc3_.parent = this;
        return param1;
    }

    public override getChildAt(param1: number): IWindow {
        return this._children ? (param1 < this._children.length ? this._children[param1] : null) : null;
    }

    public override getChildByID(param1: number): IWindow {
        if (this._children) {
            for (const _loc2_ of this._children ?? []) {
                if (_loc2_.id == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public override getChildByName(param1: string): IWindow {
        if (this._children) {
            for (const _loc2_ of this._children ?? []) {
                if (_loc2_.name == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public override findChildByName(param1: string): IWindow {
        let _loc2_: WindowController = null;
        if (this._children) {
            for (const $e of this._children ?? []) {
                _loc2_ = castTo($e, WindowController);
                if (_loc2_.name == param1) {
                    return _loc2_;
                }
            }
            for (const $e of this._children ?? []) {
                _loc2_ = castTo($e, WindowController);
                _loc2_ = asInstanceOf(_loc2_.findChildByName(param1), WindowController);
                if (_loc2_) {
                    return isIWindow(_loc2_) ? _loc2_ : null;
                }
            }
        }
        return null;
    }

    public override removeChild(param1: IWindow): IWindow {
        let _loc2_: number = this._children.indexOf(param1);
        if (_loc2_ > -1) {
            this._children.splice(_loc2_, 1);
            param1.parent = null;
            return param1;
        }
        return null;
    }

    public override setChildIndex(param1: IWindow, param2: number): void {
        let _loc3_: number = this._children.indexOf(param1);
        if (_loc3_ > -1 && param2 != _loc3_) {
            this._children.splice(_loc3_, 1);
            this._children.splice(param2, 0, param1);
        }
    }

    public override swapChildren(param1: IWindow, param2: IWindow): void {
        let _loc3_: any = 0;
        let _loc6_: any = 0;
        let _loc5_: any = null;
        let _loc4_: any = 0;
        if (param1 != null && param2 != null && param1 != param2) {
            _loc3_ = this._children.indexOf(param1);
            if (_loc3_ < 0) {
                return;
            }
            _loc6_ = this._children.indexOf(param2);
            if (_loc6_ < 0) {
                return;
            }
            if (_loc6_ < _loc3_) {
                _loc5_ = param1;
                param1 = param2;
                param2 = _loc5_;
                _loc4_ = _loc3_;
                _loc3_ = _loc6_;
                _loc6_ = _loc4_;
            }
            this._children.splice(_loc6_, 1);
            this._children.splice(_loc3_, 1);
            this._children.splice(_loc3_, 0, param2);
            this._children.splice(_loc6_, 0, param1);
        }
    }

    public override swapChildrenAt(param1: number, param2: number): void {
        this.swapChildren(this._children[param1], this._children[param2]);
    }

    private childParamUpdated(param1: WindowEvent): void {
        let _loc2_: IWindow = param1.window;
        if (this.getChildIndex(_loc2_) != -1) {
            if (!_loc2_.testParamFlag(16)) {
                _loc2_.desktop.addChild(_loc2_);
            }
        }
    }
}

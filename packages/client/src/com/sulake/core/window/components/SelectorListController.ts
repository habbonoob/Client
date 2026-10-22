import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { SelectorController } from '@/com/sulake/core/window/Classes.group';
import { ISelectorListWindow } from '@/com/sulake/core/window/components/ISelectorListWindow';

export class SelectorListController extends SelectorController implements ISelectorListWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::SelectorListController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._SafeStr_6003 = false;
    }

    declare protected _spacing: number;

    declare private _SafeStr_5235: boolean;

    declare private _vertical: boolean;

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("spacing", this._spacing));
        _loc1_.push(this.createProperty("vertical", this._vertical));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "spacing":
                    if (_loc2_.value != this._spacing) {
                        this.spacing = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    }
                    break;
                case "vertical":
                    if (_loc2_.value != this._vertical) {
                        this.vertical = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    }
            }
        }
        super.properties = param1;
    }

    public get spacing(): number {
        return this._spacing;
    }

    public set spacing(param1: number) {
        this._spacing = param1;
        this.updateSelectableRegion();
    }

    public get vertical(): boolean {
        return this._vertical;
    }

    public set vertical(param1: boolean) {
        this._vertical = param1;
        this.updateSelectableRegion();
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        if (param2.type == "WE_CHILD_ADDED") {
            this.updateSelectableRegion();
        } else if (param2.type == "WE_CHILD_RESIZED") {
            this.updateSelectableRegion();
        } else if (param2.type == "WE_CHILD_RELOCATED") {
            this.updateSelectableRegion();
        } else if (param2.type == "WE_CHILD_REMOVED") {
            this.updateSelectableRegion();
        }
        return super.update(param1, param2);
    }

    private updateSelectableRegion(): void {
        let _loc4_: IWindow = null;
        let _loc3_: any = 0;
        if (this._SafeStr_5235) {
            return;
        }
        this._SafeStr_5235 = true;
        let _loc2_: number = this.numSelectables;
        let _loc1_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = this.getSelectableAt(_loc3_ | 0);
            if (this._vertical) {
                _loc4_.y = _loc1_;
                _loc1_ += _loc4_.height + this._spacing;
            } else {
                _loc4_.x = _loc1_;
                _loc1_ += _loc4_.width + this._spacing;
            }
            _loc3_++;
        }
        this._SafeStr_5235 = false;
    }

    protected override initInstanceFields(): void {
        this._spacing = 0;
        this._SafeStr_5235 = false;
        this._vertical = false;
        super.initInstanceFields();
    }

    get [ISelectorListWindow](): true {
        return true;
    }
}

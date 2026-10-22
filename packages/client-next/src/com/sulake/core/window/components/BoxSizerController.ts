import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ContainerController } from '@/com/sulake/core/window/Classes.group';
import { IBoxSizerWindow } from '@/com/sulake/core/window/components/IBoxSizerWindow';

export class BoxSizerController extends ContainerController implements IBoxSizerWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::BoxSizerController'); }

    declare private _spacing: number;

    declare private _SafeStr_3691: number;

    declare private _SafeStr_3695: number;

    declare private _vertical: boolean;

    declare private _SafeStr_5796: boolean;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        switch (param2.type) {
            case "WE_CHILD_RELOCATED":
            case "WE_CHILD_REMOVED":
            case "WE_CHILD_ADDED":
            case "WE_CHILD_RESIZED":
            case "WE_RESIZED":
            case "WE_CHILD_VISIBILITY":
                this.arrangeChildren();
        }
        return super.update(param1, param2);
    }

    private arrangeChildren(): void {
        let _loc4_: any = null;
        if (!this._SafeStr_5796) {
            return;
        }
        let _loc1_: IWindow = null;
        let _loc3_: number = this.calculateSpaceForRelatives();
        let _loc2_: number = this.getRelativeValuesSum();
        if (!this._vertical) {
            for (_loc4_ of this._children ?? []) {
                if (_loc4_.visible) {
                    if (!_loc1_) {
                        _loc4_.x = this._SafeStr_3691;
                    } else {
                        _loc4_.x = _loc1_.x + _loc1_.width + this._spacing;
                    }
                    _loc4_.y = this._SafeStr_3695;
                    if (this.getRelativeValue(_loc4_) > 0) {
                        _loc4_.width = _loc3_ * this.getRelativeValue(_loc4_) / _loc2_ | 0;
                    }
                    _loc1_ = _loc4_;
                }
            }
        } else {
            for (_loc4_ of this._children ?? []) {
                if (_loc4_.visible) {
                    if (!_loc1_) {
                        _loc4_.y = this._SafeStr_3695;
                    } else {
                        _loc4_.y = _loc1_.y + _loc1_.height + this._spacing;
                    }
                    _loc4_.x = this._SafeStr_3691;
                    if (this.getRelativeValue(_loc4_) > 0) {
                        _loc4_.height = _loc3_ * this.getRelativeValue(_loc4_) / _loc2_ | 0;
                    }
                    _loc1_ = _loc4_;
                }
            }
        }
    }

    private getRelativeValue(param1: IWindow): number {
        let _loc3_: string = null;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.tags.length) {
            _loc3_ = stringOrNull(param1.tags[_loc2_]);
            if (_loc3_.indexOf("relative") != -1) {
                _loc4_ = Number(_loc3_.slice(_loc3_.indexOf("(") + 1, _loc3_.indexOf(")"))) | 0;
                if (_loc4_ < 0) {
                    _loc4_ = 0;
                }
                param1.tags.splice(_loc2_, 1, "relative(" + _loc4_ + ")");
            }
            _loc2_++;
        }
        return _loc4_;
    }

    private getRelativeValuesSum(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._children ?? []) {
            if (_loc2_.visible) {
                _loc1_ += this.getRelativeValue(_loc2_);
            }
        }
        return _loc1_;
    }

    private calculateSpaceForRelatives(): number {
        let _loc1_: number = this._vertical ? this.height - this._SafeStr_3695 * 2 : this.width - this._SafeStr_3691 * 2;
        for (const _loc2_ of this._children ?? []) {
            if (_loc2_.visible != false) {
                if (this.getRelativeValue(_loc2_) == 0) {
                    if (this._vertical) {
                        _loc1_ -= _loc2_.height + this._spacing;
                    } else {
                        _loc1_ -= _loc2_.width + this._spacing;
                    }
                } else {
                    _loc1_ -= this._spacing;
                }
            }
        }
        return _loc1_ + this._spacing;
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("spacing", this._spacing));
        _loc1_.push(this.createProperty("vertical", this._vertical));
        _loc1_.push(this.createProperty("padding_horizontal", this._SafeStr_3691));
        _loc1_.push(this.createProperty("padding_vertical", this._SafeStr_3695));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "spacing":
                    this._spacing = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    break;
                case "padding_horizontal":
                    this._SafeStr_3691 = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    break;
                case "padding_vertical":
                    this._SafeStr_3695 = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    break;
                case "vertical":
                    this._vertical = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
        this.arrangeChildren();
    }

    public setHorizontalPadding(param1: number): void {
        this._SafeStr_3691 = param1;
        this.arrangeChildren();
    }

    public setVerticalPadding(param1: number): void {
        this._SafeStr_3695 = param1;
        this.arrangeChildren();
    }

    public setSpacing(param1: number): void {
        this._spacing = param1;
        this.arrangeChildren();
    }

    public setVertical(param1: boolean): void {
        this._vertical = param1;
        this.arrangeChildren();
    }

    public setAutoRearrange(param1: boolean): void {
        this._SafeStr_5796 = param1;
        if (param1) {
            this.arrangeChildren();
        }
    }

    public getAutoRearrange(): boolean {
        return this._SafeStr_5796;
    }

    protected override initInstanceFields(): void {
        this._spacing = 5;
        this._SafeStr_3691 = 8;
        this._SafeStr_3695 = 8;
        this._vertical = false;
        this._SafeStr_5796 = true;
        super.initInstanceFields();
    }

    get [IBoxSizerWindow](): true {
        return true;
    }
}

import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { VariableFxIconOverlayPlacement } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconOverlayPlacement';

export class VariableFxIconOverlayLayout {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.rendering::VariableFxIconOverlayLayout'); }

    declare public _SafeStr_14678: number;
    static { (this.prototype as any)._SafeStr_14678 = 0; }

    declare public _SafeStr_14679: number;
    static { (this.prototype as any)._SafeStr_14679 = 0; }

    declare public frameWidth: number;
    static { (this.prototype as any).frameWidth = 0; }

    declare public frameHeight: number;
    static { (this.prototype as any).frameHeight = 0; }

    declare public hasIcon: boolean;
    static { (this.prototype as any).hasIcon = false; }

    declare public _SafeStr_14680: any[];

    declare public _SafeStr_14681: number;
    static { (this.prototype as any)._SafeStr_14681 = 0; }

    declare public _SafeStr_14682: number;
    static { (this.prototype as any)._SafeStr_14682 = 0; }

    constructor() {
        this._SafeStr_14680 = [];
    }

    public static resolve(param1: any): VariableFxIconOverlayLayout {
        let _loc6_: number = 0;
        let _loc8_: number = 0;
        let _loc12_: number = 0;
        let _loc7_: number = 0;
        let _loc19_: number = 0;
        let _loc9_: any[] = null;
        let _loc18_: number = 0;
        let _loc20_: number = 0;
        let _loc16_: VariableFxIconOverlayPlacement = null;
        let _loc11_: VariableFxIconOverlayLayout = new VariableFxIconOverlayLayout();
        let _loc13_: number = Math.max(0, param1.contentWidth | 0) | 0;
        let _loc10_: number = Math.max(0, param1.contentHeight | 0) | 0;
        let _loc5_: number = Math.max(0, param1.iconWidth | 0) | 0;
        let _loc3_: number = Math.max(0, param1.iconHeight | 0) | 0;
        let _loc15_: number = param1.overlapPx | 0;
        let _loc14_: number = param1.contentYOffsetPx == null ? 0 : param1.contentYOffsetPx | 0;
        let _loc4_: number = param1.iconOffsetX == null ? 0 : param1.iconOffsetX | 0;
        let _loc2_: number = param1.iconOffsetY == null ? 0 : param1.iconOffsetY | 0;
        let _loc17_: string = param1.alignment == null ? "left" : String(param1.alignment);
        _loc11_.hasIcon = _loc5_ > 0 && _loc3_ > 0;
        if (!_loc11_.hasIcon) {
            _loc11_._SafeStr_14678 = 0;
            _loc11_._SafeStr_14679 = 0;
            _loc11_.frameHeight = _loc10_;
            _loc11_.frameWidth = _loc13_;
            _loc11_._SafeStr_14681 = 0;
            _loc11_._SafeStr_14682 = 0;
            return _loc11_;
        }
        _loc6_ = Math.max(0, _loc5_ - _loc15_) | 0;
        _loc8_ = _loc17_ == "right" ? 0 : _loc6_;
        _loc12_ = Math.max(_loc10_, _loc3_) | 0;
        _loc7_ = Math.max(0, ((_loc12_ - _loc10_) / 2 | 0) + _loc14_) | 0;
        _loc19_ = ((_loc12_ - _loc3_) / 2 | 0) + _loc2_;
        _loc9_ = VariableFxIconOverlayLayout.resolveDefaultIconPlacements(_loc17_, _loc8_, _loc13_, _loc4_, _loc19_, _loc15_);
        _loc18_ = Math.max(0, -Math.min(_loc8_, VariableFxIconOverlayLayout.minPlacementX(_loc9_))) | 0;
        _loc20_ = Math.max(0, -Math.min(_loc7_, VariableFxIconOverlayLayout.minPlacementY(_loc9_))) | 0;
        _loc11_._SafeStr_14678 = _loc8_ + _loc18_;
        _loc11_._SafeStr_14679 = _loc7_ + _loc20_;
        for (_loc16_ of _loc9_ ?? []) {
            _loc11_._SafeStr_14680.push(new VariableFxIconOverlayPlacement(_loc16_.x + _loc18_, _loc16_.y + _loc20_));
        }
        _loc16_ = asInstanceOf(_loc11_._SafeStr_14680[0], VariableFxIconOverlayPlacement);
        _loc11_._SafeStr_14681 = _loc16_.x;
        _loc11_._SafeStr_14682 = _loc16_.y;
        _loc11_.frameHeight = Math.max(_loc11_._SafeStr_14679 + _loc10_, VariableFxIconOverlayLayout.maxPlacementBottom(_loc11_._SafeStr_14680, _loc3_)) | 0;
        _loc11_.frameWidth = Math.max(_loc11_._SafeStr_14678 + _loc13_, VariableFxIconOverlayLayout.maxPlacementRight(_loc11_._SafeStr_14680, _loc5_)) | 0;
        return _loc11_;
    }

    private static resolveDefaultIconPlacements(param1: string, param2: number, param3: number, param4: number, param5: number, param6: number): any[] {
        let _loc8_: VariableFxIconOverlayPlacement = new VariableFxIconOverlayPlacement(param4, param5);
        let _loc7_: VariableFxIconOverlayPlacement = new VariableFxIconOverlayPlacement(param2 + param3 - param6 - param4, param5);
        switch (param1) {
            case "right":
                return [_loc7_];
            case "double":
                return [_loc8_, _loc7_];
            default:
                return [_loc8_];
        }
    }

    private static minPlacementX(param1: any[]): number {
        let _loc2_: any = null;
        let _loc3_: number = 2147483647;
        for (_loc2_ of param1 ?? []) {
            _loc3_ = Math.min(_loc3_, Number(_loc2_.x)) | 0;
        }
        return _loc3_ == 2147483647 ? 0 : _loc3_;
    }

    private static minPlacementY(param1: any[]): number {
        let _loc2_: any = null;
        let _loc3_: number = 2147483647;
        for (_loc2_ of param1 ?? []) {
            _loc3_ = Math.min(_loc3_, Number(_loc2_.y)) | 0;
        }
        return _loc3_ == 2147483647 ? 0 : _loc3_;
    }

    private static maxPlacementBottom(param1: any[], param2: number): number {
        let _loc3_: any = null;
        let _loc4_: number = 0;
        for (_loc3_ of param1 ?? []) {
            _loc4_ = Math.max(_loc4_, Number(_loc3_.y + param2)) | 0;
        }
        return _loc4_;
    }

    private static maxPlacementRight(param1: any[], param2: number): number {
        let _loc3_: any = null;
        let _loc4_: number = 0;
        for (_loc3_ of param1 ?? []) {
            _loc4_ = Math.max(_loc4_, Number(_loc3_.x + param2)) | 0;
        }
        return _loc4_;
    }
}

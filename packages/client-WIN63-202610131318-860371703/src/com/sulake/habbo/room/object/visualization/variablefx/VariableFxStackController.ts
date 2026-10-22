import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxStatusModelData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelData';
import type { StackedAdditionStack } from '@/com/sulake/habbo/room/object/visualization/stacked/StackedAdditionStack';
import type { VariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxAssetProvider';
import type { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import type { VariableFxVisualizationManager } from '@/com/sulake/habbo/room/object/visualization/VariableFxVisualizationManager';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxStatusModelEntry } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelEntry';
import { VariableFxStackAddition } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStackAddition';

export class VariableFxStackController {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxStackController'); }

    private _SafeStr_14663: number = -1;
    private _SafeStr_14664: number = -1;

    constructor() {
    }

    public reconcile(param1: VariableFxStatusModelData, param2: VariableFxVisualizationManager, param3: VariableFxAssetProvider, param4: VariableFxRendererRegistry, param5: StackedAdditionStack, param6: number, param7: number): boolean {
        let _loc13_: UtilsMap = null;
        let _loc16_: number = 0;
        let _loc17_: VariableFxConfigData = null;
        let _loc12_: string = null;
        let _loc8_: UtilsMap = null;
        let _loc14_: VariableFxStatusModelEntry = null;
        let _loc15_: VariableFxStackAddition = null;
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        let _loc18_: number = param1?.updateId;
        let _loc9_: number = param2?.updateId;
        let _loc19_: boolean = false;
        if (param5 == null) {
            return false;
        }
        if (_loc18_ == this._SafeStr_14663 && _loc9_ == this._SafeStr_14664) {
            return false;
        }
        _loc13_ = new UtilsMap();
        if (param1 != null && param2 != null) {
            _loc10_ = 0;
            while (_loc10_ < param1.statusesByConfig.length) {
                _loc16_ = param1.statusesByConfig.getKey(_loc10_) | 0;
                _loc17_ = param2.getConfig(_loc16_);
                _loc8_ = asInstanceOf(param1.statusesByConfig.getWithIndex(_loc10_), UtilsMap);
                _loc11_ = 0;
                while (_loc11_ < _loc8_.length) {
                    _loc12_ = stringOrNull(_loc8_.getKey(_loc11_));
                    _loc14_ = asInstanceOf(_loc8_.getWithIndex(_loc11_), VariableFxStatusModelEntry);
                    _loc15_ = this.getVariableFxAddition(param5, _loc16_, _loc12_);
                    if (_loc15_ == null) {
                        _loc15_ = new VariableFxStackAddition(_loc16_, _loc12_, param2, param3, param4);
                        _loc19_ = true;
                    }
                    param5.add(_loc15_, param6, _loc14_.createdAt, _loc16_, _loc12_, _loc17_?.stackOrder);
                    if (_loc15_.show(_loc14_, param7)) {
                        _loc19_ = true;
                    }
                    this.markSeen(_loc13_, _loc16_, _loc12_);
                    _loc11_++;
                }
                _loc10_++;
            }
        }
        for (_loc15_ of this.getVariableFxAdditions(param5) ?? []) {
            if (!this.hasSeen(_loc13_, _loc15_.configId, _loc15_.variableId)) {
                if (_loc15_.hide(param7)) {
                    _loc19_ = true;
                }
            }
        }
        this.disposeSeenMap(_loc13_);
        this._SafeStr_14663 = _loc18_;
        this._SafeStr_14664 = _loc9_;
        return _loc19_;
    }

    private getVariableFxAddition(param1: StackedAdditionStack, param2: number, param3: string): VariableFxStackAddition {
        let _loc5_: any = null;
        let _loc4_: any[] = this.getVariableFxAdditions(param1);
        for (_loc5_ of _loc4_ ?? []) {
            if (_loc5_.configId == param2 && _loc5_.variableId == param3) {
                return _loc5_;
            }
        }
        return null;
    }

    private getVariableFxAdditions(param1: StackedAdditionStack): any[] {
        let _loc3_: VariableFxStackAddition = null;
        let _loc4_: any = null;
        let _loc2_: any[] = [];
        for (_loc4_ of param1.getAdditions() ?? []) {
            _loc3_ = _loc4_ instanceof VariableFxStackAddition ? _loc4_ : null;
            if (_loc3_ != null) {
                _loc2_.push(_loc3_);
            }
        }
        return _loc2_;
    }

    private markSeen(param1: UtilsMap, param2: number, param3: string): void {
        let _loc4_: UtilsMap = asInstanceOf(param1.getValue(param2), UtilsMap);
        if (_loc4_ == null) {
            _loc4_ = new UtilsMap();
            param1.add(param2, _loc4_);
        }
        if (!_loc4_.hasKey(param3)) {
            _loc4_.add(param3, true);
        }
    }

    private hasSeen(param1: UtilsMap, param2: number, param3: string): boolean {
        let _loc4_: UtilsMap = asInstanceOf(param1.getValue(param2), UtilsMap);
        return _loc4_ != null && _loc4_.hasKey(param3);
    }

    private disposeSeenMap(param1: UtilsMap): void {
        for (const _loc2_ of param1.getValues() ?? []) {
            _loc2_.dispose();
        }
        param1.dispose();
    }
}

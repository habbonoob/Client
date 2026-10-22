import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStackedAddition } from '@/com/sulake/habbo/room/object/visualization/stacked/IStackedAddition';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { _SafeCls_6140 } from '@/com/sulake/habbo/room/object/visualization/stacked/_SafeCls_6140';
import { StackedAdditionEntry } from '@/com/sulake/habbo/room/object/visualization/stacked/StackedAdditionEntry';

export class StackedAdditionStack {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.stacked::StackedAdditionStack'); }

    private static readonly STACK_SPACING: number = 4;
    private _entries: StackedAdditionEntry[] = [];

    declare private _bitmap: BitmapData;

    private _disposed: boolean = false;
    private _SafeStr_14771: boolean = false;
    private _SafeStr_14183: boolean = false;
    private _lastHadVisibleEntries: boolean = false;
    private _SafeStr_14642: boolean = false;
    private _SafeStr_14772: boolean = false;

    constructor() {
    }

    public get isEmpty(): boolean {
        return this._entries.length == 0;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isIdleInvisible(): boolean {
        return !this._lastHadVisibleEntries && !this._SafeStr_14183 && !this._SafeStr_14771 && !this.hasLayoutContributingAdditions();
    }

    public get isCachedIdle(): boolean {
        return !this._SafeStr_14183 && !this._SafeStr_14771 && !this._SafeStr_14642;
    }

    public add(param1: IStackedAddition, param2: number, param3: number = 0, param4: number = 0, param5: string = "", param6: number = 0): void {
        let _loc8_: string = null;
        for (const _loc7_ of this._entries ?? []) {
            if (_loc7_._SafeStr_14770 == param1) {
                _loc8_ = param5 == null ? "" : param5;
                if (_loc7_.layer != param2 || _loc7_.stackOrder != param6 || _loc7_.createdAt != param3 || _loc7_.configId != param4 || _loc7_.variableId != _loc8_) {
                    _loc7_.layer = param2;
                    _loc7_.stackOrder = param6;
                    _loc7_.createdAt = param3;
                    _loc7_.configId = param4;
                    _loc7_.variableId = _loc8_;
                    this._SafeStr_14772 = true;
                    this._SafeStr_14183 = true;
                    this._SafeStr_14642 = true;
                }
                return;
            }
        }
        this.remove(param1.id);
        param1.isPartOfStack = true;
        this._entries.push(new StackedAdditionEntry(param1, param2, param3, param4, param5, param6));
        this._SafeStr_14183 = true;
        this._SafeStr_14772 = true;
        this._SafeStr_14642 = true;
    }

    public remove(param1: number): void {
        let _loc3_: number = 0;
        let _loc2_: StackedAdditionEntry = null;
        _loc3_ = this._entries.length - 1;
        while (_loc3_ >= 0) {
            _loc2_ = this._entries[_loc3_];
            if (_loc2_._SafeStr_14770.id == param1) {
                this._entries.splice(_loc3_, 1);
                _loc2_.dispose();
                this._SafeStr_14183 = true;
                this._SafeStr_14642 = true;
            }
            _loc3_--;
        }
    }

    public _SafeStr_2119(param1: number): IStackedAddition {
        for (const _loc2_ of this._entries ?? []) {
            if (_loc2_._SafeStr_14770.id == param1) {
                return _loc2_._SafeStr_14770;
            }
        }
        return null;
    }

    public getAdditions(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._entries ?? []) {
            _loc1_.push(_loc2_._SafeStr_14770);
        }
        return _loc1_;
    }

    public getAdditionsByType(param1: any): any[] {
        let _loc4_: string = null;
        let _loc2_: any[] = [];
        if (param1 == null) {
            return _loc2_;
        }
        _loc4_ = getQualifiedClassName(param1);
        for (const _loc3_ of this._entries ?? []) {
            if (getQualifiedClassName(_loc3_._SafeStr_14770) == _loc4_) {
                _loc2_.push(_loc3_._SafeStr_14770);
            }
        }
        return _loc2_;
    }

    public update(param1: IRoomObjectSprite, param2: number, param3: number): boolean {
        for (const _loc4_ of this._entries ?? []) {
            _loc4_._SafeStr_14770.update(_loc4_.sprite, param2);
        }
        let _loc5_: boolean = this.layoutAndCompose(param1, getTimer(), false, param3);
        this.refreshAnimationTickState();
        return _loc5_;
    }

    public animate(param1: IRoomObjectSprite, param2: number): boolean {
        let _loc4_: boolean = false;
        if (this.isCachedIdle && (!this._lastHadVisibleEntries || param1 != null && param1.visible && param1.asset != null)) {
            return false;
        }
        for (const _loc3_ of this._entries ?? []) {
            if (_loc3_._SafeStr_14770.animate(_loc3_.sprite)) {
                _loc4_ = true;
            }
        }
        if (this.removeFinishedAdditions()) {
            _loc4_ = true;
        }
        if (!_loc4_ && !this._SafeStr_14183 && !this._SafeStr_14771) {
            if (!this._lastHadVisibleEntries || param1 != null && param1.visible && param1.asset != null) {
                this.refreshAnimationTickState();
                return false;
            }
        }
        let _loc5_: boolean = this.layoutAndCompose(param1, getTimer(), true, param2) || _loc4_;
        this.refreshAnimationTickState();
        return _loc5_;
    }

    public dispose(): void {
        for (const _loc1_ of this._entries ?? []) {
            _loc1_.dispose();
        }
        this._entries.length = 0;
        this.disposeBitmap();
        this._disposed = true;
        this._SafeStr_14642 = false;
    }

    private layoutAndCompose(param1: IRoomObjectSprite, param2: number, param3: boolean, param4: number): boolean {
        let _loc5_: any;
        let _loc6_: number = 0;
        let _loc7_: _SafeCls_6140 = new _SafeCls_6140();
        let _loc11_: any[] = [];
        let _loc8_: number = 0;
        let _loc9_: StackedAdditionEntry = null;
        let _loc12_: boolean = false;
        let _loc10_: boolean = false;
        if (param1 == null) {
            return false;
        }
        if (this._entries.length == 0) {
            this._SafeStr_14183 = false;
            this._SafeStr_14771 = false;
            this._lastHadVisibleEntries = false;
            if (param1.visible) {
                param1.visible = false;
                return true;
            }
            return false;
        }
        this.sortEntriesIfNeeded();
        for (_loc5_ of this._entries ?? []) {
            if (_loc5_.sprite.visible && _loc5_.sprite.asset != null && _loc5_.sprite.alpha > 0) {
                if (_loc5_._SafeStr_14770.contributesToStackLayout) {
                    _loc5_.contributesToLayout = true;
                    _loc6_ = _loc9_ == null ? 0 : _loc8_ - _loc9_.sprite.asset.height - 4;
                    if (_loc5_.setTarget(_loc6_, param2)) {
                        _loc12_ = true;
                    }
                    if (param3 && _loc5_.y.update(param2)) {
                        _loc12_ = true;
                    }
                    if (_loc5_.needsAnimationTick(param2)) {
                        _loc10_ = true;
                    }
                    _loc8_ = _loc6_;
                    _loc9_ = _loc5_;
                } else if (_loc5_.contributesToLayout) {
                    _loc5_.contributesToLayout = false;
                    if (_loc5_.freezePosition(param2)) {
                        _loc12_ = true;
                    }
                }
                _loc11_.push(_loc5_);
            }
        }
        if (_loc11_.length == 0) {
            this._SafeStr_14183 = false;
            this._SafeStr_14771 = false;
            this._lastHadVisibleEntries = false;
            if (param1.visible) {
                param1.visible = false;
                return true;
            }
            return false;
        }
        for (_loc5_ of _loc11_ ?? []) {
            _loc7_.add(_loc5_.sprite.offsetX | 0, _loc5_.sprite.offsetY + (Math.round(Number(_loc5_.y.value)) | 0) - _loc5_.sprite.asset.height | 0, _loc5_.sprite.asset.width | 0, _loc5_.sprite.asset.height | 0);
        }
        this.ensureBitmap(_loc7_.width, _loc7_.height);
        this._bitmap.fillRect(this._bitmap.rect, 0);
        for (_loc5_ of _loc11_ ?? []) {
            this.drawEntry(_loc5_, _loc7_);
        }
        _loc5_ = asInstanceOf(_loc11_[_loc11_.length - 1], StackedAdditionEntry);
        param1.asset = this._bitmap;
        param1.offsetX = _loc7_.minX;
        param1.offsetY = param4 + _loc7_.minY;
        param1.relativeDepth = Number(_loc5_.sprite.relativeDepth);
        param1.alpha = 255;
        param1.visible = true;
        this._SafeStr_14183 = false;
        this._SafeStr_14771 = _loc10_;
        this._lastHadVisibleEntries = true;
        return _loc12_;
    }

    private drawEntry(param1: StackedAdditionEntry, param2: _SafeCls_6140): void {
        let _loc6_: Matrix = null;
        let _loc5_: BitmapData = param1.sprite.asset;
        let _loc3_: number = param1.sprite.offsetX - param2.minX;
        let _loc4_: number = param1.sprite.offsetY + (Math.round(param1.y.value) | 0) - param2.minY - param1.sprite.asset.height;
        if (param1.sprite.alpha >= 255 && param1.sprite.blendMode == "normal") {
            this._bitmap.copyPixels(_loc5_, _loc5_.rect, new Point(_loc3_, _loc4_), null, null, true);
            return;
        }
        _loc6_ = new Matrix();
        _loc6_.translate(_loc3_, _loc4_);
        this._bitmap.draw(_loc5_, _loc6_, new ColorTransform(1, 1, 1, param1.sprite.alpha / 255), param1.sprite.blendMode);
    }

    private removeFinishedAdditions(): boolean {
        let _loc2_: number = 0;
        let _loc1_: StackedAdditionEntry = null;
        let _loc3_: boolean = false;
        _loc2_ = this._entries.length - 1;
        while (_loc2_ >= 0) {
            _loc1_ = this._entries[_loc2_];
            if (_loc1_._SafeStr_14770.isFinished) {
                this._entries.splice(_loc2_, 1);
                _loc1_.dispose();
                _loc3_ = true;
                this._SafeStr_14183 = true;
            }
            _loc2_--;
        }
        return _loc3_;
    }

    private ensureBitmap(param1: number, param2: number): void {
        if (this._bitmap != null && this._bitmap.width == param1 && this._bitmap.height == param2) {
            return;
        }
        this.disposeBitmap();
        this._bitmap = new BitmapData(param1, param2, true, 0);
    }

    private disposeBitmap(): void {
        if (this._bitmap != null) {
            this._bitmap.dispose();
            this._bitmap = null;
        }
    }

    private sortEntries(): void {
        this._entries.sort((param1: StackedAdditionEntry, param2: StackedAdditionEntry): number => {
             let _loc3_: number = 0;
             if (param1.layer < param2.layer) {
                 return -1;
             }
             if (param1.layer > param2.layer) {
                 return 1;
             }
             if (param1.stackOrder > param2.stackOrder) {
                 return -1;
             }
             if (param1.stackOrder < param2.stackOrder) {
                 return 1;
             }
             if (param1.createdAt < param2.createdAt) {
                 return -1;
             }
             if (param1.createdAt > param2.createdAt) {
                 return 1;
             }
             if (param1.configId < param2.configId) {
                 return -1;
             }
             if (param1.configId > param2.configId) {
                 return 1;
             }
             _loc3_ = param1.variableId.localeCompare(param2.variableId);
             if (_loc3_ != 0) {
                 return _loc3_;
             }
             return param1._SafeStr_14770.id - param2._SafeStr_14770.id;
         });
    }

    private sortEntriesIfNeeded(): void {
        if (!this._SafeStr_14772) {
            return;
        }
        if (this._entries.length > 1) {
            this.sortEntries();
        }
        this._SafeStr_14772 = false;
    }

    private hasLayoutContributingAdditions(): boolean {
        for (const _loc1_ of this._entries ?? []) {
            if (_loc1_._SafeStr_14770.contributesToStackLayout) {
                return true;
            }
        }
        return false;
    }

    private refreshAnimationTickState(): void {
        this._SafeStr_14642 = false;
        for (const _loc1_ of this._entries ?? []) {
            if (_loc1_._SafeStr_14770.requiresAnimationTick) {
                this._SafeStr_14642 = true;
                return;
            }
        }
    }
}

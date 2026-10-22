import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';
import { ShoreMaskCreatorUtility } from '@/com/sulake/habbo/room/object/visualization/furniture/ShoreMaskCreatorUtility';

export class FurnitureWaterAreaVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureWaterAreaVisualization'); }

    private static readonly SHORE_SPRITE_TAG: string = "shore";

    constructor() {
        super();
    }

    private _SafeStr_5131: boolean = true;
    private _SafeStr_2944: any[] = [];
    private _SafeStr_3226: any[] = [];
    private _createdInstanceMaskSizes: any[] = [];
    private _needsShoreUpdate: boolean = false;
    private _sizeX: number = 0;
    private _sizeY: number = 0;
    private _SafeStr_5617: number = 0;
    private _SafeStr_6280: number = -1;
    private _SafeStr_6060: number = -1;
    private _SafeStr_2208: BitmapData = null;

    public override dispose(): void {
        if (this.assetCollection != null) {
            for (const _loc1_ of this._createdInstanceMaskSizes ?? []) {
                ShoreMaskCreatorUtility.disposeInstanceMask(this.object.getInstanceId(), _loc1_ | 0, this.assetCollection);
            }
            this._createdInstanceMaskSizes = [];
        }
        if (this._SafeStr_2208 != null) {
            this._SafeStr_2208.dispose();
            this._SafeStr_2208 = null;
        }
        super.dispose();
    }

    protected override updateObject(param1: number, param2: number): boolean {
        if (super.updateObject(param1, param2)) {
            this._needsShoreUpdate = true;
            this.updateBorderData();
            return true;
        }
        return false;
    }

    protected override updateAnimation(param1: number): number {
        let _loc2_: number = 0;
        let _loc3_: any = super.updateAnimation(param1);
        if (this.updateInstanceShoreMask(param1)) {
            _loc2_ = this.getShoreSpriteIndex(param1 | 0);
            _loc3_ |= 1 << _loc2_;
        }
        return _loc3_ | 0;
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        if (param1 == 1 || param2 != this.getShoreSpriteIndex(param1)) {
            return super.getSpriteAssetName(param1, param2);
        }
        if (this._SafeStr_5131) {
            return ShoreMaskCreatorUtility.getInstanceMaskName(this.object.getInstanceId(), this.getSize(param1));
        }
        return null;
    }

    protected override setAnimation(param1: number): void {
        super.setAnimation(0);
    }

    private getShoreSpriteIndex(param1: number): number {
        let _loc2_: number = 0;
        if (this._SafeStr_6280 == param1 && this._SafeStr_6060 == this.direction) {
            return this._SafeStr_5617;
        }
        _loc2_ = this.spriteCount - 1;
        while (_loc2_ >= 0) {
            if (this.getSpriteTag(param1, this.direction, _loc2_) == FurnitureWaterAreaVisualization.SHORE_SPRITE_TAG) {
                this._SafeStr_5617 = _loc2_;
                this._SafeStr_6280 = param1;
                this._SafeStr_6060 = this.direction;
                return this._SafeStr_5617;
            }
            _loc2_--;
        }
        return -1;
    }

    private getShoreAsset(param1: number): IGraphicAsset {
        let _loc3_: string = super.getSpriteAssetName(param1, this.getShoreSpriteIndex(param1));
        return this.assetCollection.getAsset(_loc3_);
    }

    private getInstanceMask(param1: number): IGraphicAsset {
        let _loc2_: number = this.getSize(param1);
        let _loc3_: IGraphicAsset = ShoreMaskCreatorUtility.getInstanceMask(this.object.getInstanceId(), _loc2_, this.assetCollection, this.getShoreAsset(param1));
        if (_loc3_ != null) {
            if (this._createdInstanceMaskSizes.indexOf(_loc2_) < 0) {
                this._createdInstanceMaskSizes.push(_loc2_);
            }
        }
        return _loc3_;
    }

    private updateBorderData(): void {
        this.resetBorders();
        let _loc2_: any = this.object.getState(0);
        let _loc6_: any[] = this.getAreaData();
        let _loc1_: number = this._sizeX + 2;
        let _loc7_: number = this._sizeY + 2;
        let _loc3_: number = 0;
        let _loc5_: any[] = _loc6_[_loc7_ - 1];
        _loc3_ = _loc1_ - 1;
        while (_loc3_ >= 0) {
            if (_loc2_ & 1) {
                _loc5_[_loc3_] = true;
            }
            _loc2_ >>= 1;
            _loc3_--;
        }
        _loc3_ = _loc7_ - 2;
        while (_loc3_ >= 1) {
            _loc5_ = _loc6_[_loc3_];
            if (_loc2_ & 1) {
                _loc5_[_loc1_ - 1] = true;
            }
            _loc2_ >>= 1;
            if (_loc2_ & 1) {
                _loc5_[0] = true;
            }
            _loc2_ >>= 1;
            _loc3_--;
        }
        _loc5_ = _loc6_[0];
        _loc3_ = _loc1_ - 1;
        while (_loc3_ >= 0) {
            if (_loc2_ & 1) {
                _loc5_[_loc3_] = true;
            }
            _loc2_ >>= 1;
            _loc3_--;
        }
        let _loc4_: number = 0;
        _loc4_ = this.updateTopBorder(_loc6_, _loc4_);
        _loc4_ = this.updateRightBorder(_loc6_, _loc4_);
        _loc4_ = this.updateBottomBorder(_loc6_, _loc4_);
        _loc4_ = this.updateLeftBorder(_loc6_, _loc4_);
        this._SafeStr_5131 = false;
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_2944.length) {
            if (this._SafeStr_2944[_loc3_] == true) {
                this._SafeStr_5131 = true;
            }
            _loc3_++;
        }
    }

    private updateTopBorder(param1: any[], param2: number): number {
        let _loc4_: number = 0;
        let _loc3_: number = this._sizeX + 2;
        let _loc6_: any[] = param1[0];
        let _loc7_: any[] = param1[1];
        let _loc8_: number = 0;
        let _loc5_: number = 0;
        _loc4_ = 1;
        while (_loc4_ < _loc3_ - 1) {
            if (_loc6_[_loc4_] == false) {
                this._SafeStr_2944[param2] = true;
                if (_loc7_[_loc4_ - 1] == false && _loc6_[_loc4_ - 1] == false) {
                    _loc8_ = 0;
                } else if (_loc6_[_loc4_ - 1] == true) {
                    _loc8_ = 2;
                } else {
                    _loc8_ = 1;
                }
                if (_loc7_[_loc4_ + 1] == false && _loc6_[_loc4_ + 1] == false) {
                    _loc5_ = 0;
                } else if (_loc6_[_loc4_ + 1] == true) {
                    _loc5_ = 2;
                } else {
                    _loc5_ = 1;
                }
                this._SafeStr_3226[param2] = ShoreMaskCreatorUtility.getBorderType(_loc8_, _loc5_);
            }
            param2++;
            _loc4_++;
        }
        return param2;
    }

    private updateRightBorder(param1: any[], param2: number): number {
        let _loc4_: number = 0;
        let _loc3_: number = this._sizeX + 2;
        let _loc10_: number = this._sizeY + 2;
        let _loc8_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: any[] = null;
        let _loc9_: any[] = null;
        let _loc7_: any[] = null;
        _loc4_ = 1;
        while (_loc4_ < _loc10_ - 1) {
            _loc6_ = param1[_loc4_];
            _loc9_ = param1[_loc4_ - 1];
            _loc7_ = param1[_loc4_ + 1];
            if (_loc6_[_loc3_ - 1] == false) {
                this._SafeStr_2944[param2] = true;
                if (_loc9_[_loc3_ - 2] == false && _loc9_[_loc3_ - 1] == false) {
                    _loc8_ = 0;
                } else if (_loc9_[_loc3_ - 1] == true) {
                    _loc8_ = 2;
                } else {
                    _loc8_ = 1;
                }
                if (_loc7_[_loc3_ - 2] == false && _loc7_[_loc3_ - 1] == false) {
                    _loc5_ = 0;
                } else if (_loc7_[_loc3_ - 1] == true) {
                    _loc5_ = 2;
                } else {
                    _loc5_ = 1;
                }
                this._SafeStr_3226[param2] = ShoreMaskCreatorUtility.getBorderType(_loc8_, _loc5_);
            }
            param2++;
            _loc4_++;
        }
        return param2;
    }

    private updateBottomBorder(param1: any[], param2: number): number {
        let _loc4_: number = 0;
        let _loc3_: number = this._sizeX + 2;
        let _loc9_: number = this._sizeY + 2;
        let _loc7_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: any[] = param1[_loc9_ - 1];
        let _loc8_: any[] = param1[_loc9_ - 2];
        _loc4_ = _loc3_ - 2;
        while (_loc4_ >= 1) {
            if (_loc6_[_loc4_] == false) {
                this._SafeStr_2944[param2] = true;
                if (_loc8_[_loc4_ + 1] == false && _loc6_[_loc4_ + 1] == false) {
                    _loc7_ = 0;
                } else if (_loc6_[_loc4_ + 1] == true) {
                    _loc7_ = 2;
                } else {
                    _loc7_ = 1;
                }
                if (_loc8_[_loc4_ - 1] == false && _loc6_[_loc4_ - 1] == false) {
                    _loc5_ = 0;
                } else if (_loc6_[_loc4_ - 1] == true) {
                    _loc5_ = 2;
                } else {
                    _loc5_ = 1;
                }
                this._SafeStr_3226[param2] = ShoreMaskCreatorUtility.getBorderType(_loc7_, _loc5_);
            }
            param2++;
            _loc4_--;
        }
        return param2;
    }

    private updateLeftBorder(param1: any[], param2: number): number {
        let _loc4_: number = 0;
        let _loc3_: number = this._sizeX + 2;
        let _loc10_: number = this._sizeY + 2;
        let _loc8_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: any[] = null;
        let _loc9_: any[] = null;
        let _loc7_: any[] = null;
        _loc4_ = _loc10_ - 2;
        while (_loc4_ >= 1) {
            _loc6_ = param1[_loc4_];
            _loc9_ = param1[_loc4_ + 1];
            _loc7_ = param1[_loc4_ - 1];
            if (_loc6_[0] == false) {
                this._SafeStr_2944[param2] = true;
                if (_loc9_[1] == false && _loc9_[0] == false) {
                    _loc8_ = 0;
                } else if (_loc9_[0] == true) {
                    _loc8_ = 2;
                } else {
                    _loc8_ = 1;
                }
                if (_loc7_[1] == false && _loc7_[0] == false) {
                    _loc5_ = 0;
                } else if (_loc7_[0] == true) {
                    _loc5_ = 2;
                } else {
                    _loc5_ = 1;
                }
                this._SafeStr_3226[param2] = ShoreMaskCreatorUtility.getBorderType(_loc8_, _loc5_);
            }
            param2++;
            _loc4_--;
        }
        return param2;
    }

    private resetBorders(): void {
        let _loc2_: IRoomObjectModel = null;
        let _loc1_: number = 0;
        if (this._sizeX == 0 || this._sizeY == 0) {
            if (this.object == null || this.object.getModel() == null) {
                return;
            }
            _loc2_ = this.object.getModel();
            this._sizeX = _loc2_.getNumber("furniture_size_x") | 0;
            this._sizeY = _loc2_.getNumber("furniture_size_y") | 0;
        }
        this._SafeStr_2944 = [];
        this._SafeStr_3226 = [];
        _loc1_ = 0;
        while (_loc1_ < this._sizeX * 2 + this._sizeY * 2) {
            this._SafeStr_2944.push(false);
            this._SafeStr_3226.push(1);
            _loc1_++;
        }
    }

    private getAreaData(): any[] {
        let _loc1_: number = this._sizeX + 2;
        let _loc5_: number = this._sizeY + 2;
        let _loc6_: any[] = [];
        let _loc4_: any[] = null;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < _loc5_) {
            _loc4_ = [];
            _loc2_ = _loc1_ - 1;
            while (_loc2_ >= 0) {
                _loc4_.push(false);
                _loc2_--;
            }
            _loc6_.push(_loc4_);
            _loc3_++;
        }
        _loc3_ = 1;
        while (_loc3_ < _loc5_ - 1) {
            _loc4_ = _loc6_[_loc3_];
            _loc2_ = 1;
            while (_loc2_ < _loc1_ - 1) {
                _loc4_[_loc2_] = true;
                _loc2_++;
            }
            _loc3_++;
        }
        return _loc6_;
    }

    private initializeShoreMasks(param1: number): boolean {
        return ShoreMaskCreatorUtility.initializeShoreMasks(this.getSize(param1 | 0), this.assetCollection, this.getShoreAsset(param1 | 0));
    }

    private createShoreMask(param1: number, param2: number, param3: number): BitmapData {
        if (this._SafeStr_2208 == null || this._SafeStr_2208.width < param1 || this._SafeStr_2208.height < param2) {
            if (this._SafeStr_2208 != null) {
                this._SafeStr_2208.dispose();
            }
            this._SafeStr_2208 = ShoreMaskCreatorUtility.createEmptyMask(param1, param2);
        }
        return ShoreMaskCreatorUtility.createShoreMask2x2(this._SafeStr_2208, this.getSize(param3 | 0), this._SafeStr_2944, this._SafeStr_3226, this.assetCollection);
    }

    private updateInstanceShoreMask(param1: number): boolean {
        let _loc3_: BitmapData = null;
        let _loc6_: BitmapData = null;
        let _loc2_: IGraphicAsset = null;
        let _loc4_: BitmapData = null;
        if (!this._needsShoreUpdate) {
            return false;
        }
        let _loc5_: IGraphicAsset = this.getInstanceMask(param1 | 0);
        if (_loc5_ != null && _loc5_.asset != null && this.initializeShoreMasks(param1)) {
            _loc3_ = asInstanceOf(_loc5_.asset.content, BitmapData);
            if (_loc3_ != null) {
                _loc6_ = this.createShoreMask(_loc3_.width, _loc3_.height, param1);
                _loc2_ = this.getShoreAsset(param1 | 0);
                if (_loc2_ != null && _loc2_.asset != null) {
                    _loc4_ = asInstanceOf(_loc2_.asset.content, BitmapData);
                    if (_loc4_ != null) {
                        _loc3_.fillRect(_loc3_.rect, 0);
                        _loc3_.copyPixels(_loc4_, _loc4_.rect, new Point(0, 0), _loc6_, new Point(0, 0), true);
                    }
                    this._needsShoreUpdate = false;
                }
            }
            return true;
        }
        return false;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';

export class FurnitureBuilderPlaceholderVisualization extends FurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureBuilderPlaceholderVisualization'); }

    private _sizeX: number = -1;
    private _sizeY: number = -1;

    constructor() {
        super();
    }

    protected override updateModel(param1: number): boolean {
        let _loc4_: boolean = super.updateModel(param1);
        let _loc3_: IRoomObjectModel = this.object.getModel();
        let _loc2_: number = _loc3_.getNumber("furniture_size_x") | 0;
        let _loc5_: number = _loc3_.getNumber("furniture_size_y") | 0;
        if (_loc2_ != this._sizeX || _loc5_ != this._sizeY) {
            this._sizeX = _loc2_;
            this._sizeY = _loc5_;
            this.instantiateSprites(param1);
        }
        return _loc4_;
    }

    private instantiateSprites(param1: number): void {
        this.updateLayerCount(this.data.getLayerCount(param1 | 0), param1);
        this.createSprites(this._layerCount);
        this.updateSprites(param1 | 0, true, 0);
    }

    protected override updateLayerCount(param1: number, param2: number): void {
        this._layerCount = param1;
        if (this._sizeX * this._sizeY > 1) {
            this._layerCount *= this._sizeX * this._sizeY;
        }
        this._SafeStr_5412 = -1;
        this.reserveVariableFxOverlaySprite();
    }

    protected override getAdditionalSpriteCount(param1: number): number {
        return 0;
    }

    protected override getSpriteTag(param1: number, param2: number, param3: number): string {
        return super.getSpriteTag(param1, param2, this.getIndex(param1, param3));
    }

    protected override getSpriteAlpha(param1: number, param2: number, param3: number): number {
        return super.getSpriteAlpha(param1, param2, this.getIndex(param1, param3));
    }

    protected override getSpriteColor(param1: number, param2: number, param3: number): number {
        return super.getSpriteColor(param1, this.getIndex(param1, param2), param3);
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        return super.getSpriteAssetName(param1, this.getIndex(param1, param2));
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        let _loc5_: number = super.getSpriteXOffset(param1, param2, this.getIndex(param1, param3));
        let _loc4_: number = param3 / this.data.getLayerCount(param1) | 0;
        let _loc6_: number = _loc4_ % this._sizeY;
        let _loc7_: number = _loc4_ / this._sizeY | 0;
        return _loc5_ + (_loc6_ - _loc7_) * param1 / 2 | 0;
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        let _loc5_: number = super.getSpriteYOffset(param1, param2, this.getIndex(param1, param3));
        let _loc4_: number = param3 / this.data.getLayerCount(param1) | 0;
        let _loc6_: number = _loc4_ % this._sizeY;
        let _loc7_: number = _loc4_ / this._sizeY | 0;
        return _loc5_ + (_loc6_ + _loc7_) * param1 / 4 | 0;
    }

    protected override getSpriteMouseCapture(param1: number, param2: number, param3: number): boolean {
        return super.getSpriteMouseCapture(param1, param2, this.getIndex(param1, param3));
    }

    protected override getSpriteInk(param1: number, param2: number, param3: number): number {
        return super.getSpriteInk(param1, param2, this.getIndex(param1, param3));
    }

    protected override getSpriteZOffset(param1: number, param2: number, param3: number): number {
        return super.getSpriteZOffset(param1, param2, this.getIndex(param1, param3));
    }

    private getIndex(param1: number, param2: number): number {
        return this.data != null ? param2 % this.data.getLayerCount(param1) : param2;
    }
}

import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { AvatarFurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/AvatarFurnitureVisualizationData';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';

export class FurnitureMannequinVisualization extends FurnitureVisualization implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureMannequinVisualization'); }

    private static readonly AVATAR_IMAGE_SPRITE_TAG: string = "avatar_image";
    private readonly MANNEQUIN_BODY: string = "hd-99999-99998";
    private static _customPlaceholders: Map<any, any>;
    private static _SafeStr_3871: number = 0;

    constructor() {
        super();
        FurnitureMannequinVisualization._SafeStr_3871 = FurnitureMannequinVisualization._SafeStr_3871 + 1;
    }

    declare private _figure: string;

    declare private _gender: string;

    declare private _scale: number;
    static { (this.prototype as any)._scale = 0; }

    private _needsUpdate: boolean = false;

    declare private _dynamicAssetName: string;

    declare private _data_FurnitureMannequinVisualization: AvatarFurnitureVisualizationData;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public override dispose(): void {
        if (!this._disposed) {
            this._data_FurnitureMannequinVisualization = null;
            this._disposed = true;
            if (this._dynamicAssetName && this.assetCollection) {
                this.clearDynamicSpriteAssets();
                this.assetCollection.disposeAsset(this._dynamicAssetName);
                this._dynamicAssetName = null;
            }
            super.dispose();
            FurnitureMannequinVisualization._SafeStr_3871 = FurnitureMannequinVisualization._SafeStr_3871 - 1;
            if (FurnitureMannequinVisualization._SafeStr_3871 == 0 && FurnitureMannequinVisualization._customPlaceholders) {
                for (const _loc1_ of FurnitureMannequinVisualization._customPlaceholders?.values() ?? []) {
                    _loc1_.dispose();
                }
                FurnitureMannequinVisualization._customPlaceholders = null;
            }
        }
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        this._data_FurnitureMannequinVisualization = param1 instanceof AvatarFurnitureVisualizationData ? param1 : null;
        super.initialize(param1);
        return true;
    }

    protected override updateObject(param1: number, param2: number): boolean {
        let _loc3_: boolean = super.updateObject(param1, param2);
        if (_loc3_) {
            if (this._scale != param1) {
                this._scale = param1 | 0;
                this.addAvatarAsset();
            }
        }
        return _loc3_;
    }

    public override getSpriteList(): any[] {
        let _loc1_: IAvatarImage = this._data_FurnitureMannequinVisualization.getAvatar(this._figure, this._scale, this._gender, this);
        if (_loc1_ == null) {
            return super.getSpriteList();
        }
        _loc1_.setDirection("full", this.direction);
        return _loc1_.getServerRenderData();
    }

    protected override updateModel(param1: number): boolean {
        let _loc3_: IRoomObject = null;
        let _loc4_: IRoomObjectModel = null;
        let _loc2_: string = null;
        let _loc5_: boolean = super.updateModel(param1);
        if (_loc5_) {
            _loc3_ = this.object;
            if (_loc3_ != null) {
                _loc4_ = _loc3_.getModel();
                if (_loc4_ != null) {
                    _loc2_ = _loc4_.getString("furniture_mannequin_figure");
                    if (_loc2_) {
                        this._gender = _loc4_.getString("furniture_mannequin_gender");
                        this._figure = _loc2_ + "." + "hd-99999-99998";
                        this.addAvatarAsset();
                    }
                }
            }
        }
        if (!_loc5_) {
            _loc5_ = this._needsUpdate;
        }
        this._needsUpdate = false;
        return _loc5_;
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        let _loc3_: string = this.getSpriteTag(param1, this.direction, param2);
        if (this._figure != null && _loc3_ == "avatar_image" && this.isAvatarAssetReady()) {
            return this.getAvatarAssetName();
        }
        return super.getSpriteAssetName(param1, param2);
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        let _loc4_: string = this.getSpriteTag(param1, param2, param3);
        if (_loc4_ == "avatar_image" && this.isAvatarAssetReady()) {
            return -this.getSprite(param3).width / 2 | 0;
        }
        return super.getSpriteXOffset(param1, param2, param3);
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        let _loc4_: string = this.getSpriteTag(param1, param2, param3);
        if (_loc4_ == "avatar_image" && this.isAvatarAssetReady()) {
            return -this.getSprite(param3).height;
        }
        return super.getSpriteYOffset(param1, param2, param3);
    }

    public avatarImageReady(param1: string): void {
        if (param1 == this._figure) {
            this.addAvatarAsset(true);
        }
    }

    private addAvatarAsset(param1: boolean = false): void {
        let _loc3_: IAvatarImage = null;
        let _loc2_: IAvatarImage = null;
        if (!this.isAvatarAssetReady() || param1) {
            _loc3_ = this._data_FurnitureMannequinVisualization.getAvatar(this._figure, this._scale, this._gender, this);
            if (_loc3_) {
                if (_loc3_.isPlaceholder()) {
                    _loc3_.dispose();
                    _loc2_ = this.getCustomPlaceholder(this._scale);
                    _loc2_.setDirection("full", this.direction);
                    this.assetCollection.addAsset(this.getAvatarAssetName(), _loc2_.getImage("full", true), true);
                    this._needsUpdate = true;
                    return;
                }
                _loc3_.setDirection("full", this.direction);
                if (this._dynamicAssetName) {
                    this.clearDynamicSpriteAssets();
                    this.assetCollection.disposeAsset(this._dynamicAssetName);
                }
                this.assetCollection.addAsset(this.getAvatarAssetName(), _loc3_.getImage("full", true), true);
                this._dynamicAssetName = this.getAvatarAssetName();
                this._needsUpdate = true;
                _loc3_.dispose();
            }
        }
    }

    private clearDynamicSpriteAssets(): void {
        let _loc2_: number = 0;
        let _loc1_: IRoomObjectSprite = null;
        _loc2_ = 0;
        while (_loc2_ < this.spriteCount) {
            _loc1_ = this.getSprite(_loc2_);
            if (_loc1_ != null && _loc1_.assetName == this._dynamicAssetName) {
                _loc1_.asset = null;
            }
            _loc2_++;
        }
    }

    private getCustomPlaceholder(param1: number): IAvatarImage {
        if (!FurnitureMannequinVisualization._customPlaceholders) {
            FurnitureMannequinVisualization._customPlaceholders = new Dictionary();
        }
        let _loc2_: IAvatarImage = FurnitureMannequinVisualization._customPlaceholders.get(param1);
        if (_loc2_ == null) {
            _loc2_ = this._data_FurnitureMannequinVisualization.getAvatar("hd-99999-99998", param1, null, null);
            FurnitureMannequinVisualization._customPlaceholders.set(param1, _loc2_);
        }
        return _loc2_;
    }

    private isAvatarAssetReady(): boolean {
        return !!(this._figure && this.getAsset(this.getAvatarAssetName()) != null);
    }

    private getAvatarAssetName(): string {
        let _loc1_: IRoomObject = this.object;
        if (!_loc1_) {
            return null;
        }
        return "mannequin_" + this._figure + "_" + this._scale + "_" + this.direction + "_" + _loc1_.getId();
    }

    get [IDisposable](): true {
        return true;
    }
}

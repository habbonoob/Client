import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { SizeData } from '@/com/sulake/habbo/room/object/visualization/data/SizeData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { AnimationSizeData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationSizeData';
import { AnimatedFurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualizationData';
import { PetAnimationSizeData } from '@/com/sulake/habbo/room/object/visualization/pet/PetAnimationSizeData';

export class AnimatedPetVisualizationData extends AnimatedFurnitureVisualizationData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.pet::AnimatedPetVisualizationData'); }

    constructor() {
        super();
    }

    private _commonAssets: IAssetLibrary = null;
    private _isAllowedToTurnHead: boolean = true;

    public get commonAssets(): IAssetLibrary {
        return this._commonAssets;
    }

    public set commonAssets(param1: IAssetLibrary) {
        this._commonAssets = param1;
    }

    public get isAllowedToTurnHead(): boolean {
        return this._isAllowedToTurnHead;
    }

    protected override defineVisualizations(param1: XML): boolean {
        this._isAllowedToTurnHead = param1.child("graphics").hasOwnProperty("@disableheadturn") ? param1.child("graphics").attribute("disableheadturn")?.toString() != "1" : true;
        return super.defineVisualizations(param1);
    }

    protected override createSizeData(param1: number, param2: number, param3: number): SizeData {
        let _loc4_: SizeData = null;
        if (param1 > 1) {
            _loc4_ = new PetAnimationSizeData(param2, param3);
        } else {
            _loc4_ = new AnimationSizeData(param2, param3);
        }
        return _loc4_;
    }

    protected override processVisualizationElement(param1: SizeData, param2: XML): boolean {
        let _loc3_: PetAnimationSizeData = null;
        if (param1 == null || param2 == null) {
            return false;
        }
        switch (String(param2.name())) {
            case "postures":
                _loc3_ = param1 instanceof PetAnimationSizeData ? param1 : null;
                if (_loc3_ != null) {
                    if (!_loc3_.definePostures(param2)) {
                        return false;
                    }
                }
                break;
            case "gestures":
                _loc3_ = param1 instanceof PetAnimationSizeData ? param1 : null;
                if (_loc3_ != null) {
                    if (!_loc3_.defineGestures(param2)) {
                        return false;
                    }
                }
                break;
            default:
                if (!super.processVisualizationElement(param1, param2)) {
                    return false;
                }
        }
        return true;
    }

    public getAnimationForPosture(param1: number, param2: string): number {
        let _loc3_: PetAnimationSizeData = asInstanceOf(this.getSizeData(param1), PetAnimationSizeData);
        if (_loc3_ != null) {
            return _loc3_.getAnimationForPosture(param2);
        }
        return -1;
    }

    public getGestureDisabled(param1: number, param2: string): boolean {
        let _loc3_: PetAnimationSizeData = asInstanceOf(this.getSizeData(param1), PetAnimationSizeData);
        if (_loc3_ != null) {
            return _loc3_.getGestureDisabled(param2);
        }
        return false;
    }

    public getAnimationForGesture(param1: number, param2: string): number {
        let _loc3_: PetAnimationSizeData = asInstanceOf(this.getSizeData(param1), PetAnimationSizeData);
        if (_loc3_ != null) {
            return _loc3_.getAnimationForGesture(param2);
        }
        return -1;
    }

    public getPostureForAnimation(param1: number, param2: number, param3: boolean): string {
        let _loc4_: PetAnimationSizeData = asInstanceOf(this.getSizeData(param1), PetAnimationSizeData);
        if (_loc4_ != null) {
            return _loc4_.getPostureForAnimation(param2, param3);
        }
        return null;
    }

    public getGestureForAnimation(param1: number, param2: number): string {
        let _loc3_: PetAnimationSizeData = asInstanceOf(this.getSizeData(param1), PetAnimationSizeData);
        if (_loc3_ != null) {
            return _loc3_.getGestureForAnimation(param2);
        }
        return null;
    }

    public getGestureForAnimationId(param1: number, param2: number): string {
        let _loc3_: PetAnimationSizeData = asInstanceOf(this.getSizeData(param1), PetAnimationSizeData);
        return _loc3_ == null ? null : _loc3_.getGestureForAnimationId(param2);
    }

    public getPostureCount(param1: number): number {
        let _loc2_: PetAnimationSizeData = asInstanceOf(this.getSizeData(param1), PetAnimationSizeData);
        if (_loc2_ != null) {
            return _loc2_.getPostureCount();
        }
        return 0;
    }

    public getGestureCount(param1: number): number {
        let _loc2_: PetAnimationSizeData = asInstanceOf(this.getSizeData(param1), PetAnimationSizeData);
        if (_loc2_ != null) {
            return _loc2_.getGestureCount();
        }
        return 0;
    }
}

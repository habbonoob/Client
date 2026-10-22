import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';
import { FurniturePlanetSystemVisualizationPlanetObject } from '@/com/sulake/habbo/room/object/visualization/furniture/FurniturePlanetSystemVisualizationPlanetObject';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurniturePlanetSystemVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurniturePlanetSystemVisualization'); }

    constructor() {
        super();
    }

    declare private _SafeStr_2605: any[];

    declare private _SafeStr_5413: any[];

    private _offsetArray: any[] = [];
    private _SafeStr_6408: Vector3d = new Vector3d(0, 0, 0);

    public override dispose(): void {
        let _loc1_: FurniturePlanetSystemVisualizationPlanetObject = null;
        if (this._SafeStr_2605 != null) {
            while (this._SafeStr_2605.length > 0) {
                _loc1_ = this._SafeStr_2605.shift();
                _loc1_.dispose();
            }
        }
        this._SafeStr_2605 = null;
        this._SafeStr_5413 = null;
    }

    protected override updateAnimation(param1: number): number {
        let _loc2_: FurniturePlanetSystemVisualizationPlanetObject = null;
        let _loc4_: number = 0;
        let _loc3_: any = 0;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        if (this._SafeStr_2605 == null && this.spriteCount > 0) {
            if (!this.readDefinition()) {
                return 0;
            }
        }
        if (this._SafeStr_2605 != null) {
            _loc4_ = 0;
            while (_loc4_ < this._SafeStr_2605.length) {
                _loc2_ = this._SafeStr_2605[_loc4_];
                _loc2_.update(this._offsetArray, this._SafeStr_6408, param1);
                _loc4_++;
            }
            _loc3_ = super.updateAnimation(param1);
            _loc6_ = (this._offsetArray.length < 31 ? this._offsetArray.length : 31) | 0;
            _loc5_ = 0;
            while (_loc5_ < _loc6_) {
                _loc3_ |= 1 << _loc5_;
                _loc5_++;
            }
            return _loc3_ | 0;
        }
        return 0;
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        if (param3 < this._offsetArray.length) {
            return this._offsetArray[param3].x | 0;
        }
        return super.getSpriteXOffset(param1, param2, param3);
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        if (param3 < this._offsetArray.length) {
            return this._offsetArray[param3].y | 0;
        }
        return super.getSpriteYOffset(param1, param2, param3);
    }

    protected override getSpriteZOffset(param1: number, param2: number, param3: number): number {
        if (param3 < this._offsetArray.length) {
            return Number(this._offsetArray[param3].z);
        }
        return super.getSpriteZOffset(param1, param2, param3);
    }

    private readDefinition(): boolean {
        let _loc4_: number = 0;
        let _loc8_: XML = null;
        let _loc2_: IRoomObject = this.object;
        if (_loc2_ == null) {
            return false;
        }
        let _loc5_: IRoomObjectModel = _loc2_.getModel();
        if (_loc5_ == null) {
            return false;
        }
        let _loc7_: string = _loc5_.getString("furniture_planetsystem_data");
        let _loc6_: XMLList = XMLList.from(_loc7_);
        let _loc3_: XMLList = _loc6_.children();
        let _loc1_: number = _loc3_.length();
        this._SafeStr_2605 = [];
        this._SafeStr_5413 = [];
        _loc4_ = 0;
        while (_loc4_ < _loc1_) {
            _loc8_ = _loc3_.item(_loc4_);
            this.addPlanet(_loc8_.attribute("name").toString(), _loc4_, _loc8_.attribute("parent").toString(), Number(_loc8_.attribute("radius")), Number(_loc8_.attribute("arcspeed")), Number(_loc8_.attribute("arcoffset")), Number(_loc8_.attribute("height")));
            _loc4_++;
        }
        return true;
    }

    private addPlanet(param1: string, param2: number, param3: string, param4: number, param5: number, param6: number, param7: number): void {
        let _loc8_: FurniturePlanetSystemVisualizationPlanetObject = null;
        if (this._SafeStr_2605 == null) {
            return;
        }
        let _loc9_: FurniturePlanetSystemVisualizationPlanetObject = new FurniturePlanetSystemVisualizationPlanetObject(param1, param2, param4, param5, param6, param7);
        _loc8_ = this.getPlanet(param3);
        if (_loc8_ != null) {
            _loc8_.addChild(_loc9_);
        } else {
            this._SafeStr_2605.push(_loc9_);
            this._SafeStr_5413.push(param1);
        }
    }

    private getPlanet(param1: string): FurniturePlanetSystemVisualizationPlanetObject {
        let _loc2_: FurniturePlanetSystemVisualizationPlanetObject = null;
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_2605.length) {
            _loc2_ = this._SafeStr_2605[_loc3_];
            if (_loc2_.name == param1) {
                return _loc2_;
            }
            if (_loc2_.hasChild(param1)) {
                return _loc2_.getChild(param1);
            }
            _loc3_++;
        }
        return null;
    }
}

import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { Logger } from '@/com/sulake/habbo/Logger';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';
import { FurnitureParticleSystem } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureParticleSystem';

export class FurnitureFireworksVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureFireworksVisualization'); }

    declare private _particleSystems: Map<any, any>;

    declare private _SafeStr_2377: FurnitureParticleSystem;

    constructor() {
        super();
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_2377 = null;
        if (this._particleSystems) {
            for (const _loc1_ of this._particleSystems?.values() ?? []) {
                _loc1_.dispose();
            }
            this._particleSystems = null;
        }
    }

    protected override updateObject(param1: number, param2: number): boolean {
        let _loc3_: boolean = false;
        let _loc4_: FurnitureParticleSystem = null;
        if (super.updateObject(param1, param2)) {
            _loc3_ = false;
            if (!this._particleSystems) {
                this.readDefinition();
                if (this._particleSystems) {
                    this._SafeStr_2377 = this._particleSystems.get(param1);
                    _loc3_ = true;
                } else {
                    Logger.log("ERROR Particle systems could not be read! " + this.object.getType());
                }
            } else if (param1 != this._SafeStr_2292 || this._particleSystems.get(param1) != this._SafeStr_2377) {
                _loc4_ = this._particleSystems.get(param1);
                _loc4_.copyStateFrom(this._SafeStr_2377);
                if (this._SafeStr_2377) {
                    this._SafeStr_2377.reset();
                }
                this._SafeStr_2377 = _loc4_;
                _loc3_ = true;
            }
            return true;
        }
        return false;
    }

    protected override updateSprites(param1: number, param2: boolean, param3: number): void {
        super.updateSprites(param1, param2, param3);
        if (this._SafeStr_2377) {
            this._SafeStr_2377.updateSprites();
        }
    }

    protected override updateAnimation(param1: number): number {
        if (this._SafeStr_2377) {
            this._SafeStr_2377.updateAnimation();
        }
        return super.updateAnimation(param1);
    }

    protected override setAnimation(param1: number): void {
        if (this._SafeStr_2377) {
            this._SafeStr_2377.setAnimation(param1);
        }
        super.setAnimation(param1);
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        if (this._SafeStr_2377 && this._SafeStr_2377.controlsSprite(param3)) {
            return this._SafeStr_2377.getSpriteYOffset(param1, param2, param3);
        }
        return super.getSpriteYOffset(param1, param2, param3);
    }

    private readDefinition(): boolean {
        let _loc1_: FurnitureParticleSystem = null;
        let _loc4_: number = 0;
        let _loc5_: IRoomObject = this.object;
        if (_loc5_ == null) {
            return false;
        }
        let _loc7_: IRoomObjectModel = _loc5_.getModel();
        if (_loc7_ == null) {
            return false;
        }
        let _loc6_: string = _loc7_.getString("furniture_fireworks_data");
        if (!_loc6_ || _loc6_.length == 0) {
            Logger.log("No Particle System Data Found.");
            return false;
        }
        let _loc3_: XML = XML.from(_loc6_);
        this._particleSystems = new Dictionary();
        for (const _loc2_ of _loc3_.child("particlesystem") ?? []) {
            if (!_loc2_.hasOwnProperty("@size")) {
                Logger.log("Particle System does not have size property!");
            } else {
                _loc4_ = Number(_loc2_.attribute("size")) | 0;
                _loc1_ = new FurnitureParticleSystem(this);
                _loc1_.parseData(_loc2_);
                this._particleSystems.set(_loc4_, _loc1_);
            }
        }
        return true;
    }
}

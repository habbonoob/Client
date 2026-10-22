import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Vector3D } from '@habbo-pixi/runtime/geom/Vector3D';
import { FurnitureParticleSystemParticle } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureParticleSystemParticle';

export class FurnitureParticleSystemEmitter extends FurnitureParticleSystemParticle {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureParticleSystemEmitter'); }

    public static readonly SHAPE_CONE: string = "cone";
    public static readonly SHAPE_PLANE: string = "plane";
    public static readonly SHAPE_SPHERE: string = "sphere";

    constructor(param1: string = "", param2: number = -1) {
        super();
        this._name = param1;
        this._roomObjectSpriteId = param2;
        this._SafeStr_3938 = [];
    }

    declare private _name: string;

    private _roomObjectSpriteId: number = -1;

    declare private _SafeStr_4728: number;
    static { (this.prototype as any)._SafeStr_4728 = NaN; }

    declare private _direction_FurnitureParticleSystemEmitter: Vector3D;

    private _SafeStr_3483: number = 0.1;

    declare private _SafeStr_4151: number;
    static { (this.prototype as any)._SafeStr_4151 = NaN; }

    declare private _SafeStr_2497: number;
    static { (this.prototype as any)._SafeStr_2497 = NaN; }

    declare private _SafeStr_4700: string;

    declare private _SafeStr_3938: any[];

    declare private _maxNumberOfParticles: number;
    static { (this.prototype as any)._maxNumberOfParticles = 0; }

    declare private _particlesPerFrame: number;
    static { (this.prototype as any)._particlesPerFrame = 0; }

    declare private _emittedParticles: number;
    static { (this.prototype as any)._emittedParticles = 0; }

    private _fuseTime: number = 10;
    private _energy: number = 1;
    private _hasIgnited: boolean = false;
    private _SafeStr_4393: number = 1;
    private _particles: any[] = [];

    public get particles(): any[] {
        return this._particles;
    }

    public get hasIgnited(): boolean {
        return this._hasIgnited;
    }

    public get roomObjectSpriteId(): number {
        return this._roomObjectSpriteId;
    }

    public override dispose(): void {
        for (const _loc1_ of this._particles ?? []) {
            _loc1_.dispose();
        }
        this._particles = null;
        this._direction_FurnitureParticleSystemEmitter = null;
        this._SafeStr_3938 = null;
        super.dispose();
    }

    protected override ignite(): void {
        this._hasIgnited = true;
        if (this._emittedParticles < this._maxNumberOfParticles) {
            if (this.age > 1) {
                this.releaseParticles(this, this.direction);
            }
        }
    }

    public override update(): void {
        super.update();
        this.accumulateForces();
        this.verlet();
        this.satisfyConstraints();
        if (!this.isAlive && this._emittedParticles < this._maxNumberOfParticles) {
            if (this.age % this._SafeStr_4393 == 0) {
                this.releaseParticles(this, this.direction);
            }
        }
    }

    public setup(param1: number, param2: number, param3: number, param4: Vector3D, param5: number, param6: number, param7: string, param8: number, param9: number, param10: number): void {
        this._maxNumberOfParticles = param1;
        this._particlesPerFrame = param2;
        this._SafeStr_4728 = param3;
        this._direction_FurnitureParticleSystemEmitter = param4;
        this._direction_FurnitureParticleSystemEmitter.normalize();
        this._SafeStr_4151 = param5;
        this._SafeStr_2497 = param6;
        this._SafeStr_4700 = param7;
        this._fuseTime = param9;
        this._energy = param8;
        this._SafeStr_4393 = param10;
        this.reset();
    }

    public reset(): void {
        for (const _loc1_ of this._particles ?? []) {
            _loc1_.dispose();
        }
        this._particles = [];
        this._emittedParticles = 0;
        this._hasIgnited = false;
        this.init(0, 0, 0, this._direction_FurnitureParticleSystemEmitter, this._SafeStr_4728, this._SafeStr_3483, this._fuseTime, true);
    }

    public copyStateFrom(param1: FurnitureParticleSystemEmitter, param2: number): void {
        super.copy(param1, param2);
        this._SafeStr_4728 = param1._SafeStr_4728;
        this._direction_FurnitureParticleSystemEmitter = param1._direction_FurnitureParticleSystemEmitter;
        this._SafeStr_4151 = param1._SafeStr_4151;
        this._SafeStr_2497 = param1._SafeStr_2497;
        this._SafeStr_4700 = param1._SafeStr_4700;
        this._fuseTime = param1._fuseTime;
        this._energy = param1._energy;
        this._SafeStr_4393 = param1._SafeStr_4393;
        this._SafeStr_3483 = param1._SafeStr_3483;
        this._hasIgnited = param1._hasIgnited;
    }

    public configureParticle(param1: number, param2: boolean, param3: any[], param4: boolean): void {
        let _loc5_: Map<any, any> = new Dictionary();
        _loc5_.set("lifeTime", param1);
        _loc5_.set("isEmitter", param2);
        _loc5_.set("frames", param3);
        _loc5_.set("fade", param4);
        this._SafeStr_3938.push(_loc5_);
    }

    public verlet(): void {
        let _loc2_: number = NaN;
        let _loc3_: number = NaN;
        let _loc4_: number = NaN;
        let _loc5_: any = null;
        if (this.isAlive || this._emittedParticles < this._maxNumberOfParticles) {
            _loc2_ = this.x;
            _loc3_ = this.y;
            _loc4_ = this.z;
            this.x = (2 - this._SafeStr_2497) * this.x - (1 - this._SafeStr_2497) * this.lastX;
            this.y = (2 - this._SafeStr_2497) * this.y - (1 - this._SafeStr_2497) * this.lastY + this._SafeStr_4151 * this._SafeStr_3483 * this._SafeStr_3483;
            this.z = (2 - this._SafeStr_2497) * this.z - (1 - this._SafeStr_2497) * this.lastZ;
            this.lastX = _loc2_;
            this.lastY = _loc3_;
            this.lastZ = _loc4_;
        }
        let _loc1_: any[] = [];
        for (_loc5_ of this._particles ?? []) {
            _loc5_.update();
            _loc2_ = Number(_loc5_.x);
            _loc3_ = Number(_loc5_.y);
            _loc4_ = Number(_loc5_.z);
            _loc5_.x = (2 - this._SafeStr_2497) * _loc5_.x - (1 - this._SafeStr_2497) * _loc5_.lastX;
            _loc5_.y = (2 - this._SafeStr_2497) * _loc5_.y - (1 - this._SafeStr_2497) * _loc5_.lastY + this._SafeStr_4151 * this._SafeStr_3483 * this._SafeStr_3483;
            _loc5_.z = (2 - this._SafeStr_2497) * _loc5_.z - (1 - this._SafeStr_2497) * _loc5_.lastZ;
            _loc5_.lastX = _loc2_;
            _loc5_.lastY = _loc3_;
            _loc5_.lastZ = _loc4_;
            if (_loc5_.y > 10 || !_loc5_.isAlive) {
                _loc1_.push(_loc5_);
            }
        }
        for (_loc5_ of _loc1_ ?? []) {
            if (_loc5_.isEmitter) {
            }
            this._particles.splice(this._particles.indexOf(_loc5_), 1);
            _loc5_.dispose();
        }
    }

    private releaseParticles(param1: FurnitureParticleSystemParticle, param2: Vector3D = null): void {
        let _loc8_: FurnitureParticleSystemParticle = null;
        let _loc3_: Map<any, any> = null;
        let _loc10_: number = 0;
        let _loc6_: any[] = null;
        let _loc7_: number = 0;
        if (!param2) {
            param2 = new Vector3D();
        }
        let _loc9_: Vector3D = new Vector3D();
        let _loc4_: boolean = false;
        let _loc5_: boolean = false;
        _loc3_ = this.getRandomParticleConfiguration();
        _loc7_ = 0;
        while (_loc7_ < this._particlesPerFrame) {
            switch (this._SafeStr_4700) {
                case "cone":
                    _loc9_.x = this.randomBoolean(0.5) ? Math.random() : -Math.random();
                    _loc9_.y = -(Math.random() + 1);
                    _loc9_.z = this.randomBoolean(0.5) ? Math.random() : -Math.random();
                    break;
                case "plane":
                    _loc9_.x = this.randomBoolean(0.5) ? Math.random() : -Math.random();
                    _loc9_.y = 0;
                    _loc9_.z = this.randomBoolean(0.5) ? Math.random() : -Math.random();
                    break;
                case "sphere":
                    _loc9_.x = this.randomBoolean(0.5) ? Math.random() : -Math.random();
                    _loc9_.y = this.randomBoolean(0.5) ? Math.random() : -Math.random();
                    _loc9_.z = this.randomBoolean(0.5) ? Math.random() : -Math.random();
            }
            _loc9_.normalize();
            _loc8_ = new FurnitureParticleSystemParticle();
            if (_loc3_) {
                _loc10_ = Math.floor(Math.random() * _loc3_.get("lifeTime") + 10) | 0;
                _loc4_ = Boolean(_loc3_.get("isEmitter"));
                _loc6_ = _loc3_.get("frames");
                _loc5_ = Boolean(_loc3_.get("fade"));
            } else {
                _loc10_ = Math.floor(Math.random() * 20 + 10) | 0;
                _loc4_ = false;
                _loc6_ = [];
            }
            _loc8_.init(param1.x, param1.y, param1.z, _loc9_, this._energy, this._SafeStr_3483, _loc10_, _loc4_, _loc6_, _loc5_);
            this._particles.push(_loc8_);
            this._emittedParticles = this._emittedParticles + 1;
            _loc7_++;
        }
    }

    private getRandomParticleConfiguration(): Map<any, any> {
        let _loc1_: number = Math.floor(Math.random() * this._SafeStr_3938.length) | 0;
        return this._SafeStr_3938[_loc1_];
    }

    private satisfyConstraints(): void {
    }

    private accumulateForces(): void {
        for (const _loc1_ of this._particles ?? []) {
        }
    }

    private randomBoolean(param1: number): boolean {
        return Math.random() < param1;
    }
}

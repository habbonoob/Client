import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSpriteCanvasContainer } from '@/com/sulake/room/renderer/IRoomSpriteCanvasContainer';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { RoomSpriteCanvas } from '@/com/sulake/room/renderer/RoomSpriteCanvas';
import { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';
import { RoomRotatingEffect } from '@/com/sulake/room/utils/RoomRotatingEffect';
import { RoomShakingEffect } from '@/com/sulake/room/utils/RoomShakingEffect';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RotatingRoomSpriteCanvas extends RoomSpriteCanvas {
    static { registerClassName(this, 'com.sulake.room.renderer::RotatingRoomSpriteCanvas'); }

    constructor(param1: IRoomSpriteCanvasContainer, param2: number, param3: number, param4: number, param5: number) {
        super(param1, param2, param3, param4, param5);
    }

    declare private _tools: Sprite;

    declare private _SafeStr_3649: boolean;

    declare private _rotation: number;

    declare private _rotationOrigin: Vector3d;

    declare private _rotationRodLength: number;

    declare private _SafeStr_2578: any[];

    declare private _SafeStr_2824: any[];

    declare private _SafeStr_2649: Vector3d;

    declare private _SafeStr_4023: Vector3d;

    declare private _counter: number;

    public override dispose(): void {
        super.dispose();
        this._tools = null;
        this._SafeStr_2578 = [];
        this._SafeStr_2824 = [];
    }

    public override initialize(param1: number, param2: number): void {
        super.initialize(param1, param2);
    }

    public override render(param1: number, param2: boolean = false): void {
        this.doMagic();
        super.render(param1, param2);
    }

    public override handleMouseEvent(param1: number, param2: number, param3: string, param4: boolean, param5: boolean, param6: boolean, param7: boolean): boolean {
        let _loc8_: boolean = super.handleMouseEvent(param1, param2, param3, param4, param5, param6, param7);
        if (param3 == "click") {
            this.checkButtonHits(param1 + this.screenOffsetX, param2 + this.screenOffsetY);
        }
        return _loc8_;
    }

    private getGeometry(): RoomGeometry {
        return asInstanceOf(this.geometry, RoomGeometry);
    }

    private doMagic(): void {
        let _loc2_: IVector3d = null;
        let _loc3_: Vector3d = null;
        let _loc4_: IVector3d = null;
        let _loc1_: Vector3d = null;
        if (this._rotation != 0) {
            _loc2_ = this._SafeStr_2649;
            this.getGeometry().direction = new Vector3d(_loc2_.x + this._rotation, _loc2_.y, _loc2_.z);
            _loc2_ = this.getGeometry().direction;
            this.getGeometry().setDepthVector(new Vector3d(_loc2_.x, _loc2_.y, 5));
            _loc3_ = new Vector3d();
            _loc3_.assign(this._rotationOrigin);
            _loc3_.x += this._rotationRodLength * Math.cos((_loc2_.x + 180) / 180 * 3.141592653589793) * Math.cos(_loc2_.y / 180 * 3.141592653589793);
            _loc3_.y += this._rotationRodLength * Math.sin((_loc2_.x + 180) / 180 * 3.141592653589793) * Math.cos(_loc2_.y / 180 * 3.141592653589793);
            _loc3_.z += this._rotationRodLength * Math.sin(_loc2_.y / 180 * 3.141592653589793);
            this.getGeometry().location = _loc3_;
            this._SafeStr_4023 = new Vector3d();
            this._SafeStr_4023.assign(_loc3_);
            this._SafeStr_2649 = new Vector3d();
            this._SafeStr_2649.assign(this.getGeometry().direction);
        }
        if (RoomShakingEffect.isVisualizationOn() && !this._SafeStr_3649) {
            this.changeShaking();
        } else if (!RoomShakingEffect.isVisualizationOn() && this._SafeStr_3649) {
            this.changeShaking();
        }
        if (RoomRotatingEffect.isVisualizationOn()) {
            this.changeRotation();
        }
        if (this._SafeStr_3649) {
            this._counter = this._counter + 1;
            _loc4_ = this._SafeStr_2649;
            _loc1_ = Vector3d.sum(_loc4_, new Vector3d(Math.sin(this._counter * 5 / 180 * 3.141592653589793) * 2, Math.sin(this._counter / 180 * 3.141592653589793) * 5, Math.sin(this._counter * 10 / 180 * 3.141592653589793) * 2));
            this.getGeometry().direction = _loc1_;
        } else {
            this._counter = 0;
            this.getGeometry().direction = this._SafeStr_2649;
        }
    }

    private createTestingTools(): void {
        let _loc4_: any[] = null;
        let _loc1_: Rectangle = null;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        if (this._tools == null && this.displayObject instanceof Sprite) {
            this._tools = new Sprite();
            (asInstanceOf(this.displayObject, Sprite)).addChild(this._tools);
            _loc4_ = [16776960, 16711680, 65280, 11184810, 11184810, 11184810, 11184810];
            _loc1_ = null;
            _loc1_ = new Rectangle(58, 8, 16, 16);
            this._SafeStr_2578.push(_loc1_);
            _loc1_ = new Rectangle(58, 28, 16, 16);
            this._SafeStr_2578.push(_loc1_);
            _loc1_ = new Rectangle(58, 48, 16, 16);
            this._SafeStr_2578.push(_loc1_);
            _loc1_ = new Rectangle(82, 28, 16, 16);
            this._SafeStr_2578.push(_loc1_);
            _loc1_ = new Rectangle(122, 28, 16, 16);
            this._SafeStr_2578.push(_loc1_);
            _loc1_ = new Rectangle(102, 8, 16, 16);
            this._SafeStr_2578.push(_loc1_);
            _loc1_ = new Rectangle(102, 48, 16, 16);
            this._SafeStr_2578.push(_loc1_);
            _loc3_ = 0;
            while (_loc3_ < this._SafeStr_2578.length) {
                _loc1_ = asInstanceOf(this._SafeStr_2578[_loc3_], Rectangle);
                _loc2_ = 0;
                this._tools.graphics.beginFill(_loc2_ >>> 0);
                this._tools.graphics.drawRect(_loc1_.x - 1, _loc1_.y - 1, _loc1_.width + 2, _loc1_.height + 2);
                this._tools.graphics.endFill();
                _loc2_ = _loc4_[_loc3_] | 0;
                this._tools.graphics.beginFill(_loc2_ >>> 0);
                this._tools.graphics.drawRect(_loc1_.x, _loc1_.y, _loc1_.width, _loc1_.height);
                this._tools.graphics.endFill();
                _loc3_++;
            }
            this._SafeStr_2824.push(this.changeScale);
            this._SafeStr_2824.push(this.changeShaking);
            this._SafeStr_2824.push(this.changeRotation);
            this._SafeStr_2824.push(this.moveLeft);
            this._SafeStr_2824.push(this.moveRight);
            this._SafeStr_2824.push(this.moveUp);
            this._SafeStr_2824.push(this.moveDown);
        }
    }

    private checkButtonHits(param1: number, param2: number): void {
        let _loc4_: number = 0;
        let _loc3_: Rectangle = null;
        _loc4_ = 0;
        while (_loc4_ < this._SafeStr_2578.length) {
            _loc3_ = asInstanceOf(this._SafeStr_2578[_loc4_], Rectangle);
            if (param1 >= _loc3_.x && param1 <= _loc3_.x + _loc3_.width && param2 >= _loc3_.y && param2 <= _loc3_.y + _loc3_.height) {
                if (this._SafeStr_2824.length > _loc4_) {
                    this._SafeStr_2824[_loc4_]();
                }
            }
            _loc4_++;
        }
    }

    private changeScale(): void {
        if (this.getGeometry().scale < 64) {
            this.getGeometry().scale = 64;
        } else {
            this.getGeometry().scale = 32;
        }
    }

    private changeShaking(): void {
        let _loc1_: IVector3d = null;
        this._SafeStr_3649 = !this._SafeStr_3649;
        if (this._SafeStr_3649) {
            _loc1_ = this.getGeometry().direction;
            this._SafeStr_2649 = new Vector3d(_loc1_.x, _loc1_.y, _loc1_.z);
        }
    }

    private changeRotation(): void {
        let _loc3_: IVector3d = null;
        let _loc1_: IVector3d = null;
        let _loc2_: IVector3d = null;
        if (this._SafeStr_3649) {
            return;
        }
        if (this._rotation == 0) {
            if (this.getGeometry() != null) {
                _loc3_ = this.getGeometry().location;
                _loc1_ = this.getGeometry().directionAxis;
                this._SafeStr_4023 = new Vector3d();
                this._SafeStr_4023.assign(_loc3_);
                this._SafeStr_2649 = new Vector3d();
                this._SafeStr_2649.assign(this.getGeometry().direction);
                _loc2_ = RoomGeometry.getIntersectionVector(_loc3_, _loc1_, new Vector3d(0, 0, 0), new Vector3d(0, 0, 1));
                if (_loc2_ != null) {
                    this._rotationOrigin = new Vector3d(_loc2_.x, _loc2_.y, _loc2_.z);
                    this._rotationRodLength = Vector3d.dif(_loc2_, _loc3_).length;
                    this._rotation = 1;
                }
            }
        } else {
            this._rotation = 0;
            if (this.getGeometry() != null) {
                this.getGeometry().location = this._SafeStr_4023;
                this.getGeometry().direction = this._SafeStr_2649;
                this.getGeometry().setDepthVector(new Vector3d(this._SafeStr_2649.x, this._SafeStr_2649.y, 5));
            }
        }
    }

    private moveLeft(): void {
        let _loc1_: number = NaN;
        if (this._rotation != 0) {
            if (this._rotation == 1) {
                this._rotation = -1;
            } else {
                this._rotation -= 1;
            }
            return;
        }
        if (this.getGeometry() != null) {
            _loc1_ = (this.getGeometry().direction.x - 90) / 180 * 3.141592653589793;
            this.getGeometry().location = Vector3d.sum(this.getGeometry().location, new Vector3d(Math.cos(_loc1_) * Math.sqrt(2), Math.sin(_loc1_) * Math.sqrt(2)));
        }
    }

    private moveRight(): void {
        let _loc1_: number = NaN;
        if (this._rotation != 0) {
            if (this._rotation == -1) {
                this._rotation = 1;
            } else {
                this._rotation += 1;
            }
            return;
        }
        if (this.getGeometry() != null) {
            _loc1_ = (this.getGeometry().direction.x + 90) / 180 * 3.141592653589793;
            this.getGeometry().location = Vector3d.sum(this.getGeometry().location, new Vector3d(Math.cos(_loc1_) * Math.sqrt(2), Math.sin(_loc1_) * Math.sqrt(2)));
        }
    }

    private moveUp(): void {
        let _loc1_: number = NaN;
        if (this._rotation != 0) {
            return;
        }
        if (this.getGeometry() != null) {
            _loc1_ = this.getGeometry().direction.x / 180 * 3.141592653589793;
            this.getGeometry().location = Vector3d.sum(this.getGeometry().location, new Vector3d(Math.cos(_loc1_) * Math.sqrt(2), Math.sin(_loc1_) * Math.sqrt(2)));
        }
    }

    private moveDown(): void {
        let _loc1_: number = NaN;
        if (this._rotation != 0) {
            return;
        }
        if (this.getGeometry() != null) {
            _loc1_ = (this.geometry.direction.x + 180) / 180 * 3.141592653589793;
            this.getGeometry().location = Vector3d.sum(this.getGeometry().location, new Vector3d(Math.cos(_loc1_) * Math.sqrt(2), Math.sin(_loc1_) * Math.sqrt(2)));
        }
    }

    protected override initInstanceFields(): void {
        this.changeScale = this.changeScale.bind(this);
        this.changeShaking = this.changeShaking.bind(this);
        this.changeRotation = this.changeRotation.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this._SafeStr_3649 = false;
        this._rotation = 0;
        this._rotationOrigin = null;
        this._rotationRodLength = 0;
        this._SafeStr_2578 = [];
        this._SafeStr_2824 = [];
        this._counter = 0;
        super.initInstanceFields();
    }
}

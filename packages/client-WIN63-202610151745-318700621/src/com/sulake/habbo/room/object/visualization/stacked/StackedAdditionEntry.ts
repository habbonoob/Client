import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStackedAddition } from '@/com/sulake/habbo/room/object/visualization/stacked/IStackedAddition';
import { AnimatedScalar } from '@/com/sulake/habbo/room/object/visualization/variablefx/animation/AnimatedScalar';
import { RoomObjectSprite } from '@/com/sulake/room/object/visualization/RoomObjectSprite';

export class StackedAdditionEntry {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.stacked::StackedAdditionEntry'); }

    declare public _SafeStr_14782: IStackedAddition;

    public sprite: RoomObjectSprite = new RoomObjectSprite();
    public y: AnimatedScalar = new AnimatedScalar(0.003, 0.35, 0.01, 0.004);

    declare public layer: number;
    static { (this.prototype as any).layer = 0; }

    declare public stackOrder: number;
    static { (this.prototype as any).stackOrder = 0; }

    declare public createdAt: number;
    static { (this.prototype as any).createdAt = 0; }

    declare public configId: number;
    static { (this.prototype as any).configId = 0; }

    declare public variableId: string;

    public contributesToLayout: boolean = true;
    private _initialized: boolean = false;
    private _targetY: number = 0;

    constructor(param1: IStackedAddition, param2: number, param3: number = 0, param4: number = 0, param5: string = "", param6: number = 0) {
        this._SafeStr_14782 = param1;
        this.layer = param2;
        this.stackOrder = param6;
        this.createdAt = param3;
        this.configId = param4;
        this.variableId = param5 == null ? "" : param5;
    }

    public setTarget(param1: number, param2: number): boolean {
        if (!this._initialized) {
            this.y.snapTo(param1, param2);
            this._targetY = param1;
            this._initialized = true;
            return true;
        }
        if (this._targetY == param1) {
            return false;
        }
        let _loc3_: number = this.y.value;
        this._targetY = param1;
        this.y.setTarget(param1, param2);
        return this.y.value != _loc3_;
    }

    public needsAnimationTick(param1: number): boolean {
        return this._initialized && this.y.needsUpdate(param1, 1);
    }

    public freezePosition(param1: number): boolean {
        let _loc2_: boolean = this.y.update(param1);
        this.y.snapTo(this.y.value, param1);
        this._targetY = this.y.value;
        return _loc2_;
    }

    public dispose(): void {
        if (this._SafeStr_14782 != null) {
            this._SafeStr_14782.dispose();
            this._SafeStr_14782 = null;
        }
        if (this.sprite != null) {
            this.sprite.dispose();
            this.sprite = null;
        }
    }
}

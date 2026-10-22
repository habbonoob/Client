import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabbiconBubble } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/HabbiconBubble';
import type { IAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IAvatarAddition';
import type { IStackedAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IStackedAvatarAddition';
import type { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStackedAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IStackedAvatarAddition';
import { StackedAdditionStack } from '@/com/sulake/habbo/room/object/visualization/stacked/StackedAdditionStack';
import { VariableFxStackAddition } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStackAddition';

export class StackedAdditions implements IAvatarAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::StackedAdditions'); }

    public static readonly LAYER_VARIABLE_FX: number = 0;
    public static readonly LAYER_HABBICON: number = 100;
    private static readonly ROOM_LARGE_STACK_BOTTOM_Y: number = -86;
    private static readonly ROOM_SMALL_STACK_BOTTOM_Y: number = -45;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _avatar: AvatarVisualization;

    private _SafeStr_14474: StackedAdditionStack = new StackedAdditionStack();

    declare private _SafeStr_14475: HabbiconBubble;

    private _scale: number = 64;
    private _disposed: boolean = false;

    constructor(param1: number, param2: AvatarVisualization) {
        this._id = param1;
        this._avatar = param2;
    }

    public get id(): number {
        return this._id;
    }

    public get habbicon(): HabbiconBubble {
        return this._SafeStr_14475;
    }

    public get isEmpty(): boolean {
        return this._SafeStr_14474.isEmpty;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get stack(): StackedAdditionStack {
        return this._SafeStr_14474;
    }

    public setHabbicon(param1: HabbiconBubble): void {
        this.clearHabbicon();
        this._SafeStr_14475 = param1;
        this.addStackedAddition(this._SafeStr_14475, 100);
    }

    public clearHabbicon(): void {
        if (this._SafeStr_14475 == null) {
            return;
        }
        this.removeStackedAddition(this._SafeStr_14475.id);
        this._SafeStr_14475 = null;
    }

    public addStackedAddition(param1: IStackedAvatarAddition, param2: number, param3: number = 0, param4: number = 0, param5: string = ""): void {
        this._SafeStr_14474.add(param1, param2, param3, param4, param5);
    }

    public removeStackedAddition(param1: number): void {
        if (this._SafeStr_14475 != null && this._SafeStr_14475.id == param1) {
            this._SafeStr_14475 = null;
        }
        this._SafeStr_14474.remove(param1);
    }

    public getStackedAddition(param1: number): IStackedAvatarAddition {
        return asGuarded(this._SafeStr_14474._SafeStr_2119(param1), isIStackedAvatarAddition);
    }

    public getVariableFxAddition(param1: number, param2: string): VariableFxStackAddition {
        let _loc4_: VariableFxStackAddition = null;
        let _loc5_: any = null;
        let _loc3_: any[] = this._SafeStr_14474.getAdditions();
        for (_loc5_ of _loc3_ ?? []) {
            _loc4_ = _loc5_ instanceof VariableFxStackAddition ? _loc5_ : null;
            if (_loc4_ != null && _loc4_.configId == param1 && _loc4_.variableId == param2) {
                return _loc4_;
            }
        }
        return null;
    }

    public getVariableFxAdditions(): any[] {
        let _loc2_: VariableFxStackAddition = null;
        let _loc3_: any = null;
        let _loc1_: any[] = [];
        for (_loc3_ of this._SafeStr_14474.getAdditions() ?? []) {
            _loc2_ = _loc3_ instanceof VariableFxStackAddition ? _loc3_ : null;
            if (_loc2_ != null) {
                _loc1_.push(_loc2_);
            }
        }
        return _loc1_;
    }

    public update(param1: IRoomObjectSprite, param2: number): void {
        this._scale = param2;
        this._SafeStr_14474.update(param1, param2, this.resolveStackBottomY());
    }

    public animate(param1: IRoomObjectSprite): boolean {
        let _loc2_: boolean = this._SafeStr_14474.animate(param1, this.resolveStackBottomY());
        if (this._SafeStr_14475 != null && this._SafeStr_14474._SafeStr_2119(this._SafeStr_14475.id) == null) {
            this._SafeStr_14475 = null;
        }
        return _loc2_;
    }

    public dispose(): void {
        this._SafeStr_14474.dispose();
        this._SafeStr_14475 = null;
        this._avatar = null;
        this._disposed = true;
    }

    private resolveStackBottomY(): number {
        let _loc2_: number = this._scale < 48 ? 32 : 64;
        let _loc1_: number = this._scale < 48 ? -45 : -86;
        if (this._avatar.posture == "sit") {
            _loc1_ = _loc1_ + _loc2_ / 2 | 0;
        } else if (this._avatar.posture == "lay") {
            _loc1_ += _loc2_;
        }
        return _loc1_;
    }

    get [IDisposable](): true {
        return true;
    }
}

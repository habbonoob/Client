import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IExpressionAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IExpressionAddition';
import type { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ExpressionAddition implements IExpressionAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::ExpressionAddition'); }

    declare protected _id: number;
    static { (this.prototype as any)._id = 0; }

    declare protected _avatar: AvatarVisualization;

    private _type: number = -1;

    constructor(param1: number, param2: number, param3: AvatarVisualization) {
        this._type = param2;
        this._id = param1;
        this._avatar = param3;
    }

    public get type(): number {
        return this._type;
    }

    public get id(): number {
        return this._id;
    }

    public get disposed(): boolean {
        return this._avatar == null;
    }

    public dispose(): void {
        this._avatar = null;
    }

    public update(param1: IRoomObjectSprite, param2: number): void {
    }

    public animate(param1: IRoomObjectSprite): boolean {
        return false;
    }

    get [IDisposable](): true {
        return true;
    }
}

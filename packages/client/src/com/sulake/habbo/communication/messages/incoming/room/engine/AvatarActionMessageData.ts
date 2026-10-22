import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarActionMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::AvatarActionMessageData'); }

    constructor(param1: string, param2: string) {
        this._actionType = param1;
        this._actionParameter = param2;
    }

    declare private _actionType: string;

    declare private _actionParameter: string;

    public get actionType(): string {
        return this._actionType;
    }

    public get actionParameter(): string {
        return this._actionParameter;
    }

    public toString(): string {
        return this._actionType + ":" + this._actionParameter;
    }
}

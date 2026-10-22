import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ObjectMouseData {
    static { registerClassName(this, 'com.sulake.room.renderer.utils::ObjectMouseData'); }

    constructor() {
    }

    private _objectId: string = "";
    private _spriteTag: string = "";

    public get objectId(): string {
        return this._objectId;
    }

    public set objectId(param1: string) {
        this._objectId = param1;
    }

    public get spriteTag(): string {
        return this._spriteTag;
    }

    public set spriteTag(param1: string) {
        this._spriteTag = param1;
    }
}

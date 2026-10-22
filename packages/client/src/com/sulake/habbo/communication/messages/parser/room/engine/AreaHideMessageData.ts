import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IAreaHideInfo } from '@/com/sulake/habbo/room/IAreaHideInfo';

export class AreaHideMessageData implements IAreaHideInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::AreaHideMessageData'); }

    constructor(param1: IMessageDataWrapper) {
        this._furniId = param1.readInteger();
        this._on = param1.readBoolean();
        this._rootX = param1.readInteger();
        this._rootY = param1.readInteger();
        this._width = param1.readInteger();
        this._length = param1.readInteger();
        this._invert = param1.readBoolean();
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _rootX: number;
    static { (this.prototype as any)._rootX = 0; }

    declare private _rootY: number;
    static { (this.prototype as any)._rootY = 0; }

    declare private _invert: boolean;
    static { (this.prototype as any)._invert = false; }

    declare private _on: boolean;
    static { (this.prototype as any)._on = false; }

    public get on(): boolean {
        return this._on;
    }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    public get width(): number {
        return this._width;
    }

    declare private _length: number;
    static { (this.prototype as any)._length = 0; }

    public get length(): number {
        return this._length;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get rootX(): number {
        return this._rootX;
    }

    public get rootY(): number {
        return this._rootY;
    }

    public get invert(): boolean {
        return this._invert;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class OutgoingIngredient {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.crafting::OutgoingIngredient'); }

    constructor(param1: IMessageDataWrapper) {
        this._count = param1.readInteger();
        this._furnitureClassName = param1.readString();
    }

    declare private _furnitureClassName: string;

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    public get count(): number {
        return this._count;
    }

    public get furnitureClassName(): string {
        return this._furnitureClassName;
    }
}

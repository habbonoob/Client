import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CraftingRecipesAvailableMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.crafting::CraftingRecipesAvailableMessageParser'); }

    constructor() {
    }

    declare private _recipeComplete: boolean;
    static { (this.prototype as any)._recipeComplete = false; }

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    public get count(): number {
        return this._count;
    }

    public get recipeComplete(): boolean {
        return this._recipeComplete;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._count = param1.readInteger();
        this._recipeComplete = param1.readBoolean();
        return true;
    }

    public flush(): boolean {
        this._count = 0;
        this._recipeComplete = false;
        return true;
    }
}

import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { OutgoingIngredient } from '@/com/sulake/habbo/communication/messages/parser/crafting/OutgoingIngredient';

export class CraftingRecipeMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.crafting::CraftingRecipeMessageParser'); }

    private _ingredients: OutgoingIngredient[] = new Array<OutgoingIngredient>(0).fill(null);

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._ingredients.push(new OutgoingIngredient(param1));
            _loc3_++;
        }
        return true;
    }

    public flush(): boolean {
        this._ingredients = new Array<OutgoingIngredient>(0).fill(null);
        return true;
    }

    public get ingredients(): OutgoingIngredient[] {
        return this._ingredients;
    }
}

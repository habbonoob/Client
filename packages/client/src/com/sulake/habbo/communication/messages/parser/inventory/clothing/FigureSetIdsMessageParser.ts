import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FigureSetIdsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.clothing::FigureSetIdsMessageParser'); }

    constructor() {
    }

    declare private _figureSetIds: number[];

    declare private _boundFurnitureNames: string[];

    public get boundFurnitureNames(): string[] {
        return this._boundFurnitureNames;
    }

    public get figureSetIds(): number[] {
        return this._figureSetIds;
    }

    public flush(): boolean {
        this._figureSetIds = new Array<number>(0).fill(0);
        this._boundFurnitureNames = new Array<string>(0).fill(null);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._figureSetIds.push(param1.readInteger());
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._boundFurnitureNames.push(param1.readString());
            _loc3_++;
        }
        return true;
    }
}
